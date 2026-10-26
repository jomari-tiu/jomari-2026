import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { contactInfo } from "@/data/contact";
import { stations } from "@/data/line";

/** Strip stops, oldest on the left. The depot (university) is where the line starts. */
const STOPS = [
  { id: "depot", short: "CvSU", color: "var(--ink)" },
  ...stations.map((s) => ({ id: s.id, short: s.short, color: s.color })),
  { id: "contact", short: "Your team", color: "var(--ink)" },
];
const step = 100 / (STOPS.length - 1);
const pos = (id: string) => STOPS.findIndex((s) => s.id === id) * step;

/**
 * Page order, newest first: where the train should sit when each section reaches the reading line.
 * After the depot the train holds through the toolkit, then runs out to the terminus (contact).
 */
const RIDE: [string, string][] = [
  ["top", "multisys"],
  ...[...stations].reverse().map((s) => [s.id, s.id] as [string, string]),
  ["depot", "depot"],
  ["toolkit", "depot"],
  ["contact", "contact"],
];

export function LineStrip() {
  const { scrollY } = useScroll();
  const [range, setRange] = useState<{ input: number[]; output: number[] }>({
    input: [0, 1],
    output: [pos("multisys"), pos("multisys")],
  });

  useEffect(() => {
    const measure = () => {
      const line = window.innerHeight * 0.4;
      const input: number[] = [];
      const output: number[] = [];
      for (const [id, at] of RIDE) {
        const el = document.getElementById(id);
        if (!el) continue;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const y = Math.min(maxScroll, Math.max(0, el.getBoundingClientRect().top + window.scrollY - line));
        // Hold at the depot until the terminus is close, so the run out doesn't read as revisiting stations.
        if (id === "contact" && input.length && y - 240 > input[input.length - 1]) {
          input.push(y - 240);
          output.push(output[output.length - 1]);
        }
        if (input.length && y <= input[input.length - 1]) continue;
        input.push(y);
        output.push(pos(at));
      }
      if (input.length > 1) setRange({ input, output });
    };
    measure();
    // Fonts and lazy screenshots settle the page height after first paint.
    document.fonts?.ready.then(measure);
    window.addEventListener("load", measure);
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    return () => {
      ro.disconnect();
      window.removeEventListener("load", measure);
    };
  }, []);

  const raw = useTransform(scrollY, range.input, range.output, { clamp: true });
  const x = useSpring(raw, { stiffness: 260, damping: 40, mass: 0.6 });
  const left = useTransform(x, (v) => `${v}%`);

  const [active, setActive] = useState("multisys");
  useMotionValueEvent(raw, "change", (v) => {
    const nearest = STOPS.reduce((best, s, i) =>
      Math.abs(i * step - v) < Math.abs(STOPS.indexOf(best) * step - v) ? s : best,
    );
    if (nearest.id !== active) setActive(nearest.id);
  });

  return (
    <header className="strip">
      <nav className="wrap" aria-label="Career line">
        <a className="strip-brand" href="#top">
          <span className="full">Jomari Tiu</span>
          <span className="short">JT</span>
        </a>
        <div className="strip-track">
          <div className="strip-rail" aria-hidden="true">
            {STOPS.slice(1).map((s, i) => (
              <span
                key={s.id}
                className={i === 0 || s.id === "contact" ? "depot-seg" : undefined}
                style={{ background: i === 0 || s.id === "contact" ? undefined : STOPS[i].color }}
              />
            ))}
          </div>
          <div style={{ position: "absolute", inset: "0 8px" }}>
            {STOPS.map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="strip-stop"
                aria-current={active === s.id}
                aria-label={
                  s.id === "depot" ? "Education, Cavite State University" : s.id === "contact" ? "Contact" : s.short
                }
                style={{ left: `${i * step}%`, "--line": s.color } as React.CSSProperties}
              >
                <i />
                <b>{s.short}</b>
              </a>
            ))}
            <motion.div className="strip-train" style={{ left }} aria-hidden="true" />
          </div>
        </div>
        <a className="btn btn-solid strip-cta" href={`mailto:${contactInfo.email}`}>
          Email
        </a>
      </nav>
    </header>
  );
}
