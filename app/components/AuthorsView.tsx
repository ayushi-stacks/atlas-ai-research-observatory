"use client";

import { useState } from "react";

const collaborators = [
  { name: "Fei-Fei Li", area: "Computer Vision", x: 18, y: 23, works: 38, institutions: 5 },
  { name: "Percy Liang", area: "Foundation Models", x: 76, y: 18, works: 56, institutions: 8 },
  { name: "Chelsea Finn", area: "Robotics", x: 82, y: 69, works: 31, institutions: 4 },
  { name: "Diyi Yang", area: "NLP & Society", x: 16, y: 72, works: 29, institutions: 6 },
  { name: "Tatsunori Hashimoto", area: "Reliable AI", x: 52, y: 82, works: 42, institutions: 7 },
];

export function AuthorsView({ onExplore }: { onExplore: (query: string) => void }) {
  const [selected, setSelected] = useState(collaborators[1]);
  return (
    <main className="interior-view authors-view">
      <header className="interior-hero split"><div><span className="eyebrow">Researcher constellations</span><h1>Ideas travel through<br /><em>human connections.</em></h1></div><p>Explore the collaborations, institutions, and shared questions shaping modern AI.</p></header>
      <section className="author-constellation">
        <div className="collab-rings"><span /><span /><span /></div>
        <button className="featured-author" onClick={() => onExplore("Show the most influential papers and collaborations of Christopher Manning.")}><span className="author-monogram">CM</span><span><small>Stanford University</small><strong>Christopher Manning</strong><em>Natural language processing · Computational linguistics</em><span className="author-metrics"><b>589</b><i>publications</i><b>145K</b><i>citations</i></span></span></button>
        {collaborators.map((author) => <button aria-pressed={selected.name === author.name} className={selected.name === author.name ? "collaborator active" : "collaborator"} onClick={() => setSelected(author)} key={author.name} style={{ left: `${author.x}%`, top: `${author.y}%` }}><span>{author.name.split(" ").map((word) => word[0]).join("")}</span><strong>{author.name}</strong><small>{author.area}</small></button>)}
        <div className="author-note"><span>Selected researcher</span><strong>{selected.name}</strong><p>{selected.area} · {selected.works} shared works across {selected.institutions} institutions</p><button onClick={() => onExplore(`Show the research, publications, and collaborations of ${selected.name}.`)}>Explore researcher →</button></div>
      </section>
    </main>
  );
}
