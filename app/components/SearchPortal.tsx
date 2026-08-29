"use client";

import { FormEvent, useState } from "react";

export function SearchPortal({ onSearch, compact = false }: { onSearch: (query: string) => void; compact?: boolean }) {
  const [query, setQuery] = useState("");
  function submit(event: FormEvent) {
    event.preventDefault();
    const next = query.trim() || "How has RAG evolved since 2020?";
    onSearch(next);
  }
  return (
    <form className={compact ? "search-portal compact" : "search-portal"} onSubmit={submit}>
      <span className="search-spark" aria-hidden="true">✦</span>
      <label className="sr-only" htmlFor={compact ? "atlas-search-compact" : "atlas-search"}>Ask about AI research</label>
      <input id={compact ? "atlas-search-compact" : "atlas-search"} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ask anything about AI research…" />
      <button type="submit" aria-label="Search research">→</button>
    </form>
  );
}
