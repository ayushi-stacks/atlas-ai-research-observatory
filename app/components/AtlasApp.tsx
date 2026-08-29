"use client";

import { useEffect, useState } from "react";
import { AuthorsView } from "./AuthorsView";
import { Collection, CollectionShelf, CollectionsView } from "./CollectionsView";
import { CollectionPanel, NotificationsPanel, Panel, Preferences, ProfilePanel, SettingsPanel } from "./ControlPanels";
import { DiscoverView } from "./DiscoverView";
import { Navigation, ProfileData, View } from "./Navigation";
import { PaperView } from "./PaperView";
import { ResearchUniverse } from "./ResearchUniverse";
import { SearchPortal } from "./SearchPortal";
import { TimelineView } from "./TimelineView";
import { Topic } from "./data";

const defaultProfile: ProfileData = { name: "Ayushi Rao", role: "Explorer", institution: "Independent Researcher", bio: "Exploring how intelligent systems retrieve, reason, and collaborate.", interests: "RAG, multimodal learning, AI agents" };
const defaultPreferences: Preferences = { accent: "gold", reducedMotion: false, compact: false, weeklyDigest: true, newPaperAlerts: true };

function initials(name: string) { return name.split(" ").filter(Boolean).slice(0, 2).map((word) => word[0]).join("").toUpperCase() || "A"; }

function ObservatoryPanel({ onNotifications, onNavigate, onSearch }: { onNotifications: () => void; onNavigate: (view: View) => void; onSearch: (query: string) => void }) {
  const trends: [string, number, string][] = [["Large Language Models", 92, "120%"], ["Retrieval Augmented Generation", 85, "98%"], ["Multimodal Learning", 74, "75%"], ["AI Agents", 64, "63%"], ["Diffusion Models", 52, "50%"]];
  return <aside className="observatory-panel">
    <button className="notification" aria-label="Open notifications" onClick={onNotifications}>♧<span /></button>
    <section className="insight-panel"><span className="eyebrow">Today’s insight</span><blockquote>“The field of RAG has evolved <strong>300% faster</strong> since 2022.”</blockquote><button onClick={() => onNavigate("timeline")}>Explore the evolution <span>→</span></button><div className="insight-waves"><i /><i /><i /><i /></div></section>
    <button className="landscape-panel landscape-button" onClick={() => onNavigate("discover")}><header><span className="eyebrow">Research landscape</span><small>Live index</small></header><div className="landscape-art" aria-hidden="true"><i /><i /><i /><i /><i /></div><div className="metrics"><span><b>24.6K</b><small>Papers</small></span><span><b>8.3K</b><small>Authors</small></span><span><b>412</b><small>Institutions</small></span><span><b>128</b><small>Countries</small></span></div></button>
    <section className="trending-panel"><span className="eyebrow">Trending concepts</span>{trends.map(([label, width, growth]) => <button className="trend" key={label} onClick={() => onSearch(`Why is ${label} trending, and which recent papers should I read?`)}><span>{label}<small>↑ {growth}</small></span><i><b style={{ width: `${width}%` }} /></i></button>)}</section>
  </aside>;
}

function HomeView({ onNavigate, onSearch, onCollection }: { onNavigate: (view: View) => void; onSearch: (query: string) => void; onCollection: (collection: Collection) => void }) {
  const selectTopic = (topic: Topic) => onSearch(`How is ${topic.label} evolving, and which papers matter most?`);
  return <main className="home-view"><section className="hero-copy"><span className="star-symbol">✦</span><h1>ATLAS</h1><h2>AI Research Observatory</h2><p>Explore the universe of knowledge.<br />Connect papers, concepts, authors,<br />and ideas that shape the future.</p><button className="primary-action" onClick={() => onNavigate("discover")}>Begin exploring <span>→</span></button></section><ResearchUniverse onSelect={selectTopic} /><div className="home-search"><SearchPortal onSearch={onSearch} /></div><CollectionShelf onOpen={onCollection} onViewAll={() => onNavigate("collections")} /></main>;
}

function readLocal<T>(key: string, fallback: T): T { try { const value = window.localStorage.getItem(key); return value ? JSON.parse(value) as T : fallback; } catch { return fallback; } }

