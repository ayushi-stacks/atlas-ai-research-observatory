"use client";

import { SearchPortal } from "./SearchPortal";

export function DiscoverView({ query, onSearch, onOpenPaper }: { query: string; onSearch: (query: string) => void; onOpenPaper: () => void }) {
  const relationship = /transformer/i.test(query) && /diffusion/i.test(query);
  const agentQuery = /agent/i.test(query);
  const synthesis = relationship ? {
    headline: "Transformers increasingly act as the reasoning backbone inside diffusion systems.",
    body: "The two fields converged as image patches became tokens. Transformer backbones gave diffusion models better global context and scaling behavior, while diffusion objectives offered transformers a powerful route to high-fidelity generation across image, video, audio, and multimodal data.",
    eras: [["2020—21", "Convergence", "ViT · DDPM"], ["2022—23", "Scaling", "DiT · U-ViT"], ["2024—25", "Unification", "Sora · MMDiT"]],
    sources: [["ICCV · 2023", "Scalable Diffusion Models with Transformers"], ["CVPR · 2023", "All Are Worth Words: A ViT Backbone for Diffusion Models"]],
  } : agentQuery ? {
    headline: "AI agents turn model capability into sequences of purposeful action.",
    body: "The field is moving from prompt-and-response systems toward architectures that plan, call tools, inspect outcomes, and revise their strategy. The strongest work now focuses on memory, verification, environmental feedback, and safe long-horizon autonomy.",
    eras: [["2022—23", "Tool use", "ReAct · Toolformer"], ["2024", "Orchestration", "SWE-agent · AutoGen"], ["2025+", "Reliability", "Planning · Oversight"]],
    sources: [["ICLR · 2023", "ReAct: Synergizing Reasoning and Acting"], ["NeurIPS · 2024", "AgentBench: Evaluating LLMs as Agents"]],
  } : {
    headline: "Retrieval moved from an external utility to a core part of model reasoning.",
    body: "Since 2020, RAG has evolved through three distinct eras: dense retrieval for factual grounding, modular pipelines for production knowledge systems, and adaptive retrieval where models decide when and how to seek evidence.",
    eras: [["2020—21", "Grounding", "DPR · RAG · REALM"], ["2022—23", "Orchestration", "RETRO · Toolformer"], ["2024—25", "Adaptation", "Self-RAG · GraphRAG"]],
    sources: [["NeurIPS · 2020", "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"], ["ICLR · 2024", "Self-RAG: Learning to Retrieve, Generate, and Critique"]],
  };
  const isRag = !relationship && !agentQuery;
  return (
    <main className="interior-view discover-view">
      <header className="discover-header"><span className="eyebrow">Research synthesis</span><h1>{query || "What would you like to understand?"}</h1><SearchPortal compact onSearch={onSearch} /></header>
      <section className="synthesis">
        <div className="synthesis-thread"><span className="thread-dot active" /><span className="thread-line" /><span className="thread-dot" /><span className="thread-line" /><span className="thread-dot" /></div>
        <article className="synthesis-answer"><span className="eyebrow">ATLAS synthesis · 24 sources</span><h2>{synthesis.headline}</h2><p>{synthesis.body}</p><div className="era-row">{synthesis.eras.map(([year, title, works]) => <div key={year}><small>{year}</small><strong>{title}</strong><span>{works}</span></div>)}</div></article>
        <aside className="evidence-rail"><span className="eyebrow">Key evidence</span>{synthesis.sources.map(([venue, title], index) => <button key={title} onClick={isRag && index === 0 ? onOpenPaper : () => onSearch(`Explain the impact and research lineage of ${title}.`)}><small>{venue}</small><strong>{title}</strong><span>{isRag && index === 0 ? "Read paper →" : "Trace signal →"}</span></button>)}<div className="confidence"><span>Cross-source agreement</span><strong>High · 92%</strong></div></aside>
      </section>
    </main>
  );
}
