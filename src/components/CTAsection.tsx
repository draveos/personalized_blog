"use client";

import { ArrowRight } from "lucide-react";
import { CounterNumber } from "./CounterNumber"; // 방금 만든 컴포넌트

export default function CTASection() {
    return (
        <section className="py-48 px-6 bg-black">
            <div className="max-w-6xl mx-auto rounded-[4rem] bg-[#0d0d0d] border border-white/5 p-16 md:p-32 text-center relative overflow-hidden shadow-2xl">

                {/* 1. 배경 장식 (지루하지 않게 은은한 조명 효과) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-600/10 blur-[120px] pointer-events-none" />
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                <div className="relative z-10 flex flex-col items-center">
                    {/* 2. 카운팅 수치 (Social Proof) */}
                    <div className="mb-8 flex flex-col items-center">
                        <div className="text-primary font-mono text-sm tracking-[0.4em] uppercase mb-4 opacity-70">
                            Global Community
                        </div>
                        <div className="text-6xl md:text-9xl font-black text-white tracking-tighter tabular-nums">
                            <CounterNumber end={128402145612} suffix="+" />
                        </div>
                        <p className="mt-4 text-slate-500 text-lg md:text-xl font-light">
                            Creators are already recording their journey.
                        </p>
                    </div>

                    {/* 3. 메인 카피 */}
                    <h2 className="text-4xl md:text-7xl font-bold mb-16 tracking-tighter text-white leading-[1.1]">
                        Ready to <span className="text-primary italic px-2">Start?</span>
                    </h2>

                    {/* 4. 세련된 버튼 (Glassmorphism + Hover Effect) */}
                    <a
                        href="/login"
                        className="group relative inline-flex items-center gap-4 px-14 py-7 rounded-full bg-white text-black font-black text-2xl overflow-hidden transition-all hover:scale-105 active:scale-95"
                    >
                        {/* 버튼 내부 호버 빛 효과 */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                            Start Building
                        </span>
                        <ArrowRight className="relative z-10 w-7 h-7 group-hover:text-white group-hover:translate-x-2 transition-all duration-300" />
                    </a>

                    {/* 5. 하단 보조 문구 */}
                    <div className="mt-12 text-slate-600 text-xs font-mono tracking-widest uppercase">
                        No credit card required • 14-day free trial
                    </div>
                </div>
            </div>
        </section>
    );
}