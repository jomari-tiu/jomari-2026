import { motion } from "motion/react";
import meImg from "@/assets/me-bnw.jpg";
import { contactInfo, socialLinks } from "@/data/contact";
import { skillCategories } from "@/data/skills";
import { ArrowUpRight } from "./Icons";

export function About() {
  return (
    <section className="notice" aria-labelledby="about-title">
      <div className="wrap">
        <figure>
          <img src={meImg} alt="Portrait of Jomari Tiu" width={600} height={750} />
        </figure>
        <div>
          <h2 id="about-title">Four companies, one line of work.</h2>
          <div className="copy">
            <p>
              I'm <strong>Jomari Tiu</strong>, a frontend developer in the Philippines. I've been building
              web and mobile interfaces professionally since 2021.
            </p>
            <p>
              I work mostly in <strong>React</strong>, <strong>Next.js</strong> and{" "}
              <strong>TypeScript</strong>, with a close eye on UI detail, performance and accessibility. The
              work has ranged across agencies and product teams: WordPress microsites for The Economist's
              clients, a dental practice system, a real-estate platform with accounting, and
              government-facing apps.
            </p>
            <p>
              Outside the browser I build mobile apps with <strong>React Native and Expo</strong>, and I care
              about design systems and component libraries that teams can actually keep using.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Toolkit() {
  return (
    <section id="toolkit" className="toolkit" aria-labelledby="toolkit-title">
      <div className="wrap">
        <h2 id="toolkit-title">Toolkit</h2>
        <p className="toolkit-intro">What I reach for, grouped the way a project uses it.</p>
        <dl className="board">
          {skillCategories.map((c) => (
            <div className="board-row" key={c.id}>
              <dt>{c.label}</dt>
              <dd>
                {c.skills.map((s) => (
                  <span key={s.name}>{s.name}</span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function Terminus() {
  const others = socialLinks.filter((l) => l.icon !== "mail");
  return (
    <section id="contact" className="terminus" aria-labelledby="contact-title">
      <div className="wrap">
        <div className="terminus-line" aria-hidden="true">
          <motion.span
            className="dash"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "0px 0px -20% 0px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
          <span className="ring" />
        </div>
        <div className="sign terminus-sign">
          <div className="terminus-body">
            <h2 id="contact-title">Next station: your team.</h2>
            <p className="terminus-copy">
              {contactInfo.available
                ? "I'm open to frontend roles and freelance builds, whether that's a web app, a marketing site or a mobile app. Email is the quickest way to reach me."
                : "Email is the quickest way to reach me."}
            </p>
            <a className="terminus-email" href={`mailto:${contactInfo.email}`}>
              {contactInfo.email}
            </a>
          </div>
          <div className="sign-band">
            <p className="where">Based in the {contactInfo.location}</p>
            <div className="terminus-links">
              {others.map((l) => (
                <a key={l.url} className="textlink" href={l.url} target="_blank" rel="noreferrer">
                  {l.label}
                  <ArrowUpRight />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <span>© {new Date().getFullYear()} {contactInfo.name}</span>
        <span>Set in Overpass. Built with React and Motion.</span>
      </div>
    </footer>
  );
}
