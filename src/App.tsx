import { MotionConfig } from "motion/react";
import { ride } from "@/data/line";
import { Hero } from "@/components/Hero";
import { LineStrip } from "@/components/LineStrip";
import { Depot, StationSection } from "@/components/Station";
import { About, Footer, Terminus, Toolkit } from "@/components/Sections";

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#work">
        Skip to the work
      </a>
      <LineStrip />
      <main>
        <Hero />
        <About />
        <div id="work">
          {ride.map((s) => (
            <StationSection key={s.id} station={s} />
          ))}
          <Depot />
        </div>
        <Toolkit />
        <Terminus />
      </main>
      <Footer />
    </MotionConfig>
  );
}

export default App;
