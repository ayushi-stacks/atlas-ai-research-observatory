"use client";

import { useState } from "react";
import { timeline } from "./data";

export function TimelineView({ onExplore }: { onExplore: (query: string) => void }) {
  const [active, setActive] = useState(0);
  const milestone = timeline[active];
  return (
    <main className="interior-view timeline-view">
      <header className="interior-hero split">
        <div><span className="eyebrow">Research evolution · 2017—2025</span><h1>The lineage of<br /><em>modern intelligence.</em></h1></div>
        <p>Follow the papers and ideas that changed the trajectory of AI research.</p>
      </header>
      <section className="timeline-stage" aria-label="AI research timeline">
        <div className="timeline-spine" />
        <div className="timeline-years" role="tablist" aria-label="Timeline years">
          {timeline.map((item, index) => (
            <button role="tab" aria-selected={active === index} className={active === index ? "active" : ""} onClick={() => setActive(index)} key={item.year}>
              <span>{item.year}</span><i />
            </button>
          ))}
        </div>
        <article className="timeline-focus">
          <div className="timeline-orb"><span>{milestone.year}</span></div>
          <div><span className="eyebrow">{milestone.theme}</span><h2>{milestone.title}</h2><p>{milestone.impact}</p><button className="text-link" onClick={() => onExplore(`Trace the research influence of ${milestone.title} from ${milestone.year} to today.`)}>Trace its influence <span>→</span></button></div>
        </article>
        <div className="influence-trails" aria-hidden="true"><span /><span /><span /></div>
      </section>
    </main>
  );
}
