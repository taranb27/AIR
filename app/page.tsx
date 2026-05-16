"use client";

import { useState, useEffect, useRef } from "react";

// ─── Intro overlay ────────────────────────────────────────────────────────────
function Intro({ onGone, navTextRef }: { onGone: () => void; navTextRef: React.RefObject<HTMLSpanElement | null> }) {
  const [vis, setVis]           = useState([false, false, false, false, false]);
  const [expanded, setExpanded] = useState(false);
  const [fading, setFading]     = useState(false);
  const [gone, setGone]         = useState(false);
  const [exitTransform, setExitTransform] = useState("none");

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";

    const reveals = [80, 210, 340, 470, 600];
    const ts = reveals.map((d, i) =>
      setTimeout(() => setVis(v => { const n = [...v]; n[i] = true; return n; }), d)
    );
    const t1 = setTimeout(() => setExpanded(true), 1100);
    const t2 = setTimeout(() => {
      if (navTextRef.current) {
        const rect = navTextRef.current.getBoundingClientRect();
        const tx = (rect.left + rect.width / 2) - window.innerWidth / 2;
        const ty = (rect.top + rect.height / 2) - window.innerHeight / 2;
        setExitTransform(`translateX(${tx}px) translateY(${ty}px) scale(0.18)`);
      }
      setFading(true);
    }, 2500);
    const t3 = setTimeout(() => {
      document.body.style.overflow = "";
      setGone(true);
      onGone();
    }, 3100);
    return () => { [...ts, t1, t2, t3].forEach(clearTimeout); };
  }, [onGone, navTextRef]);

  if (gone) return null;

  const big   = "clamp(52px, 10vw, 88px)";
  const small = "clamp(26px, 3.8vw, 42px)";
  const ease  = "cubic-bezier(0.4, 0, 0.2, 1)";

  const letter = (idx: number): React.CSSProperties => ({
    fontWeight: 700, color: "#ffffff", lineHeight: 1, display: "inline-block",
    fontSize: expanded ? small : big,
    opacity: vis[idx] ? 1 : 0,
    transform: vis[idx] ? "translateY(0)" : "translateY(14px)",
    transition: expanded
      ? `font-size 0.7s ${ease}`
      : "opacity 0.38s ease, transform 0.38s ease",
  });

  const dot = (idx: number): React.CSSProperties => ({
    color: "#8b7d98", lineHeight: 1, display: "inline-block", overflow: "hidden",
    fontSize: expanded ? small : big,
    opacity: vis[idx] ? (expanded ? 0 : 1) : 0,
    maxWidth: expanded ? "0px" : "1.2em",
    transform: vis[idx] ? "translateY(0)" : "translateY(14px)",
    transition: expanded
      ? `opacity 0.28s ease, max-width 0.4s ${ease}, font-size 0.7s ${ease}`
      : "opacity 0.38s ease, transform 0.38s ease",
  });

  const suffix = (delay: number): React.CSSProperties => ({
    fontWeight: 700, color: "#ffffff", lineHeight: 1,
    display: "inline-block", overflow: "hidden", whiteSpace: "nowrap",
    fontSize: small,
    maxWidth: expanded ? "500px" : "0px",
    transition: `max-width 0.7s ${ease} ${delay}ms`,
  });

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      backgroundColor: fading ? "rgba(0,0,0,0)" : "#000000",
      display: "flex", alignItems: "center", justifyContent: "center",
      transition: "background-color 0.65s ease",
      pointerEvents: fading ? "none" : "all",
    }}>
      <div style={{
        display: "flex", alignItems: "baseline",
        opacity: fading ? 0 : 1,
        transform: fading ? exitTransform : "none",
        transition: fading ? "transform 0.65s cubic-bezier(0.4,0,0.2,1), opacity 0.5s ease" : "none",
      }}>
        <span style={letter(0)}>A</span>
        <span style={suffix(40)}>rtificial&nbsp;</span>

        <span style={dot(1)}>.</span>

        <span style={letter(2)}>I</span>
        <span style={suffix(90)}>ntelligence&nbsp;&amp;&nbsp;</span>

        <span style={dot(3)}>.</span>

        <span style={letter(4)}>R</span>
        <span style={suffix(140)}>obotics</span>
      </div>
    </div>
  );
}

// ─── Scroll-reveal wrapper ────────────────────────────────────────────────────
function Reveal({ children, delay = 0, y = 26, style }: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : `translateY(${y}px)`,
      transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

// ─── Arrow icon ───────────────────────────────────────────────────────────────
const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);



// ─── Dot types ────────────────────────────────────────────────────────────────
interface Dot { x: number; y: number; size: number; opacity: number; }

// ─── Card dots (About card) ───────────────────────────────────────────────────
function CardDots() {
  const [dots, setDots] = useState<Dot[]>([]);
  useEffect(() => {
    setDots(Array.from({ length: 30 }, (_, i) => ({
      x: (i * 61.8033) % 100, y: (i * 38.1966) % 100,
      size: i % 6 === 0 ? 3 : i % 3 === 0 ? 2 : 1.2,
      opacity: i % 6 === 0 ? 0.5 : i % 3 === 0 ? 0.3 : 0.18,
    })));
  }, []);
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {dots.map((d, i) => (
        <div key={i} style={{
          position: "absolute", left: `${d.x}%`, top: `${d.y}%`,
          width: d.size, height: d.size, borderRadius: "50%",
          background: "#ffffff", opacity: d.opacity, transform: "translate(-50%,-50%)",
        }} />
      ))}
    </div>
  );
}



// ─── Small icons ──────────────────────────────────────────────────────────────
const ChatIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>;
const GearIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="3" /><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>;
const CpuIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" /></svg>;

// ─── MENU OVERLAY ────────────────────────────────────────────────────────────
const MENU_ITEMS = [
  { href: "#services",   label: "Services",     img: "/menu/services.jpg"    },
  { href: "#industries", label: "Industries",   img: "/menu/industries.jpg"  },
  { href: "#work",       label: "Case Studies", img: "/menu/case-studies.jpg"},
  { href: "#pricing",    label: "Pricing",      img: "/menu/pricing.jpg"     },
  { href: "#faq",        label: "FAQ",          img: "/menu/faq.jpg"         },
  { href: "#book",       label: "Book a Call",  img: "/menu/book.jpg"        },
];

