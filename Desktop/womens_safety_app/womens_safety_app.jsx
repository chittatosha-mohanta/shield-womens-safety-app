import { useState } from "react";

const sections = [
    {
        id: "overview",
        label: "App Overview",
        icon: "◎",
    },
    {
        id: "architecture",
        label: "System Architecture",
        icon: "⬡",
    },
    {
        id: "features",
        label: "Core Features",
        icon: "✦",
    },
    {
        id: "userflow",
        label: "User Flows",
        icon: "⟶",
    },
    {
        id: "techstack",
        label: "Tech Stack",
        icon: "⬢",
    },
    {
        id: "security",
        label: "Security & Privacy",
        icon: "⊕",
    },
];

const features = [
    {
        id: "sos",
        title: "SOS Panic Button",
        color: "#FF3B5C",
        icon: "⚡",
        desc: "One-tap emergency alert triggers a cascade of actions: SMS + call to trusted contacts, live location share, police notification, and audio recording — all within 2 seconds.",
        subfeatures: [
            "Shake-to-activate (no unlock needed)",
            "Fake call disguise mode",
            "Silent SOS (no sound)",
            "Auto-repeat alerts every 5 min",
        ],
    },
    {
        id: "tracking",
        title: "Live Location Sharing",
        color: "#FF7A00",
        icon: "◎",
        desc: "Real-time GPS broadcast to trusted circle. Geofencing alerts when user deviates from expected route or enters flagged zones.",
        subfeatures: [
            "Route deviation alerts",
            "Safe arrival check-in",
            "Journey monitoring",
            "Crowd-sourced unsafe zone map",
        ],
    },
    {
        id: "contacts",
        title: "Trusted Circle",
        color: "#A855F7",
        icon: "◈",
        desc: "Priority contact network with tiered alert levels. Contacts receive native app push + SMS + call sequence based on severity.",
        subfeatures: [
            "Up to 10 trusted contacts",
            "Multi-tier escalation",
            "Companion app for contacts",
            "Response confirmation",
        ],
    },
    {
        id: "evidence",
        title: "Evidence Capture",
        color: "#0EA5E9",
        icon: "⬡",
        desc: "Discreet background recording of audio/video uploaded to secure cloud. Legally timestamped and encrypted for use in complaints.",
        subfeatures: [
            "Auto-upload to secure cloud",
            "Legal timestamp + hash",
            "Background audio record",
            "Screenshot to contacts",
        ],
    },
    {
        id: "ai",
        title: "AI Safety Assistant",
        color: "#10B981",
        icon: "✦",
        desc: "Conversational AI for safety planning, nearest safe locations, legal guidance, and emotional support — available 24/7 offline.",
        subfeatures: [
            "Offline first-aid guides",
            "Nearest shelter/hospital",
            "Legal rights information",
            "Emotional support mode",
        ],
    },
    {
        id: "community",
        title: "Community Shield",
        color: "#F59E0B",
        icon: "⊕",
        desc: "Anonymous reporting of unsafe areas. Heatmap of incidents. Verified volunteer network for in-person help.",
        subfeatures: [
            "Anonymous incident reports",
            "Safety heatmap",
            "Volunteer responder network",
            "NGO/authority integration",
        ],
    },
];

const techStack = {
    frontend: [
        { name: "React Native", desc: "Cross-platform mobile (iOS + Android)" },
        { name: "Expo", desc: "Build, update, and deploy" },
        { name: "Zustand", desc: "Lightweight state management" },
        { name: "React Query", desc: "Server state & caching" },
        { name: "Mapbox GL", desc: "Real-time maps & routing" },
    ],
    backend: [
        { name: "Node.js + Fastify", desc: "API gateway (high throughput)" },
        { name: "Python FastAPI", desc: "AI/ML microservice" },
        { name: "PostgreSQL", desc: "User & incident data" },
        { name: "Redis", desc: "Session, cache, rate-limit" },
        { name: "TimescaleDB", desc: "GPS time-series data" },
    ],
    infra: [
        { name: "AWS / GCP", desc: "Multi-region cloud hosting" },
        { name: "WebSockets", desc: "Real-time location streaming" },
        { name: "Twilio", desc: "SMS + voice alerts" },
        { name: "Firebase FCM", desc: "Push notifications" },
        { name: "S3 + KMS", desc: "Encrypted evidence storage" },
    ],
    ai: [
        { name: "OpenAI / Claude API", desc: "Safety assistant chatbot" },
        { name: "TensorFlow Lite", desc: "On-device threat detection" },
        { name: "Google Maps API", desc: "Route & safe zone analysis" },
        { name: "Whisper", desc: "Audio transcription for evidence" },
    ],
};