export function AtlasApp() {
  const [view, setView] = useState<View>("universe");
  const [query, setQuery] = useState("How has RAG evolved since 2020?");
  const [transitioning, setTransitioning] = useState(false);
  const [panel, setPanel] = useState<Panel>(null);
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  const [profile, setProfile] = useState(defaultProfile);
  const [preferences, setPreferences] = useState(defaultPreferences);
  const [savedCollections, setSavedCollections] = useState<string[]>([]);
  const [savedPapers, setSavedPapers] = useState<string[]>([]);
  const [readNotifications, setReadNotifications] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => { setProfile(readLocal("atlas-profile", defaultProfile)); setPreferences(readLocal("atlas-preferences", defaultPreferences)); setSavedCollections(readLocal("atlas-saved-collections", [])); setSavedPapers(readLocal("atlas-saved-papers", [])); setReadNotifications(readLocal("atlas-read-notifications", [])); setHydrated(true); }, []);
  useEffect(() => { if (!hydrated) return; localStorage.setItem("atlas-profile", JSON.stringify(profile)); localStorage.setItem("atlas-preferences", JSON.stringify(preferences)); localStorage.setItem("atlas-saved-collections", JSON.stringify(savedCollections)); localStorage.setItem("atlas-saved-papers", JSON.stringify(savedPapers)); localStorage.setItem("atlas-read-notifications", JSON.stringify(readNotifications)); }, [hydrated, profile, preferences, savedCollections, savedPapers, readNotifications]);
  useEffect(() => { if (!toast) return; const timeout = window.setTimeout(() => setToast(""), 2600); return () => window.clearTimeout(timeout); }, [toast]);
  useEffect(() => { const active = panel || selectedCollection; if (!active) return; const close = (event: KeyboardEvent) => { if (event.key === "Escape") { setPanel(null); setSelectedCollection(null); } }; document.body.style.overflow = "hidden"; window.addEventListener("keydown", close); return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", close); }; }, [panel, selectedCollection]);

  function navigate(next: View) { setPanel(null); setSelectedCollection(null); if (next === view) return; setTransitioning(true); window.setTimeout(() => { setView(next); window.scrollTo({ top: 0, behavior: preferences.reducedMotion ? "auto" : "smooth" }); setTransitioning(false); }, preferences.reducedMotion ? 10 : 220); }
  function search(nextQuery: string) { setQuery(nextQuery); navigate("discover"); }
  function toggleSavedCollection(code: string) { const saving = !savedCollections.includes(code); setSavedCollections((current) => saving ? [...current, code] : current.filter((item) => item !== code)); setToast(saving ? "Collection saved to your profile" : "Collection removed from saved items"); }
  function togglePaper() { const id = "rag-2020"; const saving = !savedPapers.includes(id); setSavedPapers((current) => saving ? [...current, id] : current.filter((item) => item !== id)); setToast(saving ? "Paper saved to your library" : "Paper removed from your library"); }
  function saveProfile(next: ProfileData) { setProfile(next); setToast("Profile updated"); }
  function savePreferences(next: Preferences) { setPreferences(next); setToast("Observatory preferences saved"); }
  useEffect(() => { document.title = view === "universe" ? "ATLAS — AI Research Observatory" : `${view[0].toUpperCase() + view.slice(1)} — ATLAS`; }, [view]);

  let content = <HomeView onNavigate={navigate} onSearch={search} onCollection={setSelectedCollection} />;
  if (view === "discover") content = <DiscoverView query={query} onSearch={search} onOpenPaper={() => navigate("paper")} />;
  if (view === "timeline") content = <TimelineView onExplore={search} />;
  if (view === "collections") content = <CollectionsView onOpen={setSelectedCollection} />;
  if (view === "authors") content = <AuthorsView onExplore={search} />;
  if (view === "paper") content = <PaperView onBack={() => navigate("discover")} onExplore={search} saved={savedPapers.includes("rag-2020")} onToggleSaved={togglePaper} />;

  return <div className={`atlas-shell accent-${preferences.accent} ${preferences.reducedMotion ? "motion-off" : ""} ${preferences.compact ? "compact-mode" : ""}`}>
    <div className="grain" aria-hidden="true" />
    <Navigation view={view} onNavigate={navigate} onOpenSettings={() => setPanel("settings")} onOpenProfile={() => setPanel("profile")} profile={profile} />
    <div className="mobile-utilities"><button onClick={() => setPanel("settings")} aria-label="Open settings">⚙</button><button onClick={() => setPanel("profile")} aria-label="Open profile">{initials(profile.name)}</button></div>
    <div className={transitioning ? "page-stage transitioning" : "page-stage"}>{content}</div>
    {view === "universe" && <ObservatoryPanel onNotifications={() => setPanel("notifications")} onNavigate={navigate} onSearch={search} />}
    {panel === "settings" && <SettingsPanel preferences={preferences} onSave={savePreferences} onClose={() => setPanel(null)} />}
    {panel === "profile" && <ProfilePanel profile={profile} onSave={saveProfile} onClose={() => setPanel(null)} savedCount={savedCollections.length + savedPapers.length} />}
    {panel === "notifications" && <NotificationsPanel read={readNotifications} onToggle={(id) => setReadNotifications((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])} onReadAll={() => { setReadNotifications(["rag", "agents", "safety"]); setToast("All research signals marked as read"); }} onExplore={search} onClose={() => setPanel(null)} />}
    {selectedCollection && <CollectionPanel collection={selectedCollection} saved={savedCollections.includes(selectedCollection.code)} onToggleSaved={() => toggleSavedCollection(selectedCollection.code)} onExplore={search} onClose={() => setSelectedCollection(null)} />}
    {toast && <div className="toast" role="status"><span>✦</span>{toast}</div>}
  </div>;
}