function MenuOverlay({ onClose, links }: { onClose: () => void; links: { href: string; label: string }[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  void links;
  return (
    <div className="menu-overlay" style={{
      position: "fixed", inset: 0, zIndex: 70, background: "#ffffff",
      display: "grid", gridTemplateColumns: "55fr 45fr",
    }}>
      {/* ── Close button — top right of screen ── */}
      <button onClick={onClose} aria-label="Close menu" style={{
        position: "absolute", top: "14px", right: "40px", zIndex: 10,
        background: "none", border: "none", cursor: "pointer", padding: "10px",
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* ── Left panel ── */}
      <div style={{ display: "flex", flexDirection: "column", padding: "0 clamp(36px, 8vw, 120px)" }}>

        {/* Top bar — logo only */}
        <div style={{ height: "68px", display: "flex", alignItems: "center", flexShrink: 0 }}>
          <a href="/" onClick={onClose} style={{ textDecoration: "none" }}>
            <img src="/air-logo.png" alt="A.I.R" style={{ height: "36px", width: "auto", objectFit: "contain" }} />
          </a>
        </div>

        {/* Nav links */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "2px" }}>
          {MENU_ITEMS.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={onClose}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                fontSize: "clamp(28px, 3.6vw, 52px)", fontWeight: 400,
                letterSpacing: "-0.03em", lineHeight: 1.3,
                textDecoration: "none", display: "block", padding: "2px 0",
                color: item.href === "#book" ? "#8b7d98" : "#000000",
                opacity: hovered === null || hovered === i ? 1 : 0.2,
                transition: "opacity 0.2s ease",
              }}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Bottom */}
        <div style={{ paddingBottom: "40px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <a href="mailto:taran@airdevconsultancy.co.uk" style={{ fontSize: "13px", color: "#000", textDecoration: "none", opacity: 0.5 }}>
            taran@airdevconsultancy.co.uk
          </a>
          <a href="#" style={{ fontSize: "13px", color: "#000", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px", opacity: 0.5 }}>
            LinkedIn <Arrow />
          </a>
        </div>
      </div>

      {/* ── Right panel: crossfading images ── */}
      <div className="menu-right-panel" style={{ position: "relative", overflow: "hidden", background: "#0a0a0a" }}>
        {/* Default state — shown when nothing hovered */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(160deg, #1a1a1a 0%, #0a0a0a 100%)",
          opacity: hovered === null ? 1 : 0,
          transition: "opacity 0.35s ease",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <p style={{ fontSize: "clamp(14px, 1.4vw, 18px)", color: "rgba(255,255,255,0.18)", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 500 }}>
            A.I.R
          </p>
        </div>

        {/* Per-link images */}
        {MENU_ITEMS.map((item, i) => (
          <div key={i} style={{
            position: "absolute", inset: 0,
            opacity: hovered === i ? 1 : 0,
            transition: "opacity 0.35s ease",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.img} alt={item.label}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.55) 100%)" }} />
          </div>
        ))}

        {/* Hovered label overlay */}
        <div style={{
          position: "absolute", bottom: "36px", left: "36px",
          opacity: hovered !== null ? 1 : 0,
          transform: hovered !== null ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.25s ease, transform 0.25s ease",
          pointerEvents: "none",
        }}>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "6px" }}>
            {hovered !== null ? MENU_ITEMS[hovered].label : ""}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Nav({ introGone, navTextRef }: { introGone: boolean; navTextRef: React.RefObject<HTMLSpanElement | null> }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 56);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const links = [
    { href: "#services",  label: "Services"      },
    { href: "#industries",label: "Industries"    },
    { href: "#work",      label: "Case Studies"  },
    { href: "#pricing",   label: "Pricing"       },
    { href: "#faq",       label: "FAQ"           },
  ];

  const navBg  = scrolled ? "rgba(255,255,255,0.96)" : "transparent";
  const subCol = scrolled ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.42)";
  const lineCol = scrolled ? "#000000" : "#ffffff";

  return (
    <>
      <nav className="nav-bar" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 60,
        height: "68px", display: "flex", alignItems: "center", padding: "0 40px",
        background: navBg, backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "none",
        transition: "background 0.35s ease, border-color 0.35s ease",
      }}>
        <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0,
          opacity: introGone ? 1 : 0, transition: "opacity 0.5s ease",
        }}>
          <img src="/air-logo.png" alt="A.I.R" style={{ height: "36px", width: "auto", objectFit: "contain" }} />
        </a>
        <span ref={navTextRef} style={{
          position: "absolute", left: "50%", transform: "translateX(-50%)",
          fontSize: "13px", color: subCol, letterSpacing: "0.01em",
          pointerEvents: "none", whiteSpace: "nowrap", transition: "color 0.35s, opacity 0.5s ease",
          opacity: introGone ? 1 : 0,
        }}>
          Artificial Intelligence &amp; Robotics
        </span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "16px" }}>
          <a href="#book" style={{
            padding: "9px 20px", borderRadius: "60px", fontSize: "13px", fontWeight: 600,
            background: scrolled ? "#000000" : "rgba(255,255,255,0.12)",
            color: "#ffffff", textDecoration: "none",
            border: scrolled ? "none" : "1px solid rgba(255,255,255,0.25)",
            transition: "background 0.22s",
          }}>Book a Call</a>
          <button onClick={() => setOpen(true)} aria-label="Open menu" style={{
            background: "none", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", gap: "5px", padding: "10px 4px",
          }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{ display: "block", width: "22px", height: "1.5px", background: lineCol, borderRadius: "2px", transition: "background 0.35s" }} />
            ))}
          </button>
        </div>
      </nav>

      {open && (
        <MenuOverlay onClose={() => setOpen(false)} links={links} />
      )}
    </>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{
      position: "relative", height: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden", background: "#000000",
    }}>
      <video autoPlay muted loop playsInline
        onEnded={e => { e.currentTarget.currentTime = 0; e.currentTarget.play(); }}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}>
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.62)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(139,125,152,0.18) 0%, rgba(80,60,100,0.22) 50%, rgba(0,0,0,0.1) 100%)" }} />

      <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 24px", maxWidth: "900px", width: "100%" }}>
        <h1 style={{ fontSize: "clamp(36px, 4.8vw, 58px)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.04em", marginBottom: "24px" }}>
          <span style={{ color: "#ffffff", display: "block" }}>What if your business</span>
          <span style={{ display: "block", background: "linear-gradient(90deg, #ffffff 11%, #514f4f)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            ran itself?
          </span>
        </h1>
        <p style={{ fontSize: "clamp(14px, 1.5vw, 17px)", color: "#808080", lineHeight: 1.72, maxWidth: "440px", margin: "0 auto 40px" }}>
          A.I.R builds AI systems that handle calls, qualify leads, automate workflows, and run 24/7 — so your team focuses on what matters.
        </p>
        <a href="#book" style={{
          display: "inline-flex", alignItems: "center", gap: "14px",
          padding: "14px 26px", borderRadius: "60px",
          background: "rgba(255,255,255,0.06)",
          boxShadow: "inset 0 -7px 15px rgba(255,255,255,0.04), inset 0 -1px 0 rgba(255,255,255,0.18), inset -1px 0 0 rgba(255,255,255,0.18), inset 1px 0 0 rgba(255,255,255,0.18), inset 0 1px 0 rgba(255,255,255,0.06)",
          color: "#ffffff", fontSize: "14px", fontWeight: 500, textDecoration: "none", transition: "background 0.22s",
        }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(139,125,152,0.18)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}>
          Book your Discovery Call
          <span style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.5)" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.4)", display: "inline-block" }} />
            <Arrow />
          </span>
        </a>
      </div>
    </section>
  );
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────
function AboutCard() {
  return (
    <div className="about-card" style={{
      position: "relative", width: "100%", aspectRatio: "4 / 3.5",
      borderRadius: "20px", overflow: "hidden",
      background: "linear-gradient(180deg, #f7ecfc 0%, #d4c7e0 24%, #a697b4 100%)",
    }}>
      <CardDots />
      {[
        { top: "20%", left: "14%", icon: <ChatIcon /> },
        { top: "44%", right: "12%", icon: <GearIcon /> },
        { top: "68%", left: "20%", icon: <CpuIcon /> },
      ].map((b, i) => (
        <div key={i} style={{
          position: "absolute", ...b, width: 34, height: 34, borderRadius: "50%",
          background: "rgba(255,255,255,0.32)", border: "1px solid rgba(255,255,255,0.5)",
          display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.85)",
        }}>
          {b.icon}
        </div>
      ))}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontSize: "15px", fontWeight: 500, color: "rgba(255,255,255,0.75)", letterSpacing: "0.06em" }}>AI Systems</p>
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" style={{ background: "#ffffff", paddingTop: "110px", paddingBottom: "110px" }}>
      <div className="section-inner" style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 40px" }}>
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <Reveal><AboutCard /></Reveal>
          <Reveal delay={160}><div>
            <p style={{ fontSize: "13px", color: "#808080", marginBottom: "20px" }}>About Us</p>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 44px)", fontWeight: 700, lineHeight: 1.18, letterSpacing: "-0.03em", color: "#000000", marginBottom: "20px" }}>
              A.I.R helps UK service businesses turn AI potential into measurable{" "}
              <span style={{ color: "#8b7d98" }}>impact</span>
            </h2>
            <p style={{ fontSize: "15px", color: "#808080", lineHeight: 1.82, marginBottom: "28px" }}>
              We combine strategic consulting with hands-on technical delivery — building AI systems that handle calls, automate workflows, qualify leads, and run around the clock. From the first discovery call to a fully live system, we own the entire process.
            </p>
            <div style={{ height: "1px", background: "#ccccd8", marginBottom: "28px" }} />
            <a href="#book" style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              fontSize: "14px", color: "#8b7d98", textDecoration: "none", transition: "color 0.2s", fontWeight: 500,
            }}
              onMouseEnter={e => (e.currentTarget.style.color = "#6d6080")}
              onMouseLeave={e => (e.currentTarget.style.color = "#8b7d98")}>
              Book your Discovery Call <Arrow />
            </a>
          </div></Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── SERVICES ────────────────────────────────────────────────────────────────