const userFlows = [
    {
        title: "Emergency SOS Flow",
        color: "#FF3B5C",
        steps: [
            { n: "01", label: "User activates SOS", sub: "Button, shake, or voice" },
            { n: "02", label: "App confirms identity", sub: "PIN / biometric (2s)" },
            { n: "03", label: "Alert dispatched", sub: "SMS + call + push to contacts" },
            { n: "04", label: "Location broadcast", sub: "Live GPS stream starts" },
            { n: "05", label: "Evidence capture", sub: "Background audio/video begins" },
            { n: "06", label: "Authorities notified", sub: "Police helpline auto-dialed" },
            { n: "07", label: "Timer countdown", sub: "5-min repeat if no cancel" },
            { n: "08", label: "All-clear or escalate", sub: "User cancels or contacts respond" },
        ],
    },
    {
        title: "Safe Journey Flow",
        color: "#A855F7",
        steps: [
            { n: "01", label: "User starts journey", sub: "Set destination + time" },
            { n: "02", label: "Contacts notified", sub: "Journey started + ETA" },
            { n: "03", label: "Live tracking", sub: "Route monitored in real-time" },
            { n: "04", label: "Deviation detected", sub: "AI flags route change" },
            { n: "05", label: "Auto check-in prompt", sub: "Are you safe? 60s timer" },
            { n: "06", label: "No response triggers SOS", sub: "Escalation begins" },
            { n: "07", label: "Safe arrival", sub: "User checks in, contacts notified" },
        ],
    },
];

const securityPillars = [
    {
        icon: "🔒",
        title: "End-to-End Encryption",
        desc: "All messages, location data, and evidence files are encrypted using AES-256. Keys are user-controlled — even Anthropic/platform cannot access.",
    },
    {
        icon: "🕵️",
        title: "Zero-Knowledge Architecture",
        desc: "Server stores only encrypted blobs. Location data is processed on-device where possible. Metadata is stripped from evidence files.",
    },
    {
        icon: "🛡️",
        title: "Minimal Data Collection",
        desc: "GDPR + DPDPA compliant. No behavioral tracking. Location data auto-deletes after 30 days. No ads, no third-party data sharing.",
    },
    {
        icon: "🧠",
        title: "Biometric & Disguise Modes",
        desc: "Fingerprint + face unlock. Calculator app disguise. Decoy PIN opens fake app. Panic PIN wipes sensitive data instantly.",
    },
    {
        icon: "🌐",
        title: "Offline-First Design",
        desc: "Core SOS, contacts, and safe locations work without internet. Cached maps, SMS fallback when data is unavailable.",
    },
    {
        icon: "🔍",
        title: "Regular Security Audits",
        desc: "Quarterly penetration testing. Bug bounty program. Open-source security-critical components for community review.",
    },
];

export default function App() {
    const [activeSection, setActiveSection] = useState("overview");
    const [activeFeature, setActiveFeature] = useState(null);
    const [activeStack, setActiveStack] = useState("frontend");
    const [activeFlow, setActiveFlow] = useState(0);

    return (
        <div style={{
            minHeight: "100vh",
            background: "#080B14",
            color: "#E8E0F0",
            fontFamily: "'Georgia', 'Times New Roman', serif",
            position: "relative",
            overflow: "hidden",
        }}>
            {/* Background grid */}
            <div style={{
                position: "fixed", inset: 0, zIndex: 0,
                backgroundImage: `linear-gradient(rgba(168,85,247,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.04) 1px, transparent 1px)`,
                backgroundSize: "48px 48px",
                pointerEvents: "none",
            }} />

            {/* Ambient glows */}
            <div style={{
                position: "fixed", top: "-20%", left: "-10%", width: "60vw", height: "60vw",
                borderRadius: "50%", background: "radial-gradient(circle, rgba(255,59,92,0.08) 0%, transparent 70%)",
                pointerEvents: "none", zIndex: 0,
            }} />
            <div style={{
                position: "fixed", bottom: "-20%", right: "-10%", width: "60vw", height: "60vw",
                borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)",
                pointerEvents: "none", zIndex: 0,
            }} />

            <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 24px 80px" }}>

                {/* Header */}
                <div style={{ textAlign: "center", padding: "60px 0 40px" }}>
                    <div style={{
                        display: "inline-block", padding: "6px 20px", borderRadius: 999,
                        border: "1px solid rgba(255,59,92,0.4)", color: "#FF3B5C",
                        fontSize: 11, letterSpacing: 4, textTransform: "uppercase", marginBottom: 24,
                    }}>Safety · Empowerment · Technology</div>

                    <h1 style={{
                        fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 900, lineHeight: 1.05,
                        margin: 0, letterSpacing: "-2px",
                        background: "linear-gradient(135deg, #FF3B5C 0%, #A855F7 50%, #0EA5E9 100%)",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    }}>SHIELD</h1>
                    <p style={{ color: "rgba(232,224,240,0.5)", fontSize: 14, letterSpacing: 2, marginTop: 8 }}>
                        Women's Safety Application — Full Architecture & Workflow
                    </p>
                </div>

                {/* Nav */}
                <nav style={{
                    display: "flex", gap: 4, justifyContent: "center", flexWrap: "wrap",
                    marginBottom: 48,
                }}>
                    {sections.map(s => (
                        <button key={s.id} onClick={() => setActiveSection(s.id)} style={{
                            padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer",
                            fontSize: 13, fontFamily: "inherit", letterSpacing: 0.5,
                            background: activeSection === s.id ? "rgba(168,85,247,0.2)" : "rgba(255,255,255,0.04)",
                            color: activeSection === s.id ? "#D8B4FE" : "rgba(232,224,240,0.5)",
                            borderBottom: activeSection === s.id ? "2px solid #A855F7" : "2px solid transparent",
                            transition: "all 0.2s",
                        }}>
                            {s.icon} {s.label}
                        </button>
                    ))}
                </nav>

                {/* ── OVERVIEW ── */}
                {activeSection === "overview" && (
                    <div>
                        <div style={{
                            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 40,
                        }}>
                            {[
                                { label: "Target Users", val: "Women & Girls", sub: "Ages 13–60+, urban & rural" },
                                { label: "Platforms", val: "iOS + Android", sub: "React Native, offline-first" },
                                { label: "Response Time", val: "< 2 seconds", sub: "SOS to alert dispatch" },
                                { label: "Coverage", val: "Global", sub: "Multi-language support" },
                            ].map(c => (
                                <div key={c.label} style={{
                                    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                                    borderRadius: 16, padding: "28px 24px",
                                }}>
                                    <div style={{ color: "rgba(232,224,240,0.4)", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>{c.label}</div>
                                    <div style={{ fontSize: 28, fontWeight: 800, color: "#E8E0F0", letterSpacing: "-1px" }}>{c.val}</div>
                                    <div style={{ color: "rgba(232,224,240,0.4)", fontSize: 13, marginTop: 4 }}>{c.sub}</div>
                                </div>
                            ))}
                        </div>

                        <div style={{
                            background: "rgba(255,59,92,0.06)", border: "1px solid rgba(255,59,92,0.2)",
                            borderRadius: 20, padding: "36px", marginBottom: 32,
                        }}>
                            <h2 style={{ margin: "0 0 16px", fontSize: 22, fontWeight: 700, color: "#FF3B5C" }}>Mission Statement</h2>
                            <p style={{ margin: 0, lineHeight: 1.8, fontSize: 15, color: "rgba(232,224,240,0.8)" }}>
                                SHIELD is a comprehensive personal safety ecosystem designed to empower women through proactive prevention, real-time emergency response, and community-driven safety intelligence. The app combines instant SOS capabilities, AI-powered assistance, discreet evidence capture, and a trusted contact network — all wrapped in a privacy-first architecture that keeps sensitive data exclusively under user control.
                            </p>
                        </div>

                        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "36px" }}>
                            <h2 style={{ margin: "0 0 24px", fontSize: 22, fontWeight: 700 }}>App Layers Overview</h2>
                            {[
                                { layer: "Presentation Layer", color: "#FF3B5C", items: ["Mobile App (React Native)", "Contact Companion App", "NGO/Admin Dashboard (Web)"] },
                                { layer: "Business Logic Layer", color: "#A855F7", items: ["SOS Engine", "Location Intelligence", "AI Safety Assistant", "Evidence Manager", "Notification Orchestrator"] },
                                { layer: "Data Layer", color: "#0EA5E9", items: ["PostgreSQL (Users, Incidents)", "TimescaleDB (GPS streams)", "Redis (Cache, Sessions)", "S3 (Encrypted Evidence)"] },
                                { layer: "Integration Layer", color: "#10B981", items: ["Twilio (SMS/Calls)", "Firebase FCM (Push)", "Police API", "Maps & Geocoding", "NGO Database"] },
                            ].map(l => (
                                <div key={l.layer} style={{ display: "flex", gap: 20, marginBottom: 20, alignItems: "flex-start" }}>
                                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: l.color, marginTop: 5, flexShrink: 0 }} />
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: 14, color: l.color, marginBottom: 6 }}>{l.layer}</div>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                            {l.items.map(i => (
                                                <span key={i} style={{
                                                    padding: "4px 12px", borderRadius: 6, fontSize: 12,
                                                    background: `${l.color}15`, border: `1px solid ${l.color}30`, color: "rgba(232,224,240,0.8)",
                                                }}>{i}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── ARCHITECTURE ── */}
                {activeSection === "architecture" && (
                    <div>
                        <h2 style={{ margin: "0 0 28px", fontSize: 28, fontWeight: 800, letterSpacing: "-1px" }}>System Architecture</h2>

                        {/* Architecture Diagram (Visual) */}
                        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: 32, marginBottom: 32 }}>
                            <div style={{ textAlign: "center", marginBottom: 24, fontSize: 12, color: "rgba(232,224,240,0.4)", letterSpacing: 2 }}>SYSTEM TOPOLOGY</div>

                            {/* Client */}
                            <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 32 }}>
                                {["Mobile App (User)", "Companion App (Contact)", "Admin Dashboard"].map((c, i) => (
                                    <div key={i} style={{
                                        padding: "12px 20px", borderRadius: 10, textAlign: "center",
                                        background: "rgba(255,59,92,0.1)", border: "1px solid rgba(255,59,92,0.3)",
                                        fontSize: 12, color: "#FF8FAD", flex: 1, maxWidth: 160,
                                    }}>{c}</div>
                                ))}
                            </div>

                            {/* Arrow down */}
                            <div style={{ textAlign: "center", color: "rgba(255,255,255,0.2)", marginBottom: 8, fontSize: 20 }}>↓</div>
                            <div style={{ textAlign: "center", fontSize: 10, color: "rgba(232,224,240,0.3)", letterSpacing: 2, marginBottom: 8 }}>HTTPS / WSS / gRPC</div>
                            <div style={{ textAlign: "center", color: "rgba(255,255,255,0.2)", marginBottom: 16, fontSize: 20 }}>↓</div>

                            {/* API Gateway */}
                            <div style={{ background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.3)", borderRadius: 10, padding: "14px 20px", textAlign: "center", marginBottom: 24 }}>
                                <div style={{ fontSize: 11, color: "#C084FC", letterSpacing: 2, marginBottom: 4 }}>API GATEWAY</div>
                                <div style={{ fontSize: 12, color: "rgba(232,224,240,0.6)" }}>Rate Limiting · Auth (JWT/OAuth) · Load Balancing · WAF</div>
                            </div>

                            {/* Microservices */}
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: 24 }}>
                                {[
                                    { name: "SOS Service", color: "#FF3B5C" },
                                    { name: "Location Service", color: "#FF7A00" },
                                    { name: "Auth Service", color: "#A855F7" },
                                    { name: "Notification Service", color: "#0EA5E9" },
                                    { name: "AI Service", color: "#10B981" },
                                    { name: "Evidence Service", color: "#F59E0B" },
                                ].map(s => (
                                    <div key={s.name} style={{
                                        padding: "12px 14px", borderRadius: 10, textAlign: "center",
                                        background: `${s.color}10`, border: `1px solid ${s.color}30`,
                                        fontSize: 12, color: "rgba(232,224,240,0.8)",
                                    }}>{s.name}</div>
                                ))}
                            </div>

                            <div style={{ textAlign: "center", color: "rgba(255,255,255,0.2)", marginBottom: 16, fontSize: 20 }}>↓</div>

                            {/* Data Layer */}
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 24 }}>
                                {[
                                    { name: "PostgreSQL", sub: "User & incident data", color: "#0EA5E9" },
                                    { name: "TimescaleDB", sub: "GPS time-series", color: "#10B981" },
                                    { name: "Redis", sub: "Cache & queues", color: "#F59E0B" },
                                    { name: "S3 + KMS", sub: "Encrypted evidence", color: "#A855F7" },
                                ].map(d => (
                                    <div key={d.name} style={{
                                        padding: "12px 14px", borderRadius: 10,
                                        background: `${d.color}10`, border: `1px solid ${d.color}30`,
                                    }}>
                                        <div style={{ fontSize: 13, fontWeight: 700, color: d.color }}>{d.name}</div>
                                        <div style={{ fontSize: 11, color: "rgba(232,224,240,0.5)", marginTop: 4 }}>{d.sub}</div>
                                    </div>
                                ))}
                            </div>

                            <div style={{ textAlign: "center", color: "rgba(255,255,255,0.2)", marginBottom: 8, fontSize: 20 }}>↓</div>

                            {/* External */}
                            <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
                                {["Twilio", "Firebase FCM", "Google Maps", "Police API", "NGO Network"].map(e => (
                                    <div key={e} style={{
                                        padding: "8px 16px", borderRadius: 6, fontSize: 11,
                                        background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                                        color: "rgba(232,224,240,0.5)",
                                    }}>{e}</div>
                                ))}
                            </div>
                        </div>

                        {/* Key Design Decisions */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
                            {[
                                { title: "Microservices Architecture", desc: "Each core function (SOS, Location, AI) is an independent service enabling independent scaling — SOS service scales to 10x during emergencies without affecting other services.", color: "#FF3B5C" },
                                { title: "Event-Driven Core", desc: "Apache Kafka/Redis Streams for async communication. SOS events trigger a fan-out to notification, location, evidence, and authority services simultaneously.", color: "#A855F7" },
                                { title: "Multi-Region Deployment", desc: "Active-active in 3 AWS regions with <50ms failover. Critical for emergency scenarios where uptime is literally life-or-death.", color: "#0EA5E9" },
                                { title: "Offline-First PWA Sync", desc: "Service workers cache critical data (contacts, maps, AI responses). SOS queues offline and fires when connection restores. SMS as ultimate fallback.", color: "#10B981" },
                            ].map(d => (
                                <div key={d.title} style={{
                                    background: `${d.color}08`, border: `1px solid ${d.color}20`,
                                    borderRadius: 14, padding: "24px",
                                }}>
                                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: d.color, marginBottom: 12 }} />
                                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10, color: d.color }}>{d.title}</div>
                                    <div style={{ fontSize: 13, color: "rgba(232,224,240,0.6)", lineHeight: 1.7 }}>{d.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── FEATURES ── */}
                {activeSection === "features" && (
                    <div>
                        <h2 style={{ margin: "0 0 28px", fontSize: 28, fontWeight: 800, letterSpacing: "-1px" }}>Core Features</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
                            {features.map(f => (
                                <div
                                    key={f.id}
                                    onClick={() => setActiveFeature(activeFeature === f.id ? null : f.id)}
                                    style={{
                                        background: activeFeature === f.id ? `${f.color}15` : "rgba(255,255,255,0.03)",
                                        border: `1px solid ${activeFeature === f.id ? f.color + "50" : "rgba(255,255,255,0.07)"}`,
                                        borderRadius: 16, padding: "24px", cursor: "pointer",
                                        transition: "all 0.2s",
                                    }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                                        <span style={{ fontSize: 28 }}>{f.icon}</span>
                                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: f.color, marginTop: 4 }} />
                                    </div>
                                    <h3 style={{ margin: "0 0 10px", fontSize: 17, fontWeight: 700, color: f.color }}>{f.title}</h3>
                                    <p style={{ margin: "0 0 16px", fontSize: 13, color: "rgba(232,224,240,0.6)", lineHeight: 1.7 }}>{f.desc}</p>
                                    {activeFeature === f.id && (
                                        <div style={{ borderTop: `1px solid ${f.color}20`, paddingTop: 16 }}>
                                            {f.subfeatures.map(sf => (
                                                <div key={sf} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "center" }}>
                                                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: f.color, flexShrink: 0 }} />
                                                    <span style={{ fontSize: 13, color: "rgba(232,224,240,0.7)" }}>{sf}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <div style={{ fontSize: 11, color: f.color, marginTop: 8, opacity: 0.7 }}>
                                        {activeFeature === f.id ? "▲ Collapse" : "▼ See details"}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── USER FLOWS ── */}
                {activeSection === "userflow" && (
                    <div>
                        <h2 style={{ margin: "0 0 28px", fontSize: 28, fontWeight: 800, letterSpacing: "-1px" }}>User Flows</h2>
                        <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
                            {userFlows.map((f, i) => (
                                <button key={i} onClick={() => setActiveFlow(i)} style={{
                                    padding: "10px 20px", borderRadius: 8, border: "none", cursor: "pointer",
                                    fontFamily: "inherit", fontSize: 13,
                                    background: activeFlow === i ? f.color + "20" : "rgba(255,255,255,0.04)",
                                    color: activeFlow === i ? f.color : "rgba(232,224,240,0.5)",
                                    borderBottom: activeFlow === i ? `2px solid ${f.color}` : "2px solid transparent",
                                    transition: "all 0.2s",
                                }}>{f.title}</button>
                            ))}
                        </div>

                        {userFlows.map((flow, fi) => fi === activeFlow && (
                            <div key={fi}>
                                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                                    {flow.steps.map((step, i) => (
                                        <div key={i} style={{ display: "flex", gap: 20, alignItems: "stretch" }}>
                                            {/* Timeline */}
                                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 48, flexShrink: 0 }}>
                                                <div style={{
                                                    width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
                                                    background: `${flow.color}20`, border: `2px solid ${flow.color}`,
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                    fontSize: 11, fontWeight: 800, color: flow.color,
                                                }}>{step.n}</div>
                                                {i < flow.steps.length - 1 && (
                                                    <div style={{ width: 2, flex: 1, minHeight: 20, background: `${flow.color}20`, margin: "4px 0" }} />
                                                )}
                                            </div>
                                            {/* Content */}
                                            <div style={{ paddingBottom: 24, paddingTop: 8, flex: 1 }}>
                                                <div style={{ fontWeight: 700, fontSize: 15, color: "#E8E0F0", marginBottom: 4 }}>{step.label}</div>
                                                <div style={{ fontSize: 13, color: "rgba(232,224,240,0.5)" }}>{step.sub}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Additional flows */}
                        <div style={{ marginTop: 40 }}>
                            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Additional App Flows</h3>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
                                {[
                                    { title: "Onboarding Flow", steps: ["Download & Sign Up", "Add Trusted Contacts", "Set Safety Preferences", "Tour Core Features", "Test SOS (silent mode)"], color: "#10B981" },
                                    { title: "Evidence Reporting", steps: ["Incident occurs", "App records audio/video", "Upload to secure cloud", "Generate legal report", "Share with authorities"], color: "#0EA5E9" },
                                    { title: "Community Report", steps: ["User notices unsafe area", "Anonymous report filed", "AI categorizes incident", "Added to safety heatmap", "Nearby users notified"], color: "#F59E0B" },
                                ].map(f => (
                                    <div key={f.title} style={{
                                        background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                                        borderRadius: 14, padding: "24px",
                                    }}>
                                        <h4 style={{ margin: "0 0 16px", color: f.color, fontSize: 14, fontWeight: 700 }}>{f.title}</h4>
                                        {f.steps.map((s, i) => (
                                            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "center" }}>
                                                <div style={{ width: 20, height: 20, borderRadius: "50%", background: `${f.color}15`, border: `1px solid ${f.color}30`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: f.color, fontWeight: 700 }}>{i + 1}</div>
                                                <span style={{ fontSize: 13, color: "rgba(232,224,240,0.7)" }}>{s}</span>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* ── TECH STACK ── */}
                {activeSection === "techstack" && (
                    <div>
                        <h2 style={{ margin: "0 0 28px", fontSize: 28, fontWeight: 800, letterSpacing: "-1px" }}>Tech Stack</h2>
                        <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
                            {Object.keys(techStack).map(k => (
                                <button key={k} onClick={() => setActiveStack(k)} style={{
                                    padding: "10px 20px", borderRadius: 8, border: "none", cursor: "pointer",
                                    fontFamily: "inherit", fontSize: 13, textTransform: "capitalize",
                                    background: activeStack === k ? "rgba(168,85,247,0.2)" : "rgba(255,255,255,0.04)",
                                    color: activeStack === k ? "#D8B4FE" : "rgba(232,224,240,0.5)",
                                    borderBottom: activeStack === k ? "2px solid #A855F7" : "2px solid transparent",
                                    transition: "all 0.2s",
                                }}>{k}</button>
                            ))}
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
                            {techStack[activeStack].map((t, i) => (
                                <div key={i} style={{
                                    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                                    borderRadius: 14, padding: "20px",
                                }}>
                                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: "#E8E0F0" }}>{t.name}</div>
                                    <div style={{ fontSize: 13, color: "rgba(232,224,240,0.5)" }}>{t.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── SECURITY ── */}
                {activeSection === "security" && (
                    <div>
                        <h2 style={{ margin: "0 0 8px", fontSize: 28, fontWeight: 800, letterSpacing: "-1px" }}>Security & Privacy</h2>
                        <p style={{ color: "rgba(232,224,240,0.5)", marginBottom: 32, fontSize: 14 }}>
                            A safety app that can be exploited is worse than no app. SHIELD is built security-first.
                        </p>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 40 }}>
                            {securityPillars.map(p => (
                                <div key={p.title} style={{
                                    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                                    borderRadius: 16, padding: "24px",
                                }}>
                                    <div style={{ fontSize: 28, marginBottom: 12 }}>{p.icon}</div>
                                    <h3 style={{ margin: "0 0 10px", fontSize: 15, fontWeight: 700, color: "#D8B4FE" }}>{p.title}</h3>
                                    <p style={{ margin: 0, fontSize: 13, color: "rgba(232,224,240,0.6)", lineHeight: 1.7 }}>{p.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div style={{ background: "rgba(255,59,92,0.06)", border: "1px solid rgba(255,59,92,0.2)", borderRadius: 16, padding: 28 }}>
                            <h3 style={{ margin: "0 0 16px", color: "#FF3B5C", fontSize: 16, fontWeight: 700 }}>Compliance & Certifications</h3>
                            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                                {["GDPR (EU)", "DPDPA (India)", "CCPA (California)", "ISO 27001", "SOC 2 Type II", "HIPAA (Health data)", "OWASP Top 10"].map(c => (
                                    <span key={c} style={{
                                        padding: "6px 14px", borderRadius: 20, fontSize: 12,
                                        background: "rgba(255,59,92,0.1)", border: "1px solid rgba(255,59,92,0.25)", color: "#FF8FAD",
                                    }}>{c}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}