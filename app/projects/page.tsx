"use client";

import { useState } from "react";

export default function WorkPage() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-[#f6f6f6] text-[#0a0a0a]">

      {/* landing */}
      <div className="sticky top-0 w-screen bg-[#0a0a0a] z-10">
        <div className="h-full w-full bg-[#f6f6f6] overflow-hidden flex-col">

          {/* nav */}
          <nav className="mx-auto max-w-[1600px] px-6 py-4">
            <div className="flex items-center justify-between border-b border-black/40 pb-4">
              <div className="flex items-center gap-8 text-sm">
                <a href="/" className="text-black/70 hover:text-black transition">Home</a>
                <a href="/work" className="text-black/70 hover:text-black transition">Work</a>
              </div>
            </div>
          </nav>

          {/* main PROJECTS hero */}
          <section className="grid h-[calc(100vh-96px)] grid-rows-[1fr_auto] p-4 sm:p-6">
            
            <div className="flex items-center justify-center">
              <div className="text-center leading-[0.9] tracking-[-0.04em]">

                <div
                  className="relative inline-block cursor-pointer"
                  onMouseEnter={() => setExpanded(true)}
                  onMouseLeave={() => setExpanded(false)}
                  onClick={() => setExpanded(v => !v)}
                  style={{ fontSize: "clamp(64px, 12vw, 200px)" }}
                >
                  PROJECTS
                </div>

                {/* subtle subtext like AIR */}
                <div className="h-[1.5em]">
                  <div
                    className={`transition-all duration-300 ${
                      expanded
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-2"
                    }`}
                    style={{
                      fontSize: "clamp(12px, 1.4vw, 16px)",
                      letterSpacing: "0.26em",
                    }}
                  >
                    <span className="uppercase text-black/70">
                      Selected work by A.I.R
                    </span>
                  </div>
                </div>

              </div>
            </div>

            <div className="mx-auto w-full max-w-[1600px] px-6 pb-6">
              <div className="border-t border-black/20" />
              <div className="mt-4 text-center text-[11px] tracking-[0.22em] uppercase text-black/60">
                Scroll
              </div>
            </div>

          </section>

          <section className="bg-[#f2f2f2] text-[#0a0a0a] px-6 py-32">
            <div className="max-w-[1200px] mx-auto">

              <p className="text-sm text-black/50 mb-10 text-center">
                Selected Work
              </p>

              <div className="grid md:grid-cols-2 gap-8">

                {/* AIR Voice */}
                <a href="#" className="group block">
                  <div className="bg-[#ededed] p-10 md:p-14 h-full transition hover:bg-[#e6e6e6]">

                    <p className="text-xs tracking-[0.22em] uppercase text-black/50 mb-6">
                      AIR Voice
                    </p>

                    <h2 className="text-3xl md:text-5xl font-semibold tracking-tight group-hover:opacity-70 transition">
                      Voice Interaction System
                    </h2>

                    <p className="mt-6 text-black/60 leading-relaxed">
                      AI-powered voice agent handling calls, bookings, and customer interactions for restaurants.
                    </p>

                    <div className="mt-10 text-black/40 group-hover:translate-x-2 transition">
                      →
                    </div>

                  </div>
                </a>

                {/* AIR Flow */}
                <a href="#" className="group block">
                  <div className="bg-[#ededed] p-10 md:p-14 h-full transition hover:bg-[#e6e6e6]">

                    <p className="text-xs tracking-[0.22em] uppercase text-black/50 mb-6">
                      AIR Flow
                    </p>

                    <h2 className="text-3xl md:text-5xl font-semibold tracking-tight group-hover:opacity-70 transition">
                      Content Automation System
                    </h2>

                    <p className="mt-6 text-black/60 leading-relaxed">
                      Automated scheduling and publishing system for consistent and scalable social media presence.
                    </p>

                    <div className="mt-10 text-black/40 group-hover:translate-x-2 transition">
                      →
                    </div>

                  </div>
                </a>

              </div>

              <p className="text-sm text-black/40 mt-16 text-center">
                More systems available upon request.
              </p>

            </div>
          </section>

          
        </div>
      </div>

      <div className="sticky top-0 w-screen bg-[#0a0a0a] z-20">

      </div>

    </div>
  );
}