"use client";

import { FormEvent, useEffect, useState } from "react";
import { Collection } from "./CollectionsView";
import { ProfileData } from "./Navigation";

export type Preferences = { accent: "gold" | "cyan" | "violet"; reducedMotion: boolean; compact: boolean; weeklyDigest: boolean; newPaperAlerts: boolean };
export type Panel = "settings" | "profile" | "notifications" | null;

function PanelFrame({ title, eyebrow, onClose, children, wide = false }: { title: string; eyebrow: string; onClose: () => void; children: React.ReactNode; wide?: boolean }) {
  return <div className="modal-layer" role="presentation"><button className="modal-backdrop" onClick={onClose} aria-label="Close panel" /><section className={wide ? "modal-panel wide" : "modal-panel"} role="dialog" aria-modal="true" aria-label={title}><header className="modal-header"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div><button className="modal-close" onClick={onClose} aria-label="Close">×</button></header>{children}</section></div>;
}

function Toggle({ checked, onChange, label, detail }: { checked: boolean; onChange: (value: boolean) => void; label: string; detail: string }) {
  return <label className="setting-toggle"><span><strong>{label}</strong><small>{detail}</small></span><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} /><i aria-hidden="true" /></label>;
}

export function SettingsPanel({ preferences, onSave, onClose }: { preferences: Preferences; onSave: (next: Preferences) => void; onClose: () => void }) {
  const [draft, setDraft] = useState(preferences);
  useEffect(() => setDraft(preferences), [preferences]);
  const update = <K extends keyof Preferences>(key: K, value: Preferences[K]) => setDraft((current) => ({ ...current, [key]: value }));
  return <PanelFrame title="Observatory settings" eyebrow="Personalize ATLAS" onClose={onClose}>
    <div className="settings-content">
      <section><h3>Appearance</h3><p>Choose the signal color used throughout your observatory.</p><div className="accent-options">{(["gold", "cyan", "violet"] as const).map((accent) => <button aria-pressed={draft.accent === accent} className={draft.accent === accent ? `accent-choice ${accent} active` : `accent-choice ${accent}`} onClick={() => update("accent", accent)} key={accent}><i />{accent}</button>)}</div></section>
      <section><h3>Experience</h3><Toggle checked={draft.reducedMotion} onChange={(value) => update("reducedMotion", value)} label="Reduce orbital motion" detail="Calms the research universe and page transitions." /><Toggle checked={draft.compact} onChange={(value) => update("compact", value)} label="Focused reading mode" detail="Tightens supporting information around research content." /></section>
      <section><h3>Research signals</h3><Toggle checked={draft.weeklyDigest} onChange={(value) => update("weeklyDigest", value)} label="Weekly field digest" detail="Include one synthesized overview in notifications." /><Toggle checked={draft.newPaperAlerts} onChange={(value) => update("newPaperAlerts", value)} label="New-paper alerts" detail="Surface important additions to saved research areas." /></section>
    </div>
    <footer className="modal-actions"><button className="secondary-action" onClick={onClose}>Cancel</button><button className="save-action" onClick={() => { onSave(draft); onClose(); }}>Save preferences</button></footer>
  </PanelFrame>;
}

export function ProfilePanel({ profile, onSave, onClose, savedCount }: { profile: ProfileData; onSave: (profile: ProfileData) => void; onClose: () => void; savedCount: number }) {
  const [draft, setDraft] = useState(profile);
  useEffect(() => setDraft(profile), [profile]);
  function submit(event: FormEvent) { event.preventDefault(); onSave(draft); onClose(); }
  const initials = draft.name.split(" ").filter(Boolean).slice(0, 2).map((word) => word[0]).join("").toUpperCase() || "A";
  return <PanelFrame title="Explorer profile" eyebrow="Your research identity" onClose={onClose} wide>
    <form className="profile-editor" onSubmit={submit}>
      <aside className="profile-preview"><span className="profile-orb">{initials}</span><h3>{draft.name || "Your name"}</h3><p>{draft.role || "Research explorer"}</p><div><span><b>{savedCount}</b><small>saved signals</small></span><span><b>12</b><small>research paths</small></span></div></aside>
      <div className="profile-fields"><label><span>Name</span><input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} required /></label><div className="field-row"><label><span>Role</span><input value={draft.role} onChange={(event) => setDraft({ ...draft, role: event.target.value })} /></label><label><span>Institution</span><input value={draft.institution} onChange={(event) => setDraft({ ...draft, institution: event.target.value })} /></label></div><label><span>Bio</span><textarea rows={3} value={draft.bio} onChange={(event) => setDraft({ ...draft, bio: event.target.value })} /></label><label><span>Research interests</span><input value={draft.interests} onChange={(event) => setDraft({ ...draft, interests: event.target.value })} placeholder="RAG, multimodal learning, AI safety" /></label><div className="profile-summary"><span>Institution</span><strong>{draft.institution || "Independent researcher"}</strong><span>Interests</span><strong>{draft.interests || "Add your research interests"}</strong></div></div>
      <footer className="modal-actions profile-actions"><button type="button" className="secondary-action" onClick={onClose}>Cancel</button><button className="save-action" type="submit">Save profile</button></footer>
    </form>
  </PanelFrame>;
}

