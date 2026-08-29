"use client";

import { useState } from "react";
import { Topic, topics } from "./data";

export function ResearchUniverse({ onSelect }: { onSelect: (topic: Topic) => void }) {
  const [active, setActive] = useState<string | null>(null);
  const activeTopic = topics.find((topic) => topic.id === active);
  return (
    <section className={active ? "universe-map has-active" : "universe-map"} aria-label="Interactive map of AI research areas" onMouseLeave={() => setActive(null)}>
      <div className="stars stars-a" />
      <div className="stars stars-b" />
      <div className="universe-haze" />
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="orbit orbit-three" />
      <div className="orbit orbit-four" />
      <div className="research-core" aria-hidden="true">
        <span className="core-ring ring-a" />
        <span className="core-ring ring-b" />
        <span className="core-ring ring-c" />
        <span className="core-light" />
      </div>
      {topics.map((topic, index) => (
        <button
          key={topic.id}
          style={{ left: `${topic.x}%`, top: `${topic.y}%`, animationDelay: `${index * -0.8}s` }}
          className={`research-node ${topic.tone} ${active === topic.id ? "active" : ""}`}
          onMouseEnter={() => setActive(topic.id)}
          onFocus={() => setActive(topic.id)}
          onBlur={() => setActive(null)}
          onClick={() => onSelect(topic)}
          aria-label={`${topic.label}, ${topic.papers} papers`}
        >
          <span className="node-sphere" />
          <span className="node-copy"><strong>{topic.shortLabel}</strong><small>{topic.papers} papers</small></span>
        </button>
      ))}
      <div className={activeTopic ? "topic-preview visible" : "topic-preview"} aria-live="polite">
        {activeTopic && <><span>{activeTopic.papers} indexed papers</span><strong>{activeTopic.label}</strong><p>{activeTopic.summary}</p><em>Enter research field →</em></>}
      </div>
      <div className="universe-caption"><span>Live research map</span><b>24,612 papers · 8,341 authors</b></div>
    </section>
  );
}
