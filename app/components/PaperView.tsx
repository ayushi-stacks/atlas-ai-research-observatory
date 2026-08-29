"use client";

export function PaperView({ onBack, onExplore, saved, onToggleSaved }: { onBack: () => void; onExplore: (query: string) => void; saved: boolean; onToggleSaved: () => void }) {
  return (
    <main className="interior-view paper-view">
      <button className="back-link" onClick={onBack}>← Back to discovery</button>
      <article className="paper-layout">
        <header className="paper-header">
          <span className="eyebrow">Foundational paper · 2020</span>
          <h1>Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks</h1>
          <p className="paper-authors">Patrick Lewis · Ethan Perez · Aleksandra Piktus · Fabio Petroni · Vladimir Karpukhin</p>
          <div className="paper-meta"><span>Meta AI Research</span><span>NeurIPS 2020</span><span>4,826 citations</span><button className={saved ? "paper-save saved" : "paper-save"} onClick={onToggleSaved}>{saved ? "✓ Saved to library" : "+ Save to library"}</button></div>
        </header>
        <aside className="paper-index"><span>On this paper</span><a href="#abstract">Abstract</a><a href="#concepts">Key concepts</a><a href="#lineage">Research lineage</a><a href="#related">Related papers</a></aside>
        <div className="paper-body">
          <section id="abstract"><span className="section-number">01</span><h2>Abstract</h2><p className="drop-cap">Large pre-trained language models store factual knowledge in their parameters and achieve state-of-the-art results when fine-tuned on downstream tasks. Yet their ability to access and precisely manipulate knowledge is limited. This paper introduced a general-purpose architecture that combines parametric memory with a dense vector index of Wikipedia.</p></section>
          <blockquote>“A pivotal shift from models that merely remember toward systems that know where to look.”<cite>ATLAS Research Note</cite></blockquote>
          <section id="concepts"><span className="section-number">02</span><h2>Concept constellation</h2><div className="concept-cloud">{["Dense retrieval", "Parametric memory", "Sequence generation", "Knowledge grounding", "Provenance"].map((concept) => <button key={concept} onClick={() => onExplore(`Explain ${concept} and show its relationship to retrieval-augmented generation.`)}>{concept}</button>)}</div></section>
          <section id="lineage"><span className="section-number">03</span><h2>Research lineage</h2><div className="lineage"><span><small>2017</small>REALM</span><i>→</i><span className="current"><small>2020</small>RAG</span><i>→</i><span><small>2022</small>RETRO</span><i>→</i><span><small>2023</small>Self-RAG</span></div></section>
          <section id="related"><span className="section-number">04</span><h2>Related signals</h2><div className="related-list"><button onClick={() => onExplore("Explain Self-RAG and compare it with the original RAG paper.")}><small>2023 · 638 citations</small><strong>Self-RAG: Learning to Retrieve, Generate, and Critique</strong><span>→</span></button><button onClick={() => onExplore("Explain RETRO and its influence on retrieval-augmented language models.")}><small>2022 · 921 citations</small><strong>Improving Language Models by Retrieving from Trillions of Tokens</strong><span>→</span></button></div></section>
        </div>
        <aside className="paper-aside"><div><span>Methods</span><strong>Dense Passage Retrieval</strong><strong>Seq2Seq generation</strong></div><div><span>Datasets</span><strong>Natural Questions</strong><strong>TriviaQA</strong><strong>MS MARCO</strong></div><div><span>Influence</span><b>Top 0.3%</b><small>of NLP papers, 2020</small></div></aside>
      </article>
    </main>
  );
}