export function NotificationsPanel({ read, onToggle, onReadAll, onExplore, onClose }: { read: string[]; onToggle: (id: string) => void; onReadAll: () => void; onExplore: (query: string) => void; onClose: () => void }) {
  const notifications = [
    { id: "rag", time: "12 min ago", title: "18 new papers entered your RAG collection", body: "Self-correcting retrieval and GraphRAG are the strongest shared signals." },
    { id: "agents", time: "Yesterday", title: "AI Agents crossed 400 indexed papers", body: "Planning and verification are accelerating fastest this month." },
    { id: "safety", time: "3 days ago", title: "New AI safety lineage available", body: "Trace the path from constitutional AI to scalable oversight." },
  ];
  return <PanelFrame title="Research signals" eyebrow={`${notifications.filter((item) => !read.includes(item.id)).length} unread`} onClose={onClose}>
    <div className="notification-list">{notifications.map((item) => <article className={read.includes(item.id) ? "notification-item read" : "notification-item"} key={item.id}><button className="notification-copy" onClick={() => { onToggle(item.id); onExplore(`Explore this research signal: ${item.title}`); onClose(); }}><span>{item.time}</span><strong>{item.title}</strong><p>{item.body}</p><em>Explore signal →</em></button><button className="read-dot" onClick={() => onToggle(item.id)} aria-label={read.includes(item.id) ? `Mark ${item.title} unread` : `Mark ${item.title} read`} /></article>)}</div>
    <footer className="modal-actions"><button className="secondary-action" onClick={onReadAll}>Mark all as read</button><button className="save-action" onClick={onClose}>Done</button></footer>
  </PanelFrame>;
}

export function CollectionPanel({ collection, saved, onToggleSaved, onExplore, onClose }: { collection: Collection; saved: boolean; onToggleSaved: () => void; onExplore: (query: string) => void; onClose: () => void }) {
  const paths: Record<string, string[]> = { rag: ["Dense retrieval", "Knowledge grounding", "Adaptive retrieval"], transformers: ["Self-attention", "Scaling laws", "Mixture of experts"], multimodal: ["Vision-language alignment", "Unified token spaces", "Embodied learning"], safety: ["Alignment", "Interpretability", "Scalable oversight"], evaluation: ["Benchmarks", "Human preference", "Real-world reliability"] };
  return <PanelFrame title={collection.title} eyebrow={collection.kicker} onClose={onClose} wide>
    <div className={`collection-detail-art detail-${collection.code}`}><span className="detail-core" /><i /><i /><i /></div>
    <div className="collection-detail-body"><div><p>This curated research path connects {collection.papers} papers across foundational work, turning points, and emerging directions.</p><div className="collection-paths">{(paths[collection.code] || []).map((path, index) => <button key={path} onClick={() => { onExplore(`Explore ${path} within ${collection.title}.`); onClose(); }}><small>0{index + 1}</small><strong>{path}</strong><span>→</span></button>)}</div></div><aside><span>Collection size</span><strong>{collection.papers} papers</strong><span>Reading time</span><strong>8 research paths</strong><button className={saved ? "save-action saved" : "save-action"} onClick={onToggleSaved}>{saved ? "✓ Saved collection" : "+ Save collection"}</button></aside></div>
  </PanelFrame>;
}
