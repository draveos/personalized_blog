"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface InteractiveCardProps {
    title: string;
    description: string;
    videoSrc: string;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({ title, description, videoSrc }) => {
    const [isHovering, setIsHovering] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // 원형 게이지 계산 (SVG Dasharray)
    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isHovering && !isFlipped) {
            interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        setIsFlipped(true);
                        return 100;
                    }
                    return prev + (prev < 20 ? 10 : 30);
                });
            }, 60);
        } else if (!isHovering) {
            setProgress(0);
        }
        return () => clearInterval(interval);
    }, [isHovering, isFlipped]);

    const handleMouseLeave = () => {
        setIsHovering(false);
        if (isFlipped) {
            timeoutRef.current = setTimeout(() => {
                setIsFlipped(false);
            }, 300);
        }
    };

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsHovering(true);
    };

    return (
        <div
            className="relative w-full max-w-md h-72"
            style={{ perspective: "1200px" }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                className="w-full h-full relative"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
                {/* --- [앞면] --- */}
                <div
                    className="absolute inset-0 rounded-3xl p-8 flex flex-col justify-between
                               bg-[#1a1f2e] border border-white/10 shadow-2xl"
                    style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        zIndex: isFlipped ? 0 : 1
                    }}
                >
                    {/* 우측 상단 원형 로딩바 */}
                    <div className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center">
                        <svg className="w-full h-full rotate-[-90deg]">
                            <circle
                                cx="24"
                                cy="24"
                                r={radius}
                                stroke="currentColor"
                                strokeWidth="3"
                                fill="transparent"
                                className="text-white/5"
                            />
                            <motion.circle
                                cx="24"
                                cy="24"
                                r={radius}
                                stroke="currentColor"
                                strokeWidth="3"
                                fill="transparent"
                                strokeDasharray={circumference}
                                animate={{ strokeDashoffset: offset }}
                                className="text-primary"
                                strokeLinecap="round"
                            />
                        </svg>
                        <span className="absolute text-[10px] text-white font-mono">
                            {Math.round(progress)}%
                        </span>
                    </div>

                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{title}</h3>
                        <div className="w-10 h-1 bg-primary rounded-full mb-6" />
                        <p className="text-slate-400 leading-relaxed text-sm line-clamp-4">
                            {description}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isHovering ? 'bg-primary' : 'bg-slate-600'}`} />
                        <span className="text-[10px] font-mono text-slate-500 tracking-widest uppercase">
                            {isHovering ? "Wait for it..." : "Hover to View Demo"}
                        </span>
                    </div>
                </div>

                {/* --- [뒷면] --- */}
                <div
                    className="absolute inset-0 rounded-3xl overflow-hidden bg-black border border-white/20"
                    style={{
                        transform: "rotateY(180deg)",
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        zIndex: isFlipped ? 1 : 0
                    }}
                >
                    {isFlipped && (
                        <video
                            src={videoSrc}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover opacity-80"
                        />
                    )}
                    {/* 비디오 위 오버레이 (텍스트 가독성용) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-primary backdrop-blur-md border border-orange-200-500/50 px-4 py-2 rounded-full"
                        >
                            <span className="text-white text-xs font-bold tracking-widest">{title}</span>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default InteractiveCard;