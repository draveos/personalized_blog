import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import video1 from "../assets/rain.mp4"
import video2 from "../assets/city.mp4"
import video3 from "../assets/nature.mp4"

export interface Slide {
    main: string;
    sub: string;
    accent: string;
}

interface FilmHeroProps {
    slides?: Slide[];
}

const defaultSlides: Slide[] = [
    {
        main: "Atmosphere",
        sub: "embrace the rhythm of rain.",
        accent: "Contemplation"
    },
    {
        main: "Structure",
        sub: "building ideas in the city light.",
        accent: "Architecture"
    },
    {
        main: "Organic",
        sub: "nature's raw and pure record.",
        accent: "Dynamic"
    },
];

const videos = [video1, video2, video3];

export function FilmHero({ slides: slidesProp }: FilmHeroProps = {}) {
    const source = slidesProp ?? defaultSlides;
    const slides = videos.map((video, i) => ({
        ...(source[i] ?? defaultSlides[i]),
        video,
    }));
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0); // 슬라이드 방향 감지

    const { scrollY } = useScroll();
    const yHero = useTransform(scrollY, [0, 500], [0, 150]);
    const opacityHero = useTransform(scrollY, [0, 400], [1, 0]);

    const handleNext = useCallback(() => {
        setDirection(1);
        setIndex((prev) => (prev + 1) % videos.length);
    }, []);

    const handlePrev = useCallback(() => {
        setDirection(-1);
        setIndex((prev) => (prev - 1 + videos.length) % videos.length);
    }, []);

    useEffect(() => {
        const timer = setInterval(handleNext, 8000); // 영상이 있으니 조금 더 길게
        return () => clearInterval(timer);
    }, [handleNext]);

    return (
        <motion.section
            style={{ y: yHero, opacity: opacityHero }}
            className="relative w-full h-[100vh] flex flex-col justify-center rounded-3xl items-center overflow-hidden bg-black"
        >
            {/* 1. 배경 동영상 레이어 */}
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={index}
                    custom={direction}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }} // 영상 밝기 조절
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 z-0"
                >
                    <video
                        src={slides[index].video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black/20" />
                </motion.div>
            </AnimatePresence>

            {/* 2. 리퀴드 글래스 메인 카드 */}
            <div className="relative z-20 w-full max-w-5xl px-25">
                <div className="glass-container p-12 md:p-24 rounded-3xl overflow-hidden">
                    {/* CSS에서 가져온 리퀴드 효과 레이어 */}
                    <div className="glass-wavy-bg" />

                    <div className="relative z-10 flex flex-col items-center text-center">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={index}
                                initial={{ x: direction > 0 ? 50 : -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: direction > 0 ? -50 : 50, opacity: 0 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <span className="text-sm font-bold tracking-[0.4em] uppercase text-white/60 mb-6 block animate-pulse-slow">
                                    {slides[index].accent} 
                                </span>
                                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.85] text-white mb-8 break-keep max-w-[18ch] mx-auto">
                                    {slides[index].main}
                                    <span className="block text-3xl md:text-5xl font-serif italic font-light text-white/70 mt-4">
                                        {slides[index].sub}
                                    </span>
                                </h1>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* 3. 좌우 화살표 내비게이션 */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-30 flex justify-between px-4 md:px-10 pointer-events-none">
                <button
                    onClick={handlePrev}
                    className="p-4 rounded-full glass-effect text-white hover:bg-white/10 transition-all pointer-events-auto group"
                >
                    <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
                </button>
                <button
                    onClick={handleNext}
                    className="p-4 rounded-full glass-effect text-white hover:bg-white/10 transition-all pointer-events-auto group"
                >
                    <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            {/* 4. 하단 인디케이터 (글래스 스타일) */}
            <div className="absolute bottom-12 flex gap-3 z-30">
                {slides.map((_, i) => (
                    <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                            i === index ? "w-8 bg-white" : "w-4 bg-white/20"
                        }`}
                    />
                ))}
            </div>

            {/* 필름 그레인 오버레이 (가져오신 CSS와 조합) */}
            <div className="absolute inset-0 z-40 pointer-events-none opacity-[0.01] mix-blend-screen bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </motion.section>
    );
}