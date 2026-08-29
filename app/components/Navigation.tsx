"use client";

export type View = "universe" | "discover" | "timeline" | "collections" | "authors" | "paper";
export type ProfileData = { name: string; role: string; institution: string; bio: string; interests: string };

const items: { id: View; label: string; glyph: string }[] = [
  { id: "universe", label: "Universe", glyph: "◉" },
  { id: "discover", label: "Discover", glyph: "⌕" },
  { id: "timeline", label: "Timeline", glyph: "≋" },
  { id: "collections", label: "Collections", glyph: "▦" },
  { id: "authors", label: "Authors", glyph: "♙" },
];

function initials(name: string) {
  return name.split(" ").filter(Boolean).slice(0, 2).map((word) => word[0]).join("").toUpperCase() || "A";
}

export function Navigation({ view, onNavigate, onOpenSettings, onOpenProfile, profile }: { view: View; onNavigate: (view: View) => void; onOpenSettings: () => void; onOpenProfile: () => void; profile: ProfileData }) {
  return (
    <aside className="navigation" aria-label="Primary navigation">
      <button className="nav-mark" onClick={() => onNavigate("universe")} aria-label="ATLAS home"><span className="mark-orbit mark-orbit-a" /><span className="mark-orbit mark-orbit-b" /><span className="mark-core" /></button>
      <nav>{items.map((item) => <button key={item.id} className={view === item.id ? "nav-item active" : "nav-item"} onClick={() => onNavigate(item.id)}><span className="nav-glyph" aria-hidden="true">{item.glyph}</span><span>{item.label}</span></button>)}</nav>
      <button className="nav-item settings" onClick={onOpenSettings}><span className="nav-glyph" aria-hidden="true">⚙</span><span>Settings</span></button>
      <button className="profile" aria-label="Open profile" onClick={onOpenProfile}>
        <span className="avatar">{initials(profile.name)}</span><span className="profile-copy"><strong>{profile.name.split(" ")[0]}</strong><small>{profile.role}</small></span><span>⌄</span>
      </button>
    </aside>
  );
}
