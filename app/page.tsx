"use client";

import { useState, useEffect, useRef } from "react";

// ─── Arrow icon ───────────────────────────────────────────────────────────────
const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

// ─── Logo mark ────────────────────────────────────────────────────────────────
const LogoMark = ({ dark = false }: { dark?: boolean }) => (
  <div style={{
    width: 30, height: 30, borderRadius: "7px", flexShrink: 0,
    background: dark ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.08)",
    border: `1px solid ${dark ? "rgba(0,0,0,0.14)" : "rgba(255,255,255,0.15)"}`,
    display: "flex", alignItems: "center", justifyContent: "center",
  }}>
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="2.5" fill={dark ? "#000" : "#fff"} />
      <circle cx="6" cy="6" r="5.5" stroke={dark ? "#000" : "#fff"} strokeWidth="1"
        strokeOpacity="0.35" fill="none" />
    </svg>
  </div>
);

// ─── Hero particles (hybridmind uses #a697b4 violet — adapted to warm gold) ──
interface Dot { x: number; y: number; size: number; opacity: number; }

function HeroDots() {
  const [dots, setDots] = useState<Dot[]>([]);
  useEffect(() => {
    setDots(Array.from({ length: 55 }, (_, i) => ({
      x: (i * 61.8033) % 100,
      y: (i * 38.1966) % 100,
      size: i % 8 === 0 ? 7 + (i % 4) : i % 4 === 0 ? 3.5 + (i % 3) : 1.5 + (i % 2) * 0.6,
      opacity: i % 8 === 0 ? 0.28 : i % 4 === 0 ? 0.16 : 0.09,
    })));
  }, []);
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {dots.map((d, i) => (
        <div key={i} style={{
          position: "absolute", left: `${d.x}%`, top: `${d.y}%`,
          width: d.size, height: d.size, borderRadius: "50%",
          // hybridmind: #a697b4 violet → A.I.R adaptation: warm champagne
          background: "#a697b4",
          opacity: d.opacity,
          transform: "translate(-50%, -50%)",
          boxShadow: d.size > 5 ? `0 0 ${d.size * 2}px rgba(166,151,180,${d.opacity * 0.4})` : "none",
        }} />
      ))}
    </div>
  );
}

// ─── Card dots (for About card) ───────────────────────────────────────────────
function CardDots() {
  const [dots, setDots] = useState<Dot[]>([]);
  useEffect(() => {
    setDots(Array.from({ length: 30 }, (_, i) => ({
      x: (i * 61.8033) % 100,
      y: (i * 38.1966) % 100,
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
          background: "#ffffff", opacity: d.opacity,
          transform: "translate(-50%, -50%)",
        }} />
      ))}
    </div>
  );
}

