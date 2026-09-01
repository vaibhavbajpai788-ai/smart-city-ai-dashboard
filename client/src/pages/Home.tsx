// Civic Signal Atlas: asymmetric control-room layout, semantic signal colors, warm ivory panels, restrained motion.
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Bell,
  Bot,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  CloudRain,
  Gauge,
  Layers3,
  MapPin,
  Menu,
  MoreHorizontal,
  Navigation,
  Radio,
  Search,
  Settings2,
  ShieldAlert,
  SlidersHorizontal,
  Sparkles,
  Thermometer,
  TrafficCone,
  Truck,
  Wind,
  X,
} from "lucide-react";

type SignalState = "RED" | "GREEN" | "YELLOW" | "OFFLINE";

type Junction = {
  id: string;
  name: string;
  ward: string;
  traffic: string;
  state: SignalState;
  remaining: number;
  x: string;
  y: string;
  density: number;
};

const junctions: Junction[] = [
  { id: "A", name: "Kanpur Road", ward: "Ward 07", traffic: "High", state: "RED", remaining: 32, x: "40%", y: "46%", density: 82 },
  { id: "B", name: "Civil Lines", ward: "Ward 03", traffic: "Medium", state: "GREEN", remaining: 18, x: "67%", y: "32%", density: 54 },
  { id: "C", name: "Mall Road", ward: "Ward 11", traffic: "High", state: "YELLOW", remaining: 5, x: "72%", y: "69%", density: 77 },
  { id: "D", name: "Sharda Nagar", ward: "Ward 14", traffic: "Low", state: "RED", remaining: 48, x: "29%", y: "72%", density: 21 },
];

const incidents = [
  { type: "Accident", place: "Kanpur Road Junction", time: "04:32 PM", level: "critical", icon: ShieldAlert, detail: "Possible collision detected from citizen report." },
  { type: "Traffic blockage", place: "Civil Lines Flyover", time: "04:21 PM", level: "high", icon: TrafficCone, detail: "Northbound lane moving 42% below baseline." },
  { type: "Street light", place: "Ward 12 · Ashok Nagar", time: "03:58 PM", level: "medium", icon: AlertTriangle, detail: "Three reports clustered within 180m." },
];

const stateColor: Record<SignalState, string> = { RED: "signal-red", GREEN: "signal-green", YELLOW: "signal-yellow", OFFLINE: "signal-grey" };

function SignalDot({ state, size = "sm" }: { state: SignalState; size?: "sm" | "lg" }) {
  return <span className={`signal-dot ${stateColor[state]} ${size === "lg" ? "signal-dot-lg" : ""}`} aria-label={state} />;
}

