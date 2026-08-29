"use client";

import { collections } from "./data";

export type Collection = (typeof collections)[number];

export function CollectionShelf({ expanded = false, onOpen, onViewAll }: { expanded?: boolean; onOpen: (collection: Collection) => void; onViewAll?: () => void }) {
  return (
    <section className={expanded ? "collection-section expanded" : "collection-section"} aria-labelledby="collections-title">
      <header className="section-heading"><div><span className="eyebrow">Curated by ATLAS</span><h2 id="collections-title">Featured Collections</h2></div>{!expanded && <button onClick={onViewAll}>View all <span>↗</span></button>}</header>
      <div className="collection-shelf">{collections.map((collection, index) => <button onClick={() => onOpen(collection)} className={`collection-cover art-${index + 1}`} key={collection.title} aria-label={`Open ${collection.title}`}><span className="cover-art" aria-hidden="true"><i /><i /><i /></span><span className="cover-meta"><small>{collection.kicker}</small><strong>{collection.title}</strong><em>{collection.papers} papers</em></span></button>)}</div>
    </section>
  );
}

export function CollectionsView({ onOpen }: { onOpen: (collection: Collection) => void }) {
  return <main className="interior-view collections-view"><header className="interior-hero"><span className="eyebrow">The observatory archive</span><h1>Curated paths through<br /><em>complex ideas.</em></h1><p>Each collection traces a research field from its first signal to its newest frontier.</p></header><CollectionShelf expanded onOpen={onOpen} /></main>;
}