// ─── Small icons for About card badges ───────────────────────────────────────
const ChatIcon  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const GearIcon  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>;
const CpuIcon   = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>;

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Nav() {
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
    { href: "#services", label: "Services"      },
    { href: "#work",     label: "Case Studies"  },
    { href: "#process",  label: "Process"       },
    { href: "#faq",      label: "FAQ"           },
    { href: "mailto:taran@airdevconsultancy.co.uk", label: "Contact" },
  ];

  // hybridmind: transparent on hero (dark), white on scroll — exact same logic
  const navBg    = scrolled ? "rgba(255,255,255,0.96)" : "transparent";
  const textCol  = scrolled ? "#000000"                : "#ffffff";
  const subCol   = scrolled ? "rgba(0,0,0,0.4)"        : "rgba(255,255,255,0.42)";
  const lineCol  = scrolled ? "#000000"                : "#ffffff";

  return (
    <>
      <nav className="nav-bar" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 60,
        height: "68px", display: "flex", alignItems: "center", padding: "0 40px",
        background: navBg,
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "none",
        transition: "background 0.35s ease, border-color 0.35s ease",
      }}>
        {/* Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", flexShrink: 0 }}>
          <LogoMark dark={scrolled} />
          <span style={{ fontSize: "15px", fontWeight: 700, color: textCol, letterSpacing: "-0.01em", transition: "color 0.35s" }}>
            A.I.R
          </span>
        </a>

        {/* Centered descriptor — hybridmind style */}
        <span style={{
          position: "absolute", left: "50%", transform: "translateX(-50%)",
          fontSize: "13px", color: subCol, letterSpacing: "0.01em",
          pointerEvents: "none", whiteSpace: "nowrap", transition: "color 0.35s",
        }}>
          Artificial Intelligence &amp; Robotics Consultants
        </span>

        {/* Hamburger */}
        <button onClick={() => setOpen(true)} aria-label="Open menu" style={{
          marginLeft: "auto", background: "none", border: "none", cursor: "pointer",
          display: "flex", flexDirection: "column", gap: "5px", padding: "10px 4px",
        }}>
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: "block", width: "22px", height: "1.5px",
              background: lineCol, borderRadius: "2px", transition: "background 0.35s",
            }} />
          ))}
        </button>
      </nav>

      {/* Full-screen white overlay menu — exact hybridmind layout */}
      {open && (
        <div className="menu-overlay menu-grid" style={{
          position: "fixed", inset: 0, zIndex: 50,
          background: "#ffffff",
          display: "grid", gridTemplateColumns: "55fr 45fr",
        }}>
          {/* Left */}
          <div className="menu-left" style={{ display: "flex", flexDirection: "column", padding: "0 clamp(40px, 11vw, 160px)" }}>
            {/* Mirror nav bar */}
            <div style={{ height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
              <a href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
                <LogoMark dark />
                <span style={{ fontSize: "15px", fontWeight: 700, color: "#000" }}>A.I.R</span>
              </a>
              <span style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", fontSize: "13px", color: "rgba(0,0,0,0.38)", pointerEvents: "none" }}>
                AI &amp; Robotics Consultants
              </span>
              <button onClick={() => setOpen(false)} aria-label="Close menu" style={{ background: "none", border: "none", cursor: "pointer", marginLeft: "auto", padding: "8px" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Big links — hybridmind: 400 weight, not bold */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              {links.map((l, i) => (
                <a key={l.href} href={l.href} className="menu-link" onClick={() => setOpen(false)}
                  style={{
                    fontSize: "clamp(28px, 3.8vw, 50px)", fontWeight: 400, color: "#000000",
                    textDecoration: "none", letterSpacing: "-0.03em", lineHeight: 1.25,
                    display: "block", padding: "4px 0",
                    animationDelay: `${i * 0.06}s`, transition: "opacity 0.15s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.28")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
                  {l.label}
                </a>
              ))}
            </div>

            {/* Bottom contact */}
            <div style={{ paddingBottom: "40px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <a href="mailto:taran@airdevconsultancy.co.uk"
                style={{ fontSize: "14px", color: "#000", textDecoration: "none", transition: "opacity 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.4")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
                taran@airdevconsultancy.co.uk
              </a>
              {/* TODO: replace # with real LinkedIn URL */}
              <a href="#" style={{ fontSize: "14px", color: "#000", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px", transition: "opacity 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.4")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
                LinkedIn <Arrow />
              </a>
            </div>
          </div>

          {/* Right — photo + floating card (hybridmind style)
              TODO: replace background with a real photo:
              backgroundImage: "url('/menu-photo.jpg')", backgroundSize: "cover", backgroundPosition: "center"
              Ideal: hospitality scene — hotel lobby, restaurant, or people in motion. Portrait crop.
          */}
          <div className="menu-right-panel" style={{
            background: "linear-gradient(180deg, #2a2a2a 0%, #141414 50%, #080808 100%)",
            position: "relative", overflow: "hidden",
            display: "flex", flexDirection: "column",
            padding: "32px",
          }}>
            {/* Subtle texture overlay */}
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(166,151,180,0.07) 0%, transparent 60%)", pointerEvents: "none" }} />

            {/* Floating card — matches hybridmind's inset card on photo */}
            <div style={{
              position: "relative", marginTop: "auto", marginBottom: "auto",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "16px",
              padding: "32px 36px",
              backdropFilter: "blur(12px)",
            }}>
              <p style={{
                fontSize: "11px", color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.18em", textTransform: "uppercase",
                marginBottom: "20px", fontWeight: 500,
              }}>
                More Than Technology
              </p>
              <h2 style={{
                fontSize: "clamp(20px, 2.2vw, 28px)", fontWeight: 400,
                lineHeight: 1.3, letterSpacing: "-0.02em",
              }}>
                <span style={{ color: "rgba(255,255,255,0.38)" }}>Intelligent Systems.</span><br />
                <span style={{ color: "#ffffff" }}>Built for Hospitality.</span><br />
                <span style={{ color: "#ffffff" }}>Powered by A.I.R.</span>
              </h2>
            </div>
          </div>
        </div>
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
      overflow: "hidden",
      background: "#000000", // hybridmind hero: pure black
    }}>
      {/* Video background — loop attr + onEnded fallback for browsers that stall */}
      <video
        autoPlay muted loop playsInline
        onEnded={e => { e.currentTarget.currentTime = 0; e.currentTarget.play(); }}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      {/* Base dark layer */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.62)" }} />
      {/* Brand colour tint — purple wash matching site palette */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(139,125,152,0.18) 0%, rgba(80,60,100,0.22) 50%, rgba(0,0,0,0.1) 100%)" }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 24px", maxWidth: "900px", width: "100%" }}>
        {/* hybridmind font scale: clamp(52px, 8vw, 96px) — large, bold, tight tracking */}
        <h1 style={{
          fontSize: "clamp(36px, 4.8vw, 58px)",
          fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.04em",
          marginBottom: "24px",
        }}>
          <span style={{ color: "#ffffff", display: "block" }}>
            What if your business
          </span>
          <span style={{
            display: "block",
            background: "linear-gradient(90deg, #ffffff 11%, #514f4f)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            never missed a call?
          </span>
        </h1>

        {/* Subheading — hybridmind uses #808080 grey */}
        <p style={{
          fontSize: "clamp(14px, 1.5vw, 17px)",
          color: "#808080",
          lineHeight: 1.72, maxWidth: "400px", margin: "0 auto 40px",
        }}>
          A.I.R handles the conversations, operations, and decisions your team can&apos;t always be there for.
        </p>

        {/* CTA — hybridmind glass button: rgba(255,255,255,0.06) with inset shadows */}
        <a href="mailto:taran@airdevconsultancy.co.uk" style={{
          display: "inline-flex", alignItems: "center", gap: "14px",
          padding: "14px 26px", borderRadius: "60px",
          background: "rgba(255,255,255,0.06)",
          boxShadow: "inset 0 -7px 15px rgba(255,255,255,0.04), inset 0 -1px 0 rgba(255,255,255,0.18), inset -1px 0 0 rgba(255,255,255,0.18), inset 1px 0 0 rgba(255,255,255,0.18), inset 0 1px 0 rgba(255,255,255,0.06)",
          color: "#ffffff", fontSize: "14px", fontWeight: 500,
          textDecoration: "none", transition: "background 0.22s",
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
      // hybridmind about card: linear-gradient(#f7ecfc, #d4c7e0 24%, #a697b4)
      // A.I.R adaptation: same structure, warm cream → champagne → gold
      background: "linear-gradient(180deg, #f7ecfc 0%, #d4c7e0 24%, #a697b4 100%)",
      /* TODO: replace gradient with a real photo:
         backgroundImage: "url('/about-card.jpg')",
         backgroundSize: "cover", backgroundPosition: "center"
         Add a semi-transparent overlay div inside for text visibility.
         Best shot: close-up hospitality detail — table setting, hotel lobby, coffee. */
    }}>
      {/* White scattered dots on gradient card — same as hybridmind */}
      <CardDots />

      {/* Floating icon badges — like hybridmind's scattered circular icons */}
      {[
        { top: "20%", left: "14%", icon: <ChatIcon /> },
        { top: "44%", right: "12%", icon: <GearIcon /> },
        { top: "68%", left: "20%", icon: <CpuIcon /> },
      ].map((b, i) => (
        <div key={i} style={{
          position: "absolute", ...b,
          width: 34, height: 34, borderRadius: "50%",
          background: "rgba(255,255,255,0.32)",
          border: "1px solid rgba(255,255,255,0.5)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "rgba(255,255,255,0.85)",
        }}>
          {b.icon}
        </div>
      ))}

      {/* Centre label */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontSize: "15px", fontWeight: 500, color: "rgba(255,255,255,0.75)", letterSpacing: "0.06em" }}>
          Hospitality AI
        </p>
      </div>
    </div>
  );
}

function About() {
  return (
    // hybridmind: about section background is pure white
    <section id="about" style={{ background: "#ffffff", paddingTop: "110px", paddingBottom: "110px" }}>
      <div className="section-inner" style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 40px" }}>

        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left card */}
          <AboutCard />

          {/* Right text — hybridmind: black headings, #808080 body, #8b7d98 CTA */}
          <div>
            <p style={{ fontSize: "13px", color: "#808080", marginBottom: "20px" }}>
              About Us
            </p>

            <h2 style={{
              fontSize: "clamp(26px, 3.5vw, 44px)", fontWeight: 700,
              lineHeight: 1.18, letterSpacing: "-0.03em", color: "#000000", marginBottom: "20px",
            }}>
              A.I.R helps hospitality businesses turn AI potential into measurable{" "}
              {/* "impact" uses A.I.R gold — hybridmind uses #a697b4 violet for this word */}
              <span style={{ color: "#8b7d98" }}>impact</span>
            </h2>

            <p style={{ fontSize: "15px", color: "#808080", lineHeight: 1.82, marginBottom: "28px" }}>
              We combine strategic consulting with hands-on technical delivery to help
              hospitality businesses turn AI potential into real, lasting operational
              impact from the first call to a fully running system.
            </p>

            {/* Divider — hybridmind uses #ccccd8; A.I.R warm equivalent */}
            <div style={{ height: "1px", background: "#ccccd8", marginBottom: "28px" }} />

            {/* Text CTA — hybridmind: color #8b7d98 (violet-dark); A.I.R: gold */}
            <a href="mailto:taran@airdevconsultancy.co.uk" style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              fontSize: "14px", color: "#8b7d98",
              textDecoration: "none", transition: "color 0.2s", fontWeight: 500,
            }}
              onMouseEnter={e => (e.currentTarget.style.color = "#6d6080")}
              onMouseLeave={e => (e.currentTarget.style.color = "#8b7d98")}>
              Book your Discovery Call <Arrow />
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}

// ─── SERVICES ────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    num: "01",
    title: "AI Strategy & Consulting",
    desc: "We audit your existing operations and map out exactly where AI delivers the highest ROI before a single line of code is written.",
    tags: ["Discovery", "Roadmapping", "ROI Analysis"],
  },
  {
    num: "02",
    title: "Conversational AI",
    desc: "Guest-facing chatbots and voice assistants that handle reservations, FAQs, upsells, and complaints 24/7, in any language.",
    tags: ["Chatbots", "Voice AI", "Multilingual"],
  },
  {
    num: "03",
    title: "Operations Automation",
    desc: "Streamline housekeeping schedules, inventory ordering, staff rostering, and back-of-house workflows with intelligent automation.",
    tags: ["Workflow AI", "Scheduling", "Integrations"],
  },
  {
    num: "04",
    title: "Robotics Integration",
    desc: "We design and deploy physical automation room-service robots, concierge units, and security droids tuned for your environment.",
    tags: ["Hardware", "Deployment", "Maintenance"],
  },
  {
    num: "05",
    title: "Data & Analytics",
    desc: "Real-time dashboards and predictive models so your leadership team can act on what's happening, not what happened last month.",
    tags: ["Dashboards", "Predictive Models", "Reporting"],
  },
];

function ServiceRow({ s, last }: { s: typeof SERVICES[0]; last: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="service-row"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderTop: "1px solid #eae8f0",
        padding: "32px 0",
        display: "grid", gridTemplateColumns: "72px 1fr auto",
        alignItems: "center", gap: "24px",
        borderBottom: last ? "1px solid #eae8f0" : "none",
        cursor: "default", transition: "background 0.18s",
      }}>
      {/* Number */}
      <span className="service-num" style={{ fontSize: "13px", color: "#b0a8c0", fontWeight: 500, letterSpacing: "0.04em" }}>
        {s.num}
      </span>

      {/* Centre: title + desc + tags */}
      <div>
        <h3 style={{
          fontSize: "clamp(17px, 1.8vw, 22px)", fontWeight: 700,
          color: hovered ? "#8b7d98" : "#000000",
          letterSpacing: "-0.02em", marginBottom: "8px",
          transition: "color 0.2s",
        }}>
          {s.title}
        </h3>
        <p style={{ fontSize: "14px", color: "#808080", lineHeight: 1.72, maxWidth: "560px", marginBottom: "14px" }}>
          {s.desc}
        </p>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {s.tags.map(t => (
            <span key={t} style={{
              fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em",
              textTransform: "uppercase", color: "#9088a0",
              border: "1px solid #ccccd8", borderRadius: "60px",
              padding: "3px 10px",
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Arrow */}
      <div style={{
        width: 40, height: 40, borderRadius: "50%",
        border: "1px solid #ccccd8",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: hovered ? "#8b7d98" : "#9088a4",
        flexShrink: 0, transition: "color 0.2s, border-color 0.2s",
        borderColor: hovered ? "#8b7d98" : "#ccccd8",
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

        {/* Header row — hybridmind: label left, heading spans most of width */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "64px", gap: "40px", flexWrap: "wrap" }}>
          <div>
            <p style={{ fontSize: "13px", color: "#808080", marginBottom: "16px" }}>What We Do</p>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 700,
              letterSpacing: "-0.04em", lineHeight: 1.1, color: "#000000",
              maxWidth: "500px",
            }}>
              Intelligent services,<br />
              <span style={{ color: "#8b7d98" }}>real-world results</span>
            </h2>
          </div>

          {/* Optional description right — hybridmind has a small paragraph here */}
          <p style={{ fontSize: "14px", color: "#808080", lineHeight: 1.78, maxWidth: "300px" }}>
            Every engagement starts with understanding your operation not selling you a product. We build what you need.
          </p>
        </div>

        {/* Service rows */}
        {SERVICES.map((s, i) => (
          <ServiceRow key={s.num} s={s} last={i === SERVICES.length - 1} />
        ))}

      </div>
    </section>
  );
}

// ─── CASE STUDIES ─────────────────────────────────────────────────────────────
function CaseDots({ light = false }: { light?: boolean }) {
  const [dots, setDots] = useState<Dot[]>([]);
  useEffect(() => {
    setDots(Array.from({ length: 42 }, (_, i) => ({
      x: (i * 61.8033) % 100,
      y: (i * 38.1966) % 100,
      size: i % 8 === 0 ? 6 + (i % 4) : i % 4 === 0 ? 3 + (i % 3) : 1.5,
      opacity: i % 8 === 0 ? 0.28 : i % 4 === 0 ? 0.16 : 0.09,
    })));
  }, []);
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {dots.map((d, i) => (
        <div key={i} style={{
          position: "absolute", left: `${d.x}%`, top: `${d.y}%`,
          width: d.size, height: d.size, borderRadius: "50%",
          background: light ? "#a697b4" : "#ffffff",
          opacity: d.opacity,
          transform: "translate(-50%, -50%)",
          boxShadow: d.size > 5 && light ? `0 0 ${d.size * 2}px rgba(166,151,180,0.22)` : "none",
        }} />
      ))}
    </div>
  );
}

const CASES = [
  {
    tag: "Conversational AI",
    title: "AIR Voice",
    subtitle: "Guest Communication Platform",
    outcome: "Reduced front-desk call volume by 68% across 3 hotel properties within 60 days of deployment.",
    metrics: [
      { value: "68%", label: "Call reduction" },
      { value: "24/7", label: "Availability" },
      { value: "4.8★", label: "Guest rating" },
    ],
    // warm dark — adapts hybridmind's dark olive card
    bg: "linear-gradient(155deg, #140c1c 0%, #0e0812 55%, #080808 100%)",
    glow: "radial-gradient(ellipse 65% 50% at 18% 18%, rgba(166,151,180,0.2) 0%, transparent 60%)",
    light: true,   // gold dots
  },
  {
    tag: "Operations Automation",
    title: "AIR Flow",
    subtitle: "Workforce & Operations Engine",
    outcome: "Cut weekly scheduling time from 12 hours to under 45 minutes for a 400-room hotel group.",
    metrics: [
      { value: "93%", label: "Time saved" },
      { value: "3 sites", label: "Deployed" },
      { value: "£40k", label: "Saved / yr" },
    ],
    // cool dark — adapts hybridmind's near-black card
    bg: "linear-gradient(155deg, #0e0e14 0%, #090912 55%, #080808 100%)",
    glow: "radial-gradient(ellipse 65% 50% at 80% 20%, rgba(255,255,255,0.04) 0%, transparent 60%)",
    light: false,  // white dots
  },
];

// ─── AIR Voice audio demo player ─────────────────────────────────────────────
const VOICE_DEMOS = [
  { label: "Booking",            src: "/voice/booking 3.m4a" },
  { label: "Amend Booking",      src: "/voice/booking to cancel 3.m4a" },
  { label: "Cancel Booking",     src: "/voice/cancel booking 3.m4a" },
  { label: "Post-Cancel",        src: "/voice/cancelled booking 3.m4a" },
  { label: "Menu Suggestions",   src: "/voice/Menu suggestions 3.m4a" },
  { label: "Complaint Handling", src: "/voice/angry amie 2.m4a" },
  { label: "Multilingual",       src: "/voice/hindi 2.m4a" },
];

function AirVoicePlayer() {
  const [playing, setPlaying] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function toggle(i: number) {
    if (playing === i) {
      audioRef.current?.pause();
      setPlaying(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const a = new Audio(VOICE_DEMOS[i].src);
      a.onended = () => setPlaying(null);
      a.play();
      audioRef.current = a;
      setPlaying(i);
    }
  }

  useEffect(() => () => { audioRef.current?.pause(); }, []);

  return (
    <div style={{ marginBottom: "24px", position: "relative" }}>
      <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "12px", fontWeight: 500 }}>
        Live Demo — tap to listen
      </p>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {VOICE_DEMOS.map((d, i) => {
          const active = playing === i;
          return (
            <button key={i} onClick={() => toggle(i)} style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "6px 12px", borderRadius: "60px", cursor: "pointer",
              background: active ? "rgba(166,151,180,0.28)" : "rgba(255,255,255,0.07)",
              border: `1px solid ${active ? "rgba(166,151,180,0.6)" : "rgba(255,255,255,0.12)"}`,
              color: active ? "#ffffff" : "rgba(255,255,255,0.6)",
              fontSize: "11px", fontWeight: 500, letterSpacing: "0.02em",
              transition: "all 0.18s",
            } as React.CSSProperties}>
              {/* Play / pause icon */}
              {active ? (
                <span style={{ display: "flex", gap: "2px", alignItems: "center" }}>
                  <span style={{ width: 2, height: 10, background: "#a697b4", borderRadius: 2, animation: "bar-a 0.6s ease-in-out infinite alternate" }} />
                  <span style={{ width: 2, height: 7,  background: "#a697b4", borderRadius: 2, animation: "bar-b 0.6s ease-in-out infinite alternate" }} />
                  <span style={{ width: 2, height: 10, background: "#a697b4", borderRadius: 2, animation: "bar-a 0.6s ease-in-out infinite alternate 0.15s" }} />
                </span>
              ) : (
                <svg width="8" height="9" viewBox="0 0 8 9" fill="rgba(255,255,255,0.5)">
                  <path d="M0 0L8 4.5L0 9V0Z" />
                </svg>
              )}
              {d.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CaseStudies() {
  return (
    <section id="work" style={{ background: "#ffffff", paddingTop: "120px", paddingBottom: "100px" }}>
      <div className="section-inner" style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 40px" }}>

        {/* Header row — hybridmind: label + big heading left, CTA pill right */}
        <div style={{
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          marginBottom: "52px", gap: "24px", flexWrap: "wrap",
        }}>
          <div>
            <p style={{ fontSize: "13px", color: "#808080", marginBottom: "14px" }}>Case Studies</p>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 700,
              letterSpacing: "-0.04em", lineHeight: 1.12, color: "#000000",
            }}>
              Proven Outcomes<br />from Real Projects
            </h2>
          </div>
          {/* hybridmind: black pill "All Case Studies →" */}
          <a href="mailto:taran@airdevconsultancy.co.uk" style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            padding: "13px 24px", borderRadius: "60px",
            background: "#000000", color: "#ffffff",
            fontSize: "14px", fontWeight: 500, textDecoration: "none",
            flexShrink: 0, whiteSpace: "nowrap",
            transition: "background 0.18s",
          }}
            onMouseEnter={e => (e.currentTarget.style.background = "#1a1a1a")}
            onMouseLeave={e => (e.currentTarget.style.background = "#000000")}>
            Work With Us <Arrow />
          </a>
        </div>

        {/* Cards — 2-up grid matching hybridmind card proportions */}
        <div className="case-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
          gap: "20px",
        }}>
          {CASES.map((c, i) => (
            <div key={i} style={{
              position: "relative", borderRadius: "20px", overflow: "hidden",
              background: c.bg, minHeight: "460px",
              display: "flex", flexDirection: "column", justifyContent: "space-between",
              padding: "28px 30px",
            }}>
              {/* Scattered dots */}
              <CaseDots light={c.light} />
              {/* Accent glow */}
              <div style={{ position: "absolute", inset: 0, background: c.glow, pointerEvents: "none" }} />

              {/* Top: tags */}
              <div style={{ position: "relative", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <span style={{
                  fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em",
                  color: "#ffffff", background: "rgba(255,255,255,0.13)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "60px", padding: "4px 11px",
                }}>AI</span>
                <span style={{
                  fontSize: "11px", fontWeight: 500, letterSpacing: "0.04em",
                  color: "rgba(255,255,255,0.65)", background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "60px", padding: "4px 11px",
                }}>{c.tag}</span>
              </div>

              {/* Bottom: metrics + title + outcome */}
              <div style={{ position: "relative" }}>
                {/* Metric row */}
                <div style={{ display: "flex", gap: "36px", marginBottom: "28px" }}>
                  {c.metrics.map(m => (
                    <div key={m.label}>
                      <p style={{
                        fontSize: "clamp(22px, 2.4vw, 30px)", fontWeight: 700,
                        letterSpacing: "-0.03em", lineHeight: 1,
                        color: c.light ? "#a697b4" : "#ffffff",
                      }}>
                        {m.value}
                      </p>
                      <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "5px", letterSpacing: "0.04em" }}>
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Audio demo player — AIR Voice card only */}
                {i === 0 && <AirVoicePlayer />}

                <h3 style={{
                  fontSize: "clamp(18px, 1.9vw, 24px)", fontWeight: 700,
                  color: "#ffffff", letterSpacing: "-0.03em", lineHeight: 1.22, marginBottom: "10px",
                }}>
                  {c.title} — {c.subtitle}
                </h3>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: "480px" }}>
                  {c.outcome}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────
type FaqCategory = "All Questions" | "General Questions" | "Getting Started" | "Implementation" | "Results";

const FAQ_ITEMS: { q: string; a: string; cat: FaqCategory }[] = [
  {
    cat: "General Questions",
    q: "What makes A.I.R different from other AI consultancies?",
    a: "We specialise exclusively in hospitality, we're not a generalist tech shop that occasionally works with hotels. Every framework, every integration pattern, every automation we've built has been tested in real hospitality environments. That depth means faster delivery and fewer surprises.",
  },
  {
    cat: "General Questions",
    q: "Do you work with all types of hospitality businesses?",
    a: "Yes, from independent boutique hotels and restaurant groups to large-scale contract caterers and serviced apartments. The AI use-cases differ by size and model, but the principle is the same: we find where automation creates the most value for your specific operation.",
  },
  {
    cat: "General Questions",
    q: "Are you a software company or a consultancy?",
    a: "Both. We start with strategy (understanding your operations and identifying high-ROI opportunities) and we finish with running systems, built, integrated, and handed over with full documentation and training. We don't just produce reports.",
  },
  {
    cat: "Getting Started",
    q: "How do we know if AI is right for our business right now?",
    a: "That's exactly what the Discovery Call is for. We ask about your current operations, pain points, and data maturity. If AI isn't the right move yet, we'll tell you and we'll tell you what to fix first so it will be.",
  },
  {
    cat: "Getting Started",
    q: "What does the Discovery Call involve?",
    a: "A focused 45-minute conversation, no slides, no sales pitch. We ask about your biggest operational bottlenecks, what systems you currently run, and where your team spends the most manual time. From there we draft a prioritised opportunity map.",
  },
  {
    cat: "Getting Started",
    q: "How quickly can we get started after the Discovery Call?",
    a: "Typically within two weeks. After the call we send a scoped proposal within 3 business days. Once agreed, we can begin the audit and setup phase immediately no lengthy procurement process.",
  },
  {
    cat: "Implementation",
    q: "Do we need technical staff to manage the systems you build?",
    a: "No. We build for non-technical operators. Every system comes with a simple dashboard, plain-English alerts, and 30-day onboarding support. If something needs updating or retraining, we handle it or train your team to do it confidently.",
  },
  {
    cat: "Implementation",
    q: "How do you integrate with our existing PMS or POS systems?",
    a: "Most major PMS platforms (Opera, Mews, Apaleo, Hotelogix) and POS systems (Lightspeed, Square, Fourth) have APIs we've worked with before. Where a direct integration isn't available, we build a lightweight middleware layer that keeps your existing workflows intact.",
  },
  {
    cat: "Implementation",
    q: "What happens if something goes wrong after launch?",
    a: "All clients are on a support retainer during the first 60 days, guaranteed response within 4 business hours. After that we offer ongoing support packages, or we can hand over full control to your internal team with proper documentation.",
  },
  {
    cat: "Results",
    q: "How do you measure success?",
    a: "We agree on KPIs before we start typically: hours of manual work saved per week, guest satisfaction score change, response time reduction, and (where applicable) upsell revenue attributable to AI interactions. Every engagement has a dashboard that tracks these live.",
  },
  {
    cat: "Results",
    q: "What ROI can we expect?",
    a: "It varies by use-case, but our average client recoups their investment within 4-6 months. Conversational AI for guest comms typically saves 15-25 staff hours per week. Operations automation projects routinely cut scheduling time by over 60%.",
  },
  {
    cat: "Results",
    q: "How long before we see results?",
    a: "Most clients see measurable operational impact within the first 30 days of a live system. Strategic projects take longer to bear fruit, but we build in early milestones so you see progress not just a final deliverable months later.",
  },
];

const FAQ_CATS: FaqCategory[] = ["All Questions", "General Questions", "Getting Started", "Implementation", "Results"];

function FAQ() {
  const [activeTab, setActiveTab] = useState<FaqCategory>("All Questions");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible = FAQ_ITEMS.filter(f => activeTab === "All Questions" || f.cat === activeTab);

  return (
    <section id="faq" style={{ background: "#ffffff", paddingTop: "120px", paddingBottom: "100px" }}>
      <div className="section-inner" style={{ maxWidth: "860px", margin: "0 auto", padding: "0 40px" }}>

        {/* Label */}
        <p style={{ textAlign: "center", fontSize: "13px", color: "#808080", marginBottom: "18px" }}>FAQs</p>

        {/* Heading — hybridmind: bold, black, centered */}
        <h2 style={{
          textAlign: "center", fontSize: "clamp(30px, 4.5vw, 52px)",
          fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.15,
          color: "#000000", marginBottom: "44px",
        }}>
          Frequently Asked<br />Questions
        </h2>

        {/* Category tabs — hybridmind: active = black pill, inactive = grey border pill */}
        <div style={{
          display: "flex", gap: "8px", justifyContent: "center",
          flexWrap: "wrap", marginBottom: "52px",
        }}>
          {FAQ_CATS.map(cat => {
            const active = cat === activeTab;
            return (
              <button key={cat} className="faq-tab" onClick={() => { setActiveTab(cat); setOpenIndex(null); }}
                style={{
                  padding: "9px 20px", borderRadius: "60px", border: "none",
                  background: active ? "#000000" : "transparent",
                  color: active ? "#ffffff" : "#808080",
                  fontSize: "14px", fontWeight: active ? 600 : 400,
                  cursor: "pointer",
                  boxShadow: active ? "none" : "inset 0 0 0 1px #d8d4cc",
                  transition: "background 0.18s, color 0.18s",
                }}>
                {cat}
              </button>
            );
          })}
        </div>

        {/* Accordion rows */}
        <div>
          {visible.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} style={{ borderTop: "1px solid #e4e0ec" }}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  style={{
                    width: "100%", background: "none", border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    gap: "24px", padding: "22px 0", textAlign: "left",
                  }}>
                  {/* Question */}
                  <span style={{ fontSize: "clamp(14px, 1.4vw, 16px)", color: "#555048", lineHeight: 1.5, fontWeight: 400 }}>
                    {item.q}
                  </span>

                  {/* Plus / minus button — hybridmind: black circle */}
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                    background: "#000000",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "transform 0.22s",
                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                  }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <line x1="6" y1="1" x2="6" y2="11" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
                      <line x1="1" y1="6" x2="11" y2="6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </div>
                </button>

                {/* Answer — collapses smoothly */}
                <div style={{
                  overflow: "hidden",
                  maxHeight: isOpen ? "400px" : "0",
                  transition: "max-height 0.32s ease",
                }}>
                  <p style={{
                    fontSize: "14px", color: "#808080", lineHeight: 1.82,
                    paddingBottom: "22px", maxWidth: "680px",
                  }}>
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
          {/* Bottom border on last item */}
          <div style={{ borderTop: "1px solid #e4e0ec" }} />
        </div>

        {/* Bottom CTA — hybridmind: centred text + outlined button */}
        <div style={{ textAlign: "center", marginTop: "60px" }}>
          <p style={{ fontSize: "14px", color: "#808080", lineHeight: 1.7, marginBottom: "22px" }}>
            Have more questions?<br />
            Contact our team anytime — we&apos;re here 24/7.
          </p>
          <a href="mailto:taran@airdevconsultancy.co.uk" style={{
            display: "inline-block", padding: "13px 32px", borderRadius: "60px",
            border: "1px solid #000000", background: "transparent",
            color: "#000000", fontSize: "14px", fontWeight: 500,
            textDecoration: "none", transition: "background 0.18s, color 0.18s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#000000"; e.currentTarget.style.color = "#ffffff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#000000"; }}>
            Contact Us
          </a>
        </div>

      </div>
    </section>
  );
}

// ─── ROOT ────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Services />
      <CaseStudies />
      <FAQ />
    </>
  );
}
