import { useEffect, useMemo, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";
import { contactInfo } from "@/data/contact";
import { current, monthsSince, stations } from "@/data/line";
import { ArrowDown, ArrowLeft, ArrowRight } from "./Icons";
import { Dotted } from "./Sep";

const W = 1200;
const H = 220;
const X0 = 40;
const X_NOW = 1100;
const X_END = 1176;
const LOW = 150;
const HIGH = 90;
const RISE = HIGH - LOW; // negative: the jog climbs at 45°

function useGeometry() {
  return useMemo(() => {
    const now = new Date();
    const total = monthsSince(stations[0].opened, now);
    const xs = stations.map((s) => X0 + ((total - monthsSince(s.opened, now)) / total) * (X_NOW - X0));
    const [, , xL, xM] = xs;
    const jogStart = xL + (xM - xL) * 0.45;
    const jogEnd = jogStart - RISE;
    const ys = [LOW, LOW, LOW, HIGH];

    const segs = [
      `M${xs[0]} ${LOW}H${xs[1]}`,
      `M${xs[1]} ${LOW}H${xL}`,
      `M${xL} ${LOW}H${jogStart}L${jogEnd} ${HIGH}H${xM}`,
      `M${xM} ${HIGH}H${X_NOW}`,
    ];
    const diag = Math.SQRT2 * -RISE;
    const lens = [xs[1] - xs[0], xL - xs[1], jogStart - xL + diag + (xM - jogEnd), X_NOW - xM];
    const total_len = lens.reduce((a, b) => a + b, 0);
    const starts = lens.map((_, i) => lens.slice(0, i).reduce((a, b) => a + b, 0));
    const route = `M${xs[0]} ${LOW}H${jogStart}L${jogEnd} ${HIGH}H${X_NOW}`;

    return { xs, ys, segs, lens, starts, total_len, route };
  }, []);
}

function Segment({
  d,
  color,
  start,
  len,
  travelled,
}: {
  d: string;
  color: string;
  start: number;
  len: number;
  travelled: MotionValue<number>;
}) {
  const pathLength = useTransform(travelled, [start, start + len], [0, 1], { clamp: true });
  return (
    <motion.path
      d={d}
      stroke={color}
      strokeWidth={12}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      style={{ pathLength }}
    />
  );
}

function Diagram() {
  const g = useGeometry();
  const reduce = useReducedMotion();
  const progress = useMotionValue(reduce ? 1 : 0);
  const travelled = useTransform(progress, (p) => p * g.total_len);
  const routeRef = useRef<SVGPathElement>(null);
  const trainRef = useRef<SVGGElement>(null);
  const [reached, setReached] = useState(reduce ? stations.length : 0);
  const [arrived, setArrived] = useState(!!reduce);

  useEffect(() => {
    if (reduce) {
      progress.set(1);
      return;
    }
    const controls = animate(progress, 1, {
      duration: 2.4,
      delay: 0.35,
      ease: [0.45, 0, 0.2, 1],
      onComplete: () => setArrived(true),
    });
    return () => controls.stop();
  }, [progress, reduce]);

  useMotionValueEvent(travelled, "change", (t) => {
    const n = g.starts.filter((s) => t >= s - 0.5).length;
    if (n !== reached) setReached(n);
    const path = routeRef.current;
    const train = trainRef.current;
    if (!path || !train) return;
    const total = path.getTotalLength();
    const at = Math.min(t, total);
    const p = path.getPointAtLength(at);
    const q = path.getPointAtLength(Math.min(at + 1, total));
    const angle = (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI;
    train.setAttribute("transform", `translate(${p.x} ${p.y}) rotate(${at >= total ? 0 : angle})`);
  });

  // Place the train at its starting point before the first frame.
  useEffect(() => {
    const path = routeRef.current;
    const train = trainRef.current;
    if (!path || !train) return;
    const p = path.getPointAtLength(reduce ? path.getTotalLength() : 0);
    train.setAttribute("transform", `translate(${p.x} ${p.y})`);
  }, [reduce]);

  const pct = (v: number, of: number) => `${(v / of) * 100}%`;

  return (
    <div className="diagram">
      <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        <path ref={routeRef} d={g.route} fill="none" stroke="none" />
        {/* The track ahead, faint, so the line has somewhere to go. */}
        <path
          d={g.route}
          fill="none"
          stroke="var(--ink-hair)"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {stations.map((s, i) => (
          <Segment
            key={s.id}
            d={g.segs[i]}
            color={s.color}
            start={g.starts[i]}
            len={g.lens[i]}
            travelled={travelled}
          />
        ))}
        <motion.path
          d={`M${X_NOW} ${HIGH}H${X_END}`}
          stroke="var(--ink)"
          strokeWidth={5}
          strokeDasharray="10 9"
          fill="none"
          initial={false}
          animate={{ opacity: arrived ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
        <path d={`M${X_NOW} ${HIGH - 16}V${HIGH + 16}`} stroke="var(--ink)" strokeWidth={4} strokeLinecap="round" />
        {stations.map((s, i) => {
          const here = s.id === current.id;
          const lit = here && i < reached;
          return (
            <circle
              key={s.id}
              cx={g.xs[i]}
              cy={g.ys[i]}
              r={here ? 17 : 11}
              fill={lit ? s.color : "#f8faf6"}
              stroke={s.color}
              strokeWidth={here ? 9 : 6}
              style={{ transition: "fill 300ms var(--ease-out)" }}
            />
          );
        })}
        <g ref={trainRef}>
          <rect x={-22} y={-11} width={44} height={22} rx={9} fill="var(--ink)" />
          <rect x={-15} y={-5} width={10} height={6} rx={2} fill="#f8faf6" />
          <rect x={-2} y={-5} width={10} height={6} rx={2} fill="#f8faf6" />
          <rect x={11} y={-5} width={6} height={6} rx={2} fill="#f8faf6" />
        </g>
      </svg>

      <div className="diagram-labels">
        {stations.map((s, i) => {
          const above = i % 2 === 1;
          const y = g.ys[i];
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`diagram-label ${above ? "above" : "below"} ${s.id === current.id ? "here" : ""}`}
              style={
                {
                  left: pct(g.xs[i], W),
                  "--y": above ? pct(H - y + 26, H) : pct(y + 24, H),
                  "--line": s.color,
                } as React.CSSProperties
              }
            >
              <b>{s.short}</b>
              <span>{s.years}</span>
            </a>
          );
        })}
        <a
          href="#contact"
          className="diagram-label below"
          style={{ left: pct(X_NOW, W), "--y": pct(HIGH + 26, H) } as React.CSSProperties}
        >
          <b>You are here</b>
        </a>
      </div>

      <ol className="diagram-legend">
        {[...stations].reverse().map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={s.id === current.id ? "here" : ""}
              style={{ "--line": s.color } as React.CSSProperties}
            >
              <i />
              <span>
                <b>{s.short}</b> {s.years}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Hero() {
  const previous = stations[stations.length - 2];
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="wrap">
        <div className="sign">
          <div className="sign-body">
            <div className="sign-roundel" aria-hidden="true">
              JT
            </div>
            <div>
              <h1 id="hero-title">Jomari Tiu</h1>
              <p className="sign-sub">
                <strong>Frontend engineer</strong> building web apps and sites with React, Next.js and
                TypeScript. Based in the {contactInfo.location}, shipping since 2021.
              </p>
            </div>
            <dl className="sign-facts">
              <div>
                <dt>Main line</dt>
                <dd><Dotted items={["React", "Next.js", "TypeScript"]} /></dd>
              </div>
              <div>
                <dt>Also runs</dt>
                <dd><Dotted items={["React Native", "Node.js", "WordPress"]} /></dd>
              </div>
              {contactInfo.available && (
                <div>
                  <dt>Status</dt>
                  <dd className="open">Open to work</dd>
                </div>
              )}
            </dl>
          </div>
          <div className="sign-band">
            <a href={`#${previous.id}`} className="prev">
              <ArrowLeft />
              <span>{previous.short}</span>
            </a>
            <p className="here">Now at {current.entry.company.replace(" Corporation", "")}</p>
            <a href="#contact" className="next" aria-label="Next station: your team">
              <span>
                <span className="wide-only">Next station: </span>your team
              </span>
              <ArrowRight />
            </a>
          </div>
        </div>

        <div className="hero-actions">
          <a className="btn btn-solid" href="#work">
            See the work
            <ArrowDown />
          </a>
          <a className="btn btn-ghost" href={`mailto:${contactInfo.email}`}>
            Email me
          </a>
        </div>

        <Diagram />
      </div>
    </section>
  );
}
