import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll } from "motion/react";
import type { Project } from "@/types";
import { depot, type Station } from "@/data/line";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "./Icons";
import { Sep } from "./Sep";

const ease = [0.16, 1, 0.3, 1] as const;

/** A roundel on the spine that lights once the reader has passed it, and stays lit. */
function Roundel({ big = false }: { big?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const passed = useInView(ref, { once: true, margin: "0px 0px -45% 0px" });
  return <span ref={ref} aria-hidden="true" className={`roundel${big ? " big" : ""}${passed ? " lit" : ""}`} />;
}

function Plate({ project }: { project: Project }) {
  const images = project.imageList?.length ? project.imageList : [project.coverImage!];
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const reduce = useReducedMotion();
  const go = (d: number) => setState(([i]) => [(i + d + images.length) % images.length, d]);

  const from = dir > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)";

  return (
    <figure className="plate">
      <AnimatePresence initial={false} custom={dir}>
        <motion.img
          key={images[index]}
          src={images[index]}
          alt={`${project.title}, screen ${index + 1} of ${images.length}`}
          loading="lazy"
          decoding="async"
          style={{ zIndex: 1 }}
          initial={reduce ? { opacity: 0 } : { clipPath: from }}
          animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0 0%)" }}
          exit={{ zIndex: 0, transition: { duration: 0.5 } }}
          transition={{ duration: reduce ? 0.2 : 0.5, ease }}
        />
      </AnimatePresence>
      {images.length > 1 && (
        <div className="plate-controls">
          <button type="button" onClick={() => go(-1)} aria-label={`Previous ${project.title} screen`}>
            <ChevronLeft />
          </button>
          <span aria-live="polite">
            {index + 1} / {images.length}
          </span>
          <button type="button" onClick={() => go(1)} aria-label={`Next ${project.title} screen`}>
            <ChevronRight />
          </button>
        </div>
      )}
    </figure>
  );
}

function Stop({ project }: { project: Project }) {
  const links = [
    project.demoLink && { href: project.demoLink, label: "Live demo" },
    project.demoLink2 && { href: project.demoLink2, label: project.demoLink ? "Public site" : "Live site" },
    project.codeLink && { href: project.codeLink, label: "Source on GitHub" },
  ].filter(Boolean) as { href: string; label: string }[];

  return (
    <li className="stop">
      <Roundel />
      <Plate project={project} />
      <div>
        <h3>{project.title}</h3>
        <p className="stop-desc">{project.description}</p>
        {project.technologies && (
          <ul className="stop-stack" aria-label="Built with">
            {project.technologies.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}
        {links.length > 0 && (
          <p className="stop-links">
            {links.map((l) => (
              <a key={l.href} className="textlink" href={l.href} target="_blank" rel="noreferrer">
                {l.label}
                <ArrowUpRight />
              </a>
            ))}
          </p>
        )}
      </div>
    </li>
  );
}

export function StationSection({ station }: { station: Station }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 55%", "end 55%"] });
  const { entry, projects } = station;
  const compact = projects.length > 3;

  return (
    <section
      ref={ref}
      id={station.id}
      className="station"
      aria-labelledby={`${station.id}-title`}
      style={{ "--line": station.color } as React.CSSProperties}
    >
      <div className="wrap">
        <div className="spine" aria-hidden="true">
          <motion.div className="spine-fill" style={{ scaleY: scrollYProgress }} />
        </div>
        <header className="station-head">
          <Roundel big />
          <h2 id={`${station.id}-title`}>{entry.company}</h2>
          <p className="station-meta">
            <b>{entry.role}</b>
            <Sep />
            <span className="num">{entry.dateRange}</span>
            <Sep />
            {entry.location}
          </p>
        </header>
        <ul className="duties">
          {entry.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        {projects.length > 0 ? (
          <ol className={`stops${compact ? " compact" : ""}`} aria-label={`Projects at ${station.short}`}>
            {projects.map((p) => (
              <Stop key={p.id} project={p} />
            ))}
          </ol>
        ) : (
          <p className="no-stops">Project work from this role isn't listed here.</p>
        )}
      </div>
    </section>
  );
}

export function Depot() {
  return (
    <section id="depot" className="depot" aria-labelledby="depot-title">
      <div className="wrap">
        <div className="spine-dash" aria-hidden="true" />
        <header className="station-head" style={{ "--line": "var(--ink)" } as React.CSSProperties}>
          <Roundel />
          <h2 id="depot-title">Where the line starts: {depot.company}</h2>
          <p className="station-meta">
            <b>{depot.role}</b>
            <Sep />
            {depot.dateRange}
            <Sep />
            {depot.location}
          </p>
        </header>
        <ul className="duties" style={{ "--line": "var(--ink)" } as React.CSSProperties}>
          {depot.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