function StatCard({ label, value, trend, icon: Icon, tone = "cyan" }: { label: string; value: string; trend: string; icon: typeof Activity; tone?: string }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon tone-${tone}`}><Icon size={17} strokeWidth={2.2} /></div>
      <div className="stat-copy"><span>{label}</span><strong>{value}</strong><small>{trend}</small></div>
      <ArrowUpRight className="stat-arrow" size={16} />
    </div>
  );
}

export default function Home() {
  const [selectedId, setSelectedId] = useState("A");
  const [showLayers, setShowLayers] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filter, setFilter] = useState("All incidents");
  const [now, setNow] = useState(() => new Date());
  const [refreshTick, setRefreshTick] = useState(0);
  const [lastRefresh, setLastRefresh] = useState(() => new Date());

  useEffect(() => {
    const clock = window.setInterval(() => setNow(new Date()), 1000);
    const refresh = window.setInterval(() => {
      setRefreshTick((tick) => tick + 1);
      setLastRefresh(new Date());
    }, 12000);
    return () => {
      window.clearInterval(clock);
      window.clearInterval(refresh);
    };
  }, []);

  const displayJunctions = useMemo(() => junctions.map((junction, index) => {
    const wave = Math.round(Math.sin(refreshTick * 0.9 + index) * 6);
    const density = Math.max(8, Math.min(96, junction.density + wave));
    const remaining = Math.max(3, junction.remaining - ((refreshTick + index) % 4));
    const state = junction.state === "OFFLINE" ? junction.state : (refreshTick + index) % 7 === 0 ? "YELLOW" : junction.state;
    return { ...junction, density, remaining, state };
  }), [refreshTick]);
  const selected = useMemo(() => displayJunctions.find((j) => j.id === selectedId) ?? displayJunctions[0], [displayJunctions, selectedId]);
  const visibleIncidents = filter === "All incidents" ? incidents : incidents.filter((incident) => incident.level === filter.toLowerCase());
  const dateLabel = new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "2-digit", month: "long", year: "numeric" }).format(now).toUpperCase();
  const timeLabel = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(now);
  const secondsSinceRefresh = Math.max(0, Math.floor((now.getTime() - lastRefresh.getTime()) / 1000));
  const activeIncidents = 4 + (refreshTick % 2);
  const monitoredJunctions = 42 + (refreshTick % 3);
  const congestionRisk = Math.max(12, 18 + Math.round(Math.sin(refreshTick * 0.8) * 4));
  const aiRecommendations = 7 + (refreshTick % 2);

  const comingSoon = (label: string) => toast(`${label} is coming soon`, { description: "The visual prototype is ready for live data connectors." });

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="brand-lockup">
          <div className="brand-mark" aria-hidden="true"><span /><span /><span /><span /></div>
          <div><strong>smart city</strong><small>AI / CONTROL ROOM</small></div>
          <button className="icon-button mobile-close" onClick={() => setSidebarOpen(false)} aria-label="Close navigation"><X size={18} /></button>
        </div>
        <div className="workspace-switcher" onClick={() => comingSoon("Workspace switcher")}><span className="workspace-avatar">LU</span><div><b>Lucknow region</b><small>Operator workspace</small></div><ChevronDown size={15} /></div>
        <nav className="main-nav" aria-label="Primary navigation">
          <p className="nav-label">Monitor</p>
          <button className="nav-item active"><Activity size={17} />Overview<span className="nav-badge">4</span></button>
          <button className="nav-item" onClick={() => comingSoon("Incident queue")}><ShieldAlert size={17} />Incident queue<span className="nav-badge red">4</span></button>
          <button className="nav-item" onClick={() => comingSoon("Traffic intelligence")}><Navigation size={17} />Traffic intelligence</button>
          <button className="nav-item" onClick={() => comingSoon("City map")}><MapPin size={17} />City map</button>
          <p className="nav-label nav-label-spaced">Manage</p>
          <button className="nav-item" onClick={() => comingSoon("Reports")}><Gauge size={17} />Reports</button>
          <button className="nav-item" onClick={() => comingSoon("Data sources")}><Radio size={17} />Data sources</button>
        </nav>
        <div className="sidebar-footer"><button className="nav-item" onClick={() => comingSoon("Settings")}><Settings2 size={17} />Settings</button><button className="nav-item" onClick={() => comingSoon("Help centre")}><CircleHelp size={17} />Help centre</button><div className="operator-card"><div className="operator-avatar">AS</div><div><b>Aarav Sharma</b><small>Control room operator</small></div><MoreHorizontal size={16} /></div></div>
      </aside>
      {sidebarOpen && <button className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} aria-label="Close navigation" />}

      <main className="main-content">
        <header className="topbar"><button className="icon-button menu-button" onClick={() => setSidebarOpen(true)} aria-label="Open navigation"><Menu size={20} /></button><div className="breadcrumb"><span>Control room</span><span className="crumb-slash">/</span><b>Overview</b></div><div className="top-actions"><div className="live-status"><span className="live-pulse" />LIVE <span>Updated {secondsSinceRefresh}s ago</span></div><button className="icon-button" onClick={() => comingSoon("Notifications")} aria-label="Notifications"><Bell size={18} /><i /></button><button className="help-button" onClick={() => comingSoon("Command guide")}><CircleHelp size={16} /> Guide</button></div></header>

        <div className="content-wrap">
          <section className="hero-row"><div><p className="eyebrow"><span className="eyebrow-line" />{dateLabel} · {timeLabel}</p><h1>Good afternoon, Aarav<span className="headline-dot">.</span></h1><p className="hero-subtitle">Here is what is changing across Lucknow right now.</p></div><button className="primary-button" onClick={() => comingSoon("New incident report")}><ShieldAlert size={16} /> Report incident</button></section>

          <section className="stats-grid"><StatCard label="Active incidents" value={String(activeIncidents).padStart(2, "0")} trend="1 critical · 2 high" icon={ShieldAlert} tone="red" /><StatCard label="Monitored junctions" value={String(monitoredJunctions)} trend={`${monitoredJunctions - 4} responding normally`} icon={TrafficCone} tone="cyan" /><StatCard label="Congestion risk" value={`${congestionRisk}%`} trend="↓ 6% from yesterday" icon={Gauge} tone="green" /><StatCard label="AI recommendations" value={String(aiRecommendations).padStart(2, "0")} trend="3 need review" icon={Sparkles} tone="amber" /></section>

          <section className="workspace-grid">
            <div className="map-panel panel-card">
              <div className="panel-heading"><div><p className="panel-kicker">LIVE TRAFFIC MAP</p><h2>City signal overview</h2></div><div className="heading-actions"><button className="ghost-button" onClick={() => setShowLayers((v) => !v)}><Layers3 size={15} /> Layers <ChevronDown size={13} /></button><button className="icon-button panel-more" onClick={() => comingSoon("Map options")} aria-label="Map options"><MoreHorizontal size={17} /></button></div></div>
              <div className="map-stage"><div className="map-image" /><div className="map-grid-lines" /><div className="map-label label-north">N</div><div className="map-label label-east">E</div><div className="map-road road-one" /><div className="map-road road-two" /><div className="map-road road-three" /><div className="map-road road-four" />
                {displayJunctions.map((junction) => <button key={junction.id} className={`map-marker ${selectedId === junction.id ? "selected" : ""}`} style={{ left: junction.x, top: junction.y }} onClick={() => setSelectedId(junction.id)} aria-label={`Select ${junction.name} junction`}><span className="marker-ring" /><SignalDot state={junction.state} size="lg" /><span className="marker-card"><b>{junction.id} · {junction.name}</b><small>{junction.state} · {junction.remaining}s</small></span></button>)}
                <div className="map-scale"><span /> <small>500 m</small></div><div className={`layer-menu ${showLayers ? "layer-menu-visible" : ""}`}><b>Map layers</b><label><input type="checkbox" defaultChecked /> Signal state</label><label><input type="checkbox" defaultChecked /> Congestion</label><label><input type="checkbox" /> Incidents</label></div>
              </div>
              <div className="map-legend"><span><SignalDot state="RED" /> Red signal</span><span><SignalDot state="GREEN" /> Green signal</span><span><SignalDot state="YELLOW" /> Changing</span><span><SignalDot state="OFFLINE" /> Unavailable</span><button onClick={() => comingSoon("Full map")}><ArrowUpRight size={14} /> Open full map</button></div>
            </div>

            <aside className="ai-panel panel-card"><div className="ai-heading"><div className="ai-orb"><Bot size={19} /></div><div><p className="panel-kicker">AI INSIGHT</p><h2>Decision support</h2></div><span className="confidence-tag">LIVE</span></div><div className="ai-feature"><div className="ai-feature-top"><span className="ai-spark"><Sparkles size={15} /></span><span>Signal optimisation</span><span className="ai-time">just now</span></div><h3>Northbound traffic is building at Kanpur Road.</h3><p>Density is <b>{selected.density}%</b>, {Math.max(12, selected.density - 34)} points above the southbound lane. The next cycle is a good moment to rebalance.</p><div className="recommendation"><div className="recommendation-icon"><ArrowUpRight size={16} /></div><div><small>RECOMMENDATION</small><b>Extend north green by {10 + (refreshTick % 6)} sec</b></div></div><div className="ai-actions"><button className="primary-button small" onClick={() => toast("Recommendation marked for review")}>Review recommendation</button><button className="text-button" onClick={() => comingSoon("Recommendation details")}>Why this?</button></div></div><div className="ai-footer"><span><CheckCircle2 size={14} /> Explainable output</span><span>Confidence 94%</span></div></aside>
          </section>

          <section className="lower-grid"><div className="incidents-panel panel-card"><div className="panel-heading compact"><div><p className="panel-kicker">NEEDS ATTENTION</p><h2>Incident queue</h2></div><div className="filter-wrap"><SlidersHorizontal size={14} /><select value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter incidents"><option>All incidents</option><option>Critical</option><option>High</option><option>Medium</option></select></div></div><div className="incident-list">{visibleIncidents.map((incident) => { const Icon = incident.icon; return <button className="incident-row" key={incident.type} onClick={() => toast(`${incident.type}: ${incident.detail}`)}><div className={`incident-icon ${incident.level}`}><Icon size={16} /></div><div className="incident-copy"><div><b>{incident.type}</b><span className={`severity ${incident.level}`}>{incident.level}</span></div><p>{incident.place}</p><small>{incident.detail}</small></div><div className="incident-time">{incident.time}<ArrowUpRight size={15} /></div></button>; })}</div><button className="view-all-button" onClick={() => comingSoon("Incident queue")}>View all incidents <ArrowUpRight size={15} /></button></div>
            <div className="signals-panel panel-card"><div className="panel-heading compact"><div><p className="panel-kicker">SIGNAL NETWORK</p><h2>Junction status</h2></div><button className="text-button" onClick={() => comingSoon("Signal network")}>View network <ArrowUpRight size={14} /></button></div><div className="signal-table"><div className="signal-table-head"><span>Junction</span><span>Signal</span><span>Traffic</span></div>{displayJunctions.map((j) => <button className={`signal-table-row ${selectedId === j.id ? "row-selected" : ""}`} key={j.id} onClick={() => setSelectedId(j.id)}><div className="junction-name"><span className="junction-letter">{j.id}</span><span><b>{j.name}</b><small>{j.ward}</small></span></div><div className="signal-state"><SignalDot state={j.state} /><span>{j.state}</span><small>{j.remaining}s</small></div><div className="traffic-level"><span>{j.traffic}</span><div className="mini-bar"><i style={{ width: `${j.density}%` }} /></div></div></button>)}</div></div></section>

          <section className="footer-insights"><div className="weather-strip panel-card"><div className="weather-main"><CloudRain size={21} /><div><p>Lucknow weather</p><b>28° <span>Partly cloudy</span></b></div></div><div className="weather-metric"><Wind size={15} /><span>Wind</span><b>12 km/h</b></div><div className="weather-metric"><Thermometer size={15} /><span>Feels like</span><b>31°</b></div><div className="weather-note"><span className="amber-dot" /> Rain may increase road friction after 18:00</div></div></section>
        </div>
      </main>
    </div>
  );
}