const SERVICES = [
  { num: "01", title: "AI Voice Agent", desc: "24/7 inbound call handling — answers, qualifies, books appointments, and escalates. Your phone never goes unanswered again.", tags: ["Inbound Calls", "24/7", "Appointment Booking"] },
  { num: "02", title: "Lead Generation & Qualification", desc: "Automated systems that find, capture, score, and route leads before a human needs to get involved.", tags: ["Lead Scoring", "Outreach", "CRM Routing"] },
  { num: "03", title: "Client Intake Automation", desc: "Streamlined onboarding workflows that collect information, verify documents, and set expectations — without manual back-and-forth.", tags: ["Onboarding", "Document Capture", "Workflows"] },
  { num: "04", title: "Document & Workflow Automation", desc: "End-to-end document processing — drafting, reviewing, routing, and filing — integrated into your existing tools.", tags: ["Document AI", "Process Automation", "Integrations"] },
  { num: "05", title: "Follow-Up & Nurture Sequences", desc: "Automated multi-touch follow-up sequences via email, SMS, or voice — timed perfectly to convert without being pushy.", tags: ["Email", "SMS", "Voice Follow-Up"] },
  { num: "06", title: "Compliance & Regulatory Automation", desc: "Stay compliant without the manual overhead. Automated monitoring, reporting, and alerts aligned to your sector's requirements.", tags: ["FCA", "SRA", "AML", "Compliance"] },
  { num: "07", title: "CRM Integration & Data Pipelines", desc: "Connect your tools, unify your data. We integrate AI into any CRM and build clean pipelines that keep everything in sync.", tags: ["CRM", "API Integrations", "Data Sync"] },
  { num: "08", title: "AI Dashboards & Reporting", desc: "Real-time KPI dashboards that surface what matters — call volumes, conversion rates, time saved, revenue impact.", tags: ["Dashboards", "KPIs", "Reporting"] },
  { num: "09", title: "AI Strategy & Discovery Audit", desc: "Not sure where to start? We audit your operation and produce a prioritised roadmap of where AI delivers the fastest, highest ROI.", tags: ["Strategy", "Roadmap", "ROI Analysis"] },
];

