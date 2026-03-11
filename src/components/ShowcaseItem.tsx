"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ShowcaseItemProps {
    step: string;
    title: string;
    desc: string;
    videoSrc: string;
}

export default function ShowcaseItem({ step, title, desc, videoSrc }: ShowcaseItemProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        // 좌표를 퍼센트 단위로 계산
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x, y });
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative w-full h-[500px] md:h-[650px] rounded-[3.5rem] overflow-hidden bg-[#080808] group border border-white/5 transition-colors duration-500 hover:border-blue-500/20"
        >
            {/* [Base Layer] 기본 어두운 배경 */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900/20 to-black" />

            {/* [Merge Layer] 마우스 지점만 투과되는 비디오 레이어 */}
            <div
                className="absolute inset-0 z-10 transition-opacity duration-1000 ease-in-out"
                style={{
                    opacity: isHovered ? 1 : 0,
                    // 마스크를 통해 마우스 지점만 구멍 뚫듯 노출
                    WebkitMaskImage: `radial-gradient(circle 350px at ${mousePos.x}% ${mousePos.y}%, black 0%, transparent 100%)`,
                    maskImage: `radial-gradient(circle 250px at ${mousePos.x}% ${mousePos.y}%, black 0%, transparent 100%)`,
                }}
            >
                <video
                    src={videoSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover scale-105"
                />

                {/* 비디오 위 조명 효과 (코너 광원 효과) */}
                <div
                    className="absolute inset-0 mix-blend-screen opacity-40 pointer-events-none"
                    style={{
                        background: `radial-gradient(circle 200px at ${mousePos.x}% ${mousePos.y}%, #3b82f6 0%, transparent 100%)`
                    }}
                />
            </div>

            {/* [Content Layer] 텍스트 및 UI */}
            <div className="relative z-20 h-full w-full p-12 md:p-20 flex flex-col justify-between pointer-events-none">
                <div className="flex justify-between items-start">
                    <motion.div
                        animate={{
                            opacity: isHovered ? 0.3 : 0.05,
                            scale: isHovered ? 1.05 : 1
                        }}
                        className="text-9xl md:text-[14rem] font-black font-serif italic text-white leading-none tracking-tighter"
                    >
                        {step}
                    </motion.div>
                </div>

                <div className="max-w-2xl">
                    <motion.h3
                        animate={{ x: isHovered ? 10 : 0 }}
                        transition={{ type: "spring", stiffness: 100 }}
                        className="text-5xl md:text-8xl font-bold text-white tracking-tighter mb-8 leading-[0.85]"
                    >
                        {title}
                    </motion.h3>
                    <motion.p
                        animate={{ opacity: isHovered ? 1 : 0.4 }}
                        className="text-lg md:text-2xl text-slate-400 font-light leading-relaxed max-w-lg"
                    >
                        {desc}
                    </motion.p>
                </div>
            </div>

            {/* [Glow Layer] 마우스 주변 은은한 잔상 */}
            <div
                className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-500"
                style={{
                    opacity: isHovered ? 0.2 : 0,
                    background: `radial-gradient(circle 400px at ${mousePos.x}% ${mousePos.y}%, rgba(59,130,246,0.1) 0%, transparent 100%)`,
                }}
            />
        </div>
    );
}