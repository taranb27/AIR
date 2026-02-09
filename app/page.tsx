"use client";

import { useState, useEffect, useRef } from "react";

type Service = {
  id: string;
  label: string;
  titleTop: string;
  titleBottom: string;
  description: string;
};

const SERVICES: Service[] = [
  {
    id: "01",
    label: "Service 01",
    titleTop: "Interaction",
    titleBottom: "Systems",
    description:"We design systems that handle conversations with people; calls, messages, or on-site interactions in a clear and reliable way.",
  },
  {
    id: "02",
    label: "Service 02",
    titleTop: "Operational",
    titleBottom: "Systems",
    description:"We build systems that support how work gets done, from scheduling and approvals to coordination between teams.",
  },
  {
    id: "03",
    label: "Service 03",
    titleTop: "Physical",
    titleBottom: "Systems",
    description: "Where software meets the real world, we design systems that connect machines, sensors, and people into a working process.",
  },
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const lockRef = useRef(false);

  const go = (dir: 1 | -1) => {
    if (lockRef.current) return;
    lockRef.current = true;

    setIndex((prev) => {
      const next = prev + dir;
      if (next < 0) return 0;
      if (next > SERVICES.length - 1) return SERVICES.length - 1;
      return next;
    });

    window.setTimeout(() => (lockRef.current = false), 450);
  };

  // keyboard
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // touch
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null || touchStartY.current == null) return;

    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;

    // only trigger when horizontal swipe is dominant
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      if (dx < 0) go(1); // swipe left => next
      else go(-1); // swipe right => previous
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  const onWheel = (e: React.WheelEvent) => {
    // If user is scrolling normally (vertical), don't hijack.
    // But if there's strong horizontal intent (trackpad / shift+wheel), page.
    const intentHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
    if (!intentHorizontal) return;

    e.preventDefault();
    if (e.deltaX > 10) go(1);
    if (e.deltaX < -10) go(-1);
  };

  const s = SERVICES[index];

  return (
    <div className="min-h-screen bg-[#f6f6f6] text-[#0a0a0a]">

      {/* landing page */}
      <div className="sticky top-0 w-screen bg-[#0a0a0a] z-10">
        <div className="h-full w-full rounded-[32px] sm:rounded-[44px] bg-[#f6f6f6] overflow-hidden flex-col">
          {/* navigation bar */}
          <nav className="mx-auto max-w-[1600px] px-6 py-4">
          <div className="flex items-center justify-between border-b border-black/40 pb-4">
            <div className="flex items-center gap-8 text-sm">
              <a href="#services" className="text-black/70 hover:text-black transition">Services</a>
              <a className="text-black/70 hover:text-black transition">Case Study</a>
            </div>
            <a href="mailto:taran@airdevconsultancy.co.uk?subject=Start%20a%20Conversation" className="inline-block">
              <button className="rounded-full border border-black/20 px-5 py-2 text-sm hover:bg-black/5 transition"> Start a Conversation </button>
            </a>
          </div>
          </nav>

          {/* landing page content*/}
          <section className="grid h-[calc(100vh-96px)]  grid-rows-[1fr_auto] p-4 sm:p-6">

            <div className=" flex items-center justify-center">
              <div className="text-center leading-[0.9] tracking-[-0.04em]">

                <div className="relative inline-block" onMouseEnter={() => setExpanded(true)} onMouseLeave={() => setExpanded(false)} onClick={() => setExpanded(v => !v)}>
                  <div className="relative inline-block cursor-pointer" style={{fontSize: "clamp(64px, 12vw, 200px)",}}>A.I.R</div>

                  <div className="h-[1.5em]">
                    <div className={`transition-all duration-300 ease-out ${ expanded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2" }`}
                      style={{
                        fontSize: "clamp(12px, 1.4vw, 16px)",
                        letterSpacing: "0.26em",
                      }}>
                      <span className="uppercase text-black/70">
                        <b>A</b>rtificial <b>I</b>ntelligence & <b>R</b>obotics
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="mx-auto w-full max-w-[1600px] px-6 pb-6">
              <div className="border-t border-black/20" />
              <div className="mt-4 text-center text-[11px] tracking-[0.22em] uppercase text-black/60">Please scroll</div>
            </div>
          </section>
        </div>
      </div>
      
      {/* services */}
      <div className="sticky top-0 w-screen bg-[#0a0a0a] z-20">
        <div className="h-full w-full rounded-[32px] sm:rounded-[44px] bg-[#f6f6f6] overflow-hidden flex-col">
        <section id="services" className=" sticky top-0 h-screen w-screen flex flex-col justify-between bg-[#f6f6f6] text-[#0a0a0a] px-6 z-20" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} onWheel={onWheel} >
          <div className="mx-auto w-full max-w-[1600px] pt-10"><div className="border-t border-black/20" /></div>

          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">

              {/* left button */}
              <button onClick={() => go(-1)}
                className={`absolute left-6 top-1/2 -translate-y-1/2 
                  text-black/100 hover:text-black transition 
                  ${index === 0 ? "opacity-20 pointer-events-none" : "opacity-100"}`}
                aria-label="Previous service"> ← </button>
              {/* right button */}
              <button onClick={() => go(1)}
                className={`absolute right-6 top-1/2 -translate-y-1/2 
                  text-black/40 hover:text-black transition 
                  ${index === SERVICES.length - 1 ? "opacity-20 pointer-events-none" : "opacity-100"}`}
                aria-label="Next service"> → </button>

              <div className="text-xs tracking-[0.22em] uppercase text-black/60">
                {s.label} — {s.id}/{SERVICES.length.toString().padStart(2, "0")}
              </div>

              <div className="mt-10 leading-[0.85] tracking-[-0.04em] font-bold transition-opacity duration-300" style={{ fontSize: "clamp(64px, 10vw, 160px)" }} > {s.titleTop} <br /> {s.titleBottom} </div>
              <p className="mt-10 max-w-[720px] mx-auto text-black/70 leading-relaxed"> {s.description} </p>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[1600px] pb-10">
            <div className="border-t border-black/20" />
            <div className="mt-4 text-center text-[11px] tracking-[0.22em] uppercase text-black/60">
              Swipe ← →
            </div>
          </div>
        </section>
          
        </div>
      </div>

      <footer className=" sticky top-0 h-screen bg-black text-white flex items-center justify-center z-30">
        <div className="w-full max-w-[1600px] px-6 text-center">
          <a href="mailto:taran@airdevconsultancy.co.uk?subject=Start%20a%20Conversation" className="inline-block">
            <div className="border-t border-white/40 mb-4" />
            <div className="uppercase tracking-tight leading-none" style={{ fontSize: "clamp(64px, 12.5vw, 200px)" }} >Work with us</div>
            <div className="border-t border-white/40 my-4" />
            <div className="uppercase tracking-tight leading-none" style={{ fontSize: "clamp(64px, 12.5vw, 200px)" }} > Hit us up </div>
            <div className="border-t border-white/40 mt-4" />
          </a>

        </div>
      </footer>

    </div>
  );
}