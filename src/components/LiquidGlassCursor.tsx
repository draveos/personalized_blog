"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const LiquidGlassCursor = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // 마우스 따라오는 속도 (부드러운 추적)
    const springConfig = { damping: 35, stiffness: 250, mass: 0.8 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    // 크기 변화 전용 스프링 (호버 시 부드러운 팽창)
    const sizeSpringConfig = { damping: 25, stiffness: 120, mass: 1 };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isVisible) setIsVisible(true);
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            const target = e.target as HTMLElement;
            setIsHovered(!!target.closest('button, a, [role="button"], input, .clickable'));
        };
        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [mouseX, mouseY, isVisible]);

    // baseSize 자체를 애니메이션의 타겟으로 사용
    const baseSize = isHovered ? 160 : 45;

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
            style={{
                x: cursorX,
                y: cursorY,
                translateX: "-50%",
                translateY: "-50%",
            }}
            // 부모 컨테이너의 크기 변화 자체를 부드럽게 만듭니다
            animate={{
                width: baseSize,
                height: baseSize,
                opacity: isVisible ? 1 : 0,
            }}
            transition={sizeSpringConfig}
        >
            {/* [레이어 1] 외곽 유리막 (Glassy Perimeter) */}
            <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                    background: "rgba(255, 255, 255, 0.01)",
                    backdropFilter: "blur(12px) brightness(0.95)",
                    boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.1)",
                    WebkitMaskImage: "radial-gradient(circle, transparent 30%, black 35%)",
                    maskImage: "radial-gradient(circle, transparent 30%, black 35%)",
                    border: "1px solid rgba(255, 255, 255, 0.1)"
                }}
                animate={{
                    // 부모가 커지므로 scale은 소폭만 조정해서 텐션 유지
                    scale: isHovered ? 1.05 : 1,
                    borderRadius: isHovered ? "38%" : "50%",
                }}
                transition={sizeSpringConfig}
            />

            {/* [레이어 2] 중심 현미경 렌즈 (Microscope Core) */}
            <motion.div
                className="absolute rounded-full border border-white/40 shadow-2xl overflow-hidden"
                style={{
                    width: "65%",
                    height: "65%",
                    background: "transparent",
                    backdropFilter: "blur(0px) contrast(1.3) saturate(1.8) brightness(1.4)",
                }}
                animate={{
                    scale: isHovered ? 1 : 0.7,
                    opacity: isHovered ? 1 : 0.4,
                    borderRadius: isHovered ? "42%" : "50%",
                }}
                transition={sizeSpringConfig}
            >
                <div className="absolute inset-0 flex items-center justify-center opacity-40">
                    <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-white to-transparent" />
                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white to-transparent absolute" />
                </div>
            </motion.div>

            {/* [레이어 3] 하이라이트 및 중심점 */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
            <motion.div
                className="w-1 h-1 bg-white rounded-full z-10 shadow-[0_0_10px_white]"
                animate={{
                    scale: isHovered ? 0 : 1, // 호버 시 점은 사라지거나 아주 작아지게
                    opacity: isHovered ? 0 : 1
                }}
                transition={{ duration: 0.01 }}
            />
        </motion.div>
    );
};