function ServiceRow({ s, last }: { s: typeof SERVICES[0]; last: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="service-row" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{
      borderTop: "1px solid #eae8f0", padding: "32px 0",
      display: "grid", gridTemplateColumns: "72px 1fr auto",
      alignItems: "center", gap: "24px",
      borderBottom: last ? "1px solid #eae8f0" : "none",
      cursor: "default", transition: "background 0.18s",
    }}>
      <span className="service-num" style={{ fontSize: "13px", color: "#b0a8c0", fontWeight: 500, letterSpacing: "0.04em" }}>{s.num}</span>
      <div>
        <h3 style={{ fontSize: "clamp(17px, 1.8vw, 22px)", fontWeight: 700, color: hovered ? "#8b7d98" : "#000000", letterSpacing: "-0.02em", marginBottom: "8px", transition: "color 0.2s" }}>{s.title}</h3>
        <p style={{ fontSize: "14px", color: "#808080", lineHeight: 1.72, maxWidth: "560px", marginBottom: "14px" }}>{s.desc}</p>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {s.tags.map(t => (
            <span key={t} style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9088a0", border: "1px solid #ccccd8", borderRadius: "60px", padding: "3px 10px" }}>{t}</span>
          ))}
        </div>
      </div>
      <div style={{
        width: 40, height: 40, borderRadius: "50%",
        border: `1px solid ${hovered ? "#8b7d98" : "#ccccd8"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: hovered ? "#8b7d98" : "#9088a4", flexShrink: 0,
        transition: "color 0.2s, border-color 0.2s",
        transform: hovered ? "translateX(4px)" : "translateX(0)",
      }}>
        <Arrow />
      </div>
    </div>
  );
}

function Services() {
  return (
    <section id="services" style={{ background: "#f2f2f2", paddingTop: "120px", paddingBottom: "100px" }}>
      <div className="section-inner" style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 40px" }}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "64px", gap: "40px", flexWrap: "wrap" }}>
            <div>
              <p style={{ fontSize: "13px", color: "#808080", marginBottom: "16px" }}>What We Do</p>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.1, color: "#000000", maxWidth: "500px" }}>
                Intelligent services,<br /><span style={{ color: "#8b7d98" }}>real-world results</span>
              </h2>
            </div>
            <p style={{ fontSize: "14px", color: "#808080", lineHeight: 1.78, maxWidth: "300px" }}>
              Every engagement starts with understanding your business — not selling you a product. We build exactly what you need.
            </p>
          </div>
        </Reveal>
        {SERVICES.map((s, i) => (
          <Reveal key={s.num} delay={i * 55}>
            <ServiceRow s={s} last={i === SERVICES.length - 1} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── INDUSTRIES ──────────────────────────────────────────────────────────────
const INDUSTRIES = [
  {
    name: "Estate Agents",
    pain: "Stop losing instructions to missed calls and slow follow-up.",
    services: ["AI Voice Agent", "Viewing Booking Automation", "AML Compliance", "Vendor Follow-Up"],
    image: "/industries/estate-agents.jpg",
  },
  {
    name: "Law Firms",
    pain: "Handle more clients without growing your headcount.",
    services: ["Client Intake & Triage", "Document Drafting AI", "SRA Compliance", "Out-of-Hours Voice Agent"],
    image: "/industries/law-firms.jpg",
  },
  {
    name: "Recruitment Agencies",
    pain: "Fill roles faster with AI-powered screening and scheduling.",
    services: ["CV Screening Automation", "Interview Scheduling", "Candidate Nurture", "Job Board Lead Gen"],
    image: "/industries/recruitment.jpg",
  },
  {
    name: "Financial Advisers / IFAs",
    pain: "Serve more clients while staying fully FCA compliant.",
    services: ["Lead Qualification", "Suitability Report Drafting", "FCA Compliance Automation", "Client Review Reminders"],
    image: "/industries/ifa.jpg",
  },
  {
    name: "Hospitality",
    pain: "Never miss a reservation, complaint, or upsell again.",
    services: ["24/7 Reservations AI", "Staff Scheduling", "Guest Follow-Up", "Multilingual Voice Agent"],
    image: "/industries/hospitality.jpg",
  },
];

function Industries() {
  const [open, setOpen] = useState(0);
  return (
    <section id="industries" style={{ background: "#ffffff", paddingTop: "120px", paddingBottom: "100px" }}>
      <div className="section-inner" style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 40px" }}>

        <Reveal>
          <p style={{ fontSize: "13px", color: "#808080", marginBottom: "16px" }}>Who We Serve</p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "64px", gap: "24px", flexWrap: "wrap" }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.1, color: "#000000" }}>
              Five industries.<br /><span style={{ color: "#8b7d98" }}>One AI partner.</span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div style={{ borderTop: "1px solid #e8e8e8" }}>
            {INDUSTRIES.map((ind, i) => {
              const isOpen = open === i;
              return (
                <div key={i} style={{ borderBottom: "1px solid #e8e8e8" }}>

                  {/* Row header */}
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    style={{
                      width: "100%", display: "flex", alignItems: "center", gap: "28px",
                      padding: "28px 0", background: "none", border: "none", cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span style={{
                      fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em",
                      color: isOpen ? "#8b7d98" : "#c0bbc8", minWidth: "28px",
                      transition: "color 0.22s",
                    }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{
                      flex: 1, fontSize: "clamp(18px, 2vw, 26px)", fontWeight: 700,
                      letterSpacing: "-0.03em", color: isOpen ? "#000000" : "#555",
                      transition: "color 0.22s",
                    }}>
                      {ind.name}
                    </span>
                    <svg
                      width="18" height="18" viewBox="0 0 18 18" fill="none"
                      style={{ flexShrink: 0, transition: "transform 0.3s ease", transform: isOpen ? "rotate(45deg)" : "none" }}
                    >
                      <line x1="9" y1="2" x2="9" y2="16" stroke={isOpen ? "#8b7d98" : "#aaa"} strokeWidth="1.6" strokeLinecap="round" />
                      <line x1="2" y1="9" x2="16" y2="9" stroke={isOpen ? "#8b7d98" : "#aaa"} strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </button>

                  {/* Expanded content */}
                  <div style={{
                    overflow: "hidden",
                    maxHeight: isOpen ? "300px" : "0px",
                    transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}>
                    <div style={{ paddingBottom: "36px", paddingLeft: "56px" }}>
                      <p style={{ fontSize: "15px", color: "#555", lineHeight: 1.75, marginBottom: "20px", maxWidth: "560px" }}>
                        {ind.pain}
                      </p>
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "28px" }}>
                        {ind.services.map((svc, j) => (
                          <span key={j} style={{
                            fontSize: "12px", color: "#555",
                            background: "#f5f4f7", border: "1px solid #e4e0ec",
                            borderRadius: "60px", padding: "5px 14px",
                          }}>
                            {svc}
                          </span>
                        ))}
                      </div>
                      <a href="#book" style={{
                        display: "inline-flex", alignItems: "center", gap: "10px",
                        padding: "11px 22px", borderRadius: "60px", background: "#000000",
                        color: "#ffffff", fontSize: "13px", fontWeight: 600, textDecoration: "none",
                        transition: "background 0.18s",
                      }}
                        onMouseEnter={e => (e.currentTarget.style.background = "#222")}
                        onMouseLeave={e => (e.currentTarget.style.background = "#000")}>
                        Talk to us about {ind.name} <Arrow />
                      </a>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </Reveal>

      </div>
    </section>
  );
}

// ─── HOW IT WORKS ────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Discovery Call",
      desc: "We audit your current operation and map out exactly where AI delivers the fastest, highest ROI. No slides — just a focused conversation.",
    },
    {
      num: "02",
      title: "We Build It",
      desc: "Custom AI systems designed around your specific workflows, tools, and compliance requirements. You're involved at every step.",
    },
    {
      num: "03",
      title: "You See Results",
      desc: "Live within 3–4 weeks. We set measurable KPIs from day one and track them together — so you always know what's working.",
    },
  ];
  return (
    <section id="process" style={{ background: "#f2f2f2", paddingTop: "120px", paddingBottom: "100px" }}>
      <div className="section-inner" style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 40px" }}>
        <Reveal>
          <p style={{ fontSize: "13px", color: "#808080", marginBottom: "16px", textAlign: "center" }}>How It Works</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.1, color: "#000000", textAlign: "center", marginBottom: "64px" }}>
            Simple process.<br /><span style={{ color: "#8b7d98" }}>Fast results.</span>
          </h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          {steps.map((s, i) => (
            <Reveal key={i} delay={i * 120}>
            <div style={{
              background: "#ffffff", borderRadius: "20px", padding: "40px 36px",
              border: "1px solid #eae8f0", position: "relative",
            }}>
              <span style={{ fontSize: "13px", color: "#b0a8c0", fontWeight: 500, letterSpacing: "0.04em", display: "block", marginBottom: "24px" }}>{s.num}</span>
              <h3 style={{ fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 700, color: "#000000", letterSpacing: "-0.02em", marginBottom: "14px" }}>{s.title}</h3>
              <p style={{ fontSize: "14px", color: "#808080", lineHeight: 1.78 }}>{s.desc}</p>
              {i < steps.length - 1 && (
                <div style={{ position: "absolute", right: "-13px", top: "50%", transform: "translateY(-50%)", zIndex: 2, display: "none" }}>
                  <Arrow />
                </div>
              )}
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CASE STUDIES ─────────────────────────────────────────────────────────────


const CASES = [
  {
    industry: "Hotel Group", tag: "Conversational AI", title: "AIR Voice",
    outcome: "Reduced front-desk call volume by 68% across 3 properties within 60 days.",
    image: "/cases/air-voice.jpg",
    comingSoon: false,
  },
  {
    industry: "Restaurant Group", tag: "Operations Automation", title: "AIR Flow",
    outcome: "Cut weekly scheduling time from 12 hours to under 45 minutes. Saving £40k+ annually.",
    image: "/cases/air-flow.jpg",
    comingSoon: false,
  },
  {
    industry: "Estate Agency", tag: "Lead Generation", title: "Coming Soon",
    outcome: "Case study in progress — check back soon.",
    image: "/cases/estate-agency.jpg",
    comingSoon: true,
  },
  {
    industry: "Law Firm", tag: "Client Intake", title: "Coming Soon",
    outcome: "Case study in progress — check back soon.",
    image: "/cases/law-firm.jpg",
    comingSoon: true,
  },
  {
    industry: "Financial Adviser / IFA", tag: "Compliance Automation", title: "Coming Soon",
    outcome: "Case study in progress — check back soon.",
    image: "/cases/ifa.jpg",
    comingSoon: true,
  },
];

function CaseStudies() {
  const track = [...CASES, ...CASES]; // duplicate for infinite loop
  return (
    <section id="work" style={{ background: "#ffffff", paddingTop: "120px", paddingBottom: "100px", overflow: "hidden" }}>
      {/* Header */}
      <div className="section-inner" style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 40px", marginBottom: "56px" }}>
        <Reveal>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
          <div>
            <p style={{ fontSize: "13px", color: "#808080", marginBottom: "14px" }}>Case Studies</p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.12, color: "#000000" }}>
              Proven Outcomes<br />from Real Projects
            </h2>
          </div>
          <a href="#book" style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            padding: "13px 24px", borderRadius: "60px", background: "#000000", color: "#ffffff",
            fontSize: "14px", fontWeight: 500, textDecoration: "none", flexShrink: 0, whiteSpace: "nowrap",
            transition: "background 0.18s",
          }}
            onMouseEnter={e => (e.currentTarget.style.background = "#1a1a1a")}
            onMouseLeave={e => (e.currentTarget.style.background = "#000000")}>
            All Case Studies <Arrow />
          </a>
        </div>
        </Reveal>
      </div>

      {/* Continuous carousel */}
      <div style={{ width: "100%", overflow: "hidden" }}>
        <div className="case-track" style={{ display: "flex", gap: "20px", width: "max-content" }}>
          {track.map((c, i) => (
            <div key={i} style={{
              position: "relative", width: "320px", height: "440px", flexShrink: 0,
              borderRadius: "18px", overflow: "hidden",
              background: "#0a0a0a",
              opacity: c.comingSoon ? 0.55 : 1,
            }}>
              {/* Background image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.image} alt={c.title}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.72 }}
              />
              {/* Bottom gradient overlay */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 25%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.92) 100%)" }} />

              {/* Content */}
              <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "20px" }}>
                {/* Top tags */}
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#ffffff", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "60px", padding: "4px 11px", letterSpacing: "0.04em" }}>AI</span>
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "60px", padding: "4px 11px" }}>{c.industry}</span>
                  {c.comingSoon && (
                    <span style={{ fontSize: "11px", fontWeight: 600, color: "#a697b4", background: "rgba(166,151,180,0.15)", border: "1px solid rgba(166,151,180,0.3)", borderRadius: "60px", padding: "4px 11px" }}>In Progress</span>
                  )}
                </div>

                {/* Bottom text */}
                <div>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>{c.tag}</p>
                  <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#ffffff", letterSpacing: "-0.03em", lineHeight: 1.22, marginBottom: "10px" }}>
                    {c.title}{!c.comingSoon ? ` — ${c.industry}` : ""}
                  </h3>
                  <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", lineHeight: 1.65 }}>{c.outcome}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PRICING ─────────────────────────────────────────────────────────────────
const PRICING_FEATURES = [
  "AI Voice Agent (inbound & outbound, 24/7)",
  "Lead generation & qualification",
  "Client intake & onboarding automation",
  "Document & workflow automation",
  "CRM integration & data pipelines",
  "Compliance & regulatory automation",
  "AI dashboards & KPI reporting",
  "Dedicated account manager",
  "Custom AI strategy & roadmap",
  "Ongoing retainer & optimisation",
];

function Pricing() {
  return (
    <section id="pricing" style={{ background: "#f2f2f2", paddingTop: "120px", paddingBottom: "100px" }}>
      <div className="section-inner" style={{ maxWidth: "860px", margin: "0 auto", padding: "0 40px" }}>
        <Reveal>
          <p style={{ fontSize: "13px", color: "#808080", marginBottom: "16px", textAlign: "center" }}>Pricing</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.1, color: "#000000", textAlign: "center", marginBottom: "16px" }}>
            Every engagement<br /><span style={{ color: "#8b7d98" }}>is built to order.</span>
          </h2>
          <p style={{ fontSize: "15px", color: "#808080", textAlign: "center", lineHeight: 1.75, marginBottom: "56px", maxWidth: "520px", margin: "0 auto 56px" }}>
            No packages, no guesswork. We scope every project around your business, your tools, and your goals — then give you a clear, fixed quote.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div style={{
            background: "#000000", borderRadius: "24px", padding: "clamp(36px, 5vw, 60px)",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 55% at 15% 20%, rgba(166,151,180,0.18) 0%, transparent 60%)", pointerEvents: "none" }} />
            <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }}>

              {/* Left */}
              <div>
                <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#a697b4", marginBottom: "16px" }}>Custom Pricing</p>
                <div style={{ fontSize: "clamp(44px, 6vw, 72px)", fontWeight: 700, color: "#ffffff", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "16px" }}>
                  Custom
                </div>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.45)", marginBottom: "36px", lineHeight: 1.7 }}>
                  Scoped after your Discovery Call — priced fairly for what your business actually needs.
                </p>
                <a href="#book" style={{
                  display: "inline-flex", alignItems: "center", gap: "10px",
                  padding: "14px 28px", borderRadius: "60px", background: "#8b7d98",
                  color: "#ffffff", fontSize: "15px", fontWeight: 600, textDecoration: "none",
                  transition: "background 0.18s",
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#7a6d88")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#8b7d98")}>
                  Book a Discovery Call <Arrow />
                </a>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)", marginTop: "16px" }}>
                  Free 45-minute call · No obligation
                </p>
              </div>

              {/* Right — feature list */}
              <div>
                <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "20px" }}>What can be included</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "11px" }}>
                  {PRICING_FEATURES.map((f, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: "2px" }}>
                        <circle cx="7" cy="7" r="7" fill="rgba(166,151,180,0.2)" />
                        <path d="M4 7l2 2 4-4" stroke="#a697b4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────
type FaqCategory = "All Questions" | "General Questions" | "Getting Started" | "Implementation" | "Results";

const FAQ_ITEMS: { q: string; a: string; cat: FaqCategory }[] = [
  { cat: "General Questions", q: "What makes A.I.R different from other AI consultancies?", a: "We specialise in UK service businesses — estate agents, law firms, recruiters, IFAs, and hospitality. We're not a generalist tech shop. Every system we build is tailored to your sector's workflows, compliance requirements, and client expectations." },
  { cat: "General Questions", q: "Do you work with small businesses or only large firms?", a: "Both. Our Starter plan works for a 3-person estate agency. Our Full Stack engagements serve multi-site businesses. The AI adapts to the size of your operation — the process is the same." },
  { cat: "General Questions", q: "Are you a software company or a consultancy?", a: "Both. We start with strategy and finish with running systems — built, integrated, and handed over with full training. We don't just produce reports." },
  { cat: "Getting Started", q: "How do we know if AI is right for our business right now?", a: "That's exactly what the Discovery Call is for. We ask about your current operations, bottlenecks, and data maturity. If AI isn't the right move yet, we'll tell you — and tell you what to fix first." },
  { cat: "Getting Started", q: "What does the Discovery Call involve?", a: "A focused 45-minute conversation — no slides, no sales pitch. We map your biggest bottlenecks and draft a prioritised opportunity plan within 3 business days." },
  { cat: "Getting Started", q: "How quickly can we get started?", a: "Typically within two weeks of signing. We begin the audit and setup phase immediately — no lengthy procurement process." },
  { cat: "Implementation", q: "Do we need technical staff to manage the systems?", a: "No. We build for non-technical operators. Every system comes with a simple dashboard, plain-English alerts, and 30-day onboarding support." },
  { cat: "Implementation", q: "How do you integrate with our existing tools?", a: "We integrate with any CRM, case management system, or back-office platform that has an API. Where a direct integration isn't available, we build a lightweight middleware layer." },
  { cat: "Implementation", q: "What happens if something goes wrong after launch?", a: "All clients are on a support retainer during the first 60 days — guaranteed response within 4 business hours. Ongoing support packages available after that." },
  { cat: "Results", q: "How do you measure success?", a: "We agree KPIs before we start — typically: calls answered, leads qualified, hours saved, and revenue impact. Every engagement has a live dashboard tracking these." },
  { cat: "Results", q: "What ROI can we expect?", a: "Our average client recoups their investment within 4–6 months. AI voice agents typically save 15–25 staff hours per week. Workflow automation projects cut manual processing time by 60–90%." },
  { cat: "Results", q: "How long before we see results?", a: "Most clients see measurable impact within 30 days of a live system. We build in early milestones so you see progress from week one — not just a final deliverable months later." },
];

const FAQ_CATS: FaqCategory[] = ["All Questions", "General Questions", "Getting Started", "Implementation", "Results"];

function FAQ() {
  const [activeTab, setActiveTab] = useState<FaqCategory>("All Questions");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const visible = FAQ_ITEMS.filter(f => activeTab === "All Questions" || f.cat === activeTab);

  return (
    <section id="faq" style={{ background: "#ffffff", paddingTop: "120px", paddingBottom: "100px" }}>
      <div className="section-inner" style={{ maxWidth: "860px", margin: "0 auto", padding: "0 40px" }}>
        <Reveal>
          <p style={{ textAlign: "center", fontSize: "13px", color: "#808080", marginBottom: "18px" }}>FAQs</p>
          <h2 style={{ textAlign: "center", fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.15, color: "#000000", marginBottom: "44px" }}>
            Frequently Asked<br />Questions
          </h2>
        </Reveal>
        <Reveal delay={150}>
        <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap", marginBottom: "52px" }}>
          {FAQ_CATS.map(cat => {
            const active = cat === activeTab;
            return (
              <button key={cat} className="faq-tab" onClick={() => { setActiveTab(cat); setOpenIndex(null); }} style={{
                padding: "9px 20px", borderRadius: "60px", border: "none",
                background: active ? "#000000" : "transparent",
                color: active ? "#ffffff" : "#808080",
                fontSize: "14px", fontWeight: active ? 600 : 400, cursor: "pointer",
                boxShadow: active ? "none" : "inset 0 0 0 1px #d8d4cc",
                transition: "background 0.18s, color 0.18s",
              }}>{cat}</button>
            );
          })}
        </div>
        </Reveal>
        <Reveal delay={250}>
        <div>
          {visible.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} style={{ borderTop: "1px solid #e4e0ec" }}>
                <button onClick={() => setOpenIndex(isOpen ? null : i)} style={{
                  width: "100%", background: "none", border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  gap: "24px", padding: "22px 0", textAlign: "left",
                }}>
                  <span style={{ fontSize: "clamp(14px, 1.4vw, 16px)", color: "#555048", lineHeight: 1.5, fontWeight: 400 }}>{item.q}</span>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%", flexShrink: 0, background: "#000000",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "transform 0.22s", transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                  }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <line x1="6" y1="1" x2="6" y2="11" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
                      <line x1="1" y1="6" x2="11" y2="6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </div>
                </button>
                <div style={{ overflow: "hidden", maxHeight: isOpen ? "400px" : "0", transition: "max-height 0.32s ease" }}>
                  <p style={{ fontSize: "14px", color: "#808080", lineHeight: 1.82, paddingBottom: "22px", maxWidth: "680px" }}>{item.a}</p>
                </div>
              </div>
            );
          })}
          <div style={{ borderTop: "1px solid #e4e0ec" }} />
        </div>
        </Reveal>
        <Reveal delay={100}>
        <div style={{ textAlign: "center", marginTop: "60px" }}>
          <p style={{ fontSize: "14px", color: "#808080", lineHeight: 1.7, marginBottom: "22px" }}>
            Have more questions?<br />Contact our team anytime — we&apos;re here 24/7.
          </p>
          <a href="#book" style={{
            display: "inline-block", padding: "13px 32px", borderRadius: "60px",
            border: "1px solid #000000", background: "transparent",
            color: "#000000", fontSize: "14px", fontWeight: 500, textDecoration: "none",
            transition: "background 0.18s, color 0.18s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#000000"; e.currentTarget.style.color = "#ffffff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#000000"; }}>
            Contact Us
          </a>
        </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── CONTACT FORM ────────────────────────────────────────────────────────────
function BookForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [form, setForm] = useState({ name: "", company: "", industry: "", email: "", phone: "", message: "" });

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("send failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please email us directly at taran@airdevconsultancy.co.uk");
    } finally {
      setLoading(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "14px 16px", borderRadius: "10px", fontSize: "14px",
    border: "1px solid #e4e0ec", background: "#faf9fc", color: "#000000",
    outline: "none", transition: "border-color 0.18s", boxSizing: "border-box",
  };

  return (
    <section id="book" style={{ background: "#f2f2f2", paddingTop: "120px", paddingBottom: "100px" }}>
      <div className="section-inner" style={{ maxWidth: "680px", margin: "0 auto", padding: "0 40px" }}>
        <Reveal>
          <p style={{ fontSize: "13px", color: "#808080", marginBottom: "16px", textAlign: "center" }}>Get Started</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.1, color: "#000000", textAlign: "center", marginBottom: "12px" }}>
            Book your<br /><span style={{ color: "#8b7d98" }}>Discovery Call</span>
          </h2>
          <p style={{ fontSize: "14px", color: "#808080", textAlign: "center", lineHeight: 1.7, marginBottom: "48px" }}>
            A free 45-minute call. No pitch, no pressure — just a clear plan for where AI can help your business most.
          </p>
        </Reveal>

        <Reveal delay={150}>
        {submitted ? (
          <div style={{ textAlign: "center", padding: "60px 40px", background: "#ffffff", borderRadius: "20px", border: "1px solid #eae8f0" }}>
            <div style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(139,125,152,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="#8b7d98" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 style={{ fontSize: "24px", fontWeight: 700, color: "#000000", marginBottom: "12px", letterSpacing: "-0.02em" }}>We&apos;ll be in touch.</h3>
            <p style={{ fontSize: "15px", color: "#808080", lineHeight: 1.7 }}>
              Thanks for reaching out. Someone from the A.I.R team will contact you within 24 hours to schedule your Discovery Call.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ background: "#ffffff", borderRadius: "20px", padding: "48px", border: "1px solid #eae8f0", display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#555", letterSpacing: "0.04em", display: "block", marginBottom: "8px" }}>FULL NAME *</label>
                <input required style={inputStyle} placeholder="Jane Smith" value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  onFocus={e => (e.target.style.borderColor = "#8b7d98")}
                  onBlur={e => (e.target.style.borderColor = "#e4e0ec")} />
              </div>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#555", letterSpacing: "0.04em", display: "block", marginBottom: "8px" }}>COMPANY *</label>
                <input required style={inputStyle} placeholder="Your company" value={form.company}
                  onChange={e => setForm({ ...form, company: e.target.value })}
                  onFocus={e => (e.target.style.borderColor = "#8b7d98")}
                  onBlur={e => (e.target.style.borderColor = "#e4e0ec")} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "#555", letterSpacing: "0.04em", display: "block", marginBottom: "8px" }}>INDUSTRY *</label>
              <select required style={{ ...inputStyle, appearance: "none" }} value={form.industry}
                onChange={e => setForm({ ...form, industry: e.target.value })}
                onFocus={e => (e.target.style.borderColor = "#8b7d98")}
                onBlur={e => (e.target.style.borderColor = "#e4e0ec")}>
                <option value="">Select your industry</option>
                <option>Estate Agency</option>
                <option>Law Firm</option>
                <option>Recruitment Agency</option>
                <option>Financial Adviser / IFA</option>
                <option>Hospitality</option>
                <option>Other</option>
              </select>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#555", letterSpacing: "0.04em", display: "block", marginBottom: "8px" }}>EMAIL *</label>
                <input required type="email" style={inputStyle} placeholder="jane@company.com" value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  onFocus={e => (e.target.style.borderColor = "#8b7d98")}
                  onBlur={e => (e.target.style.borderColor = "#e4e0ec")} />
              </div>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "#555", letterSpacing: "0.04em", display: "block", marginBottom: "8px" }}>PHONE</label>
                <input style={inputStyle} placeholder="+44 7700 000000" value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  onFocus={e => (e.target.style.borderColor = "#8b7d98")}
                  onBlur={e => (e.target.style.borderColor = "#e4e0ec")} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: 600, color: "#555", letterSpacing: "0.04em", display: "block", marginBottom: "8px" }}>WHAT DO YOU NEED HELP WITH?</label>
              <textarea style={{ ...inputStyle, minHeight: "120px", resize: "vertical" }} placeholder="Tell us about your biggest operational challenge..."
                value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                onFocus={e => (e.target.style.borderColor = "#8b7d98")}
                onBlur={e => (e.target.style.borderColor = "#e4e0ec")} />
            </div>
            <button type="submit" style={{
              padding: "15px 32px", borderRadius: "60px", border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              background: loading ? "#555" : "#000000", color: "#ffffff", fontSize: "15px", fontWeight: 600,
              transition: "background 0.18s", opacity: loading ? 0.7 : 1,
            }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "#1a1a1a"; }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.background = "#000000"; }}>
              {loading ? "Sending…" : "Book my Discovery Call →"}
            </button>
            {error && <p style={{ fontSize: "13px", color: "#c0392b", textAlign: "center", marginTop: "-8px" }}>{error}</p>}
            <p style={{ fontSize: "12px", color: "#b0a8c0", textAlign: "center" }}>We&apos;ll respond within 24 hours. No spam, ever.</p>
          </form>
        )}
        </Reveal>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <Reveal y={16}>
    <footer style={{ background: "#0a0a0a", paddingTop: "64px", paddingBottom: "40px" }}>
      <div className="section-inner" style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "48px", marginBottom: "60px", flexWrap: "wrap" }}>
          {/* Brand */}
          <div>
            <div style={{ marginBottom: "16px" }}>
              <img src="/air-logo.png" alt="A.I.R" style={{ height: "36px", width: "auto", objectFit: "contain" }} />
            </div>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", lineHeight: 1.75, maxWidth: "280px", marginBottom: "24px" }}>
              Serving estate agents, law firms, recruitment agencies, financial advisers, and hospitality businesses across the UK.
            </p>
            <a href="mailto:taran@airdevconsultancy.co.uk" style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", textDecoration: "none", display: "block", marginBottom: "8px", transition: "color 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#ffffff")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}>
              taran@airdevconsultancy.co.uk
            </a>
            <a href="#" style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", transition: "color 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#ffffff")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}>
              LinkedIn <Arrow />
            </a>
          </div>

          {/* Services */}
          <div>
            <p style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.25)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "20px" }}>Services</p>
            {["AI Voice Agent", "Lead Generation", "Client Intake", "Workflow Automation", "CRM Integration", "AI Strategy"].map(s => (
              <a key={s} href="#services" style={{ display: "block", fontSize: "14px", color: "rgba(255,255,255,0.45)", textDecoration: "none", marginBottom: "10px", transition: "color 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}>
                {s}
              </a>
            ))}
          </div>

          {/* Industries */}
          <div>
            <p style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.25)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "20px" }}>Industries</p>
            {["Estate Agents", "Law Firms", "Recruitment", "Financial Advisers", "Hospitality"].map(s => (
              <a key={s} href="#industries" style={{ display: "block", fontSize: "14px", color: "rgba(255,255,255,0.45)", textDecoration: "none", marginBottom: "10px", transition: "color 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}>
                {s}
              </a>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.25)" }}>© 2026 A.I.R — Artificial Intelligence &amp; Robotics Ltd. All rights reserved.</p>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.2)" }}>Registered in England &amp; Wales</p>
        </div>
      </div>
    </footer>
    </Reveal>
  );
}

// ─── ROOT ────────────────────────────────────────────────────────────────────
export default function Home() {
  const [introGone, setIntroGone] = useState(false);
  const navTextRef = useRef<HTMLSpanElement>(null);
  return (
    <>
      <Intro onGone={() => setIntroGone(true)} navTextRef={navTextRef} />
      <Nav introGone={introGone} navTextRef={navTextRef} />
      <Hero />
      <About />
      <Services />
      <Industries />
      <HowItWorks />
      <CaseStudies />
      <Pricing />
      <FAQ />
      <BookForm />
      <Footer />
    </>
  );
}
