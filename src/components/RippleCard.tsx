"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function RippleCard({ url, title }: { url: string; title: string }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();

        // 마우스 위치를 퍼센트(0~100)로 변환
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        setMousePos({ x, y });
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative aspect-[3/4] rounded-2xl overflow-hidden cursor-none group bg-slate-900"
            style={{ perspective: "1000px" }}
        >
            {/* 1. 메인 이미지 (마우스 위치에 따라 살짝 움직임) */}
            <motion.div
                className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 ease-out"
                style={{
                    backgroundImage: `url(${url})`,
                    scale: isHovered ? 1.1 : 1,
                    x: isHovered ? (mousePos.x - 50) * 0.1 : 0,
                    y: isHovered ? (mousePos.y - 50) * 0.1 : 0,
                }}
            />

            {/* 2. 물결(Ripple) 오버레이 - 마우스 지점부터 퍼져나가는 조명 */}
            <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                    opacity: isHovered ? 1 : 0,
                    background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.15) 0%, transparent 50%)`,
                }}
            />

            {/* 3. 텍스트 정보 */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent">
                <motion.h4
                    animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0.6 }}
                    className="text-white text-xl font-bold tracking-tight"
                >
                    {title}
                </motion.h4>
                <p className="text-white/40 text-xs mt-2 uppercase tracking-widest font-mono">View Case Study</p>
            </div>

            {/* 4. 커스텀 커서 (물결 느낌의 도트) */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute z-50 w-8 h-8 border border-white/50 rounded-full pointer-events-none mix-blend-difference"
                        style={{
                            left: `${mousePos.x}%`,
                            top: `${mousePos.y}%`,
                            transform: "translate(-50%, -50%)",
                        }}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
}

import { AnimatePresence } from "framer-motion";