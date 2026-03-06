"use client";

import { useEffect, useRef } from "react";
import type { FC } from "react";

// 팔레트 색상 정의 (배경색과 미세하게 다른 톤온톤 컬러)
// 배경색이 밝으면 더 밝게, 어두우면 더 어둡게 설정하여 은은하게 표현
const PALETTE_COLORS = [
  { solid: "rgba(100, 100, 100, 0.08)", shadow: "rgba(100, 100, 100, 0.05)" }, // 배경과 거의 비슷한 회색/크림색
  { solid: "rgba(130, 130, 130, 0.10)", shadow: "rgba(130, 130, 130, 0.07)" }, // 약간 더 짙은 포인트
  { solid: "rgba(var(--primary-rgb), 0.05)", shadow: "rgba(var(--primary-rgb), 0.03)" }, // 테마 컬러 미세 포인트 (아주 투명하게)
];

type Blob = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: { solid: string; shadow: string };
};

const FloatingPalettes: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    // 성능을 위한 저해상도 렌더링 후 스케일 업 (블러 효과 극대화)
    const renderScale = 1.5;

    const blobs: Blob[] = [];

    // --- 설정값 (부드러운 움직임 위주) ---
    const MAX_BLOBS = 15;        // 공의 개수
    const MAX_RADIUS = 100;       // 최대 크기 (크기 대폭 축소)
    const MIN_RADIUS = 15;       // 최소 크기
    const MOUSE_REPEL_R = 90;   // 마우스 반발 반경
    const MOUSE_REPEL_F = 10.5;   // 마우스 반발 강도 (더 부드럽게)
    const BOUNCE_ELASTICITY = 0.8; // 충돌 탄성 (1: 완전 탄성, 0: 비탄성)

    // 마우스 좌표 (저해상도 기준)
    const mouse = { x: -1000, y: -1000 };

    /* ── 헬퍼: 새로운 블롭 생성 ─────────────────────────────────── */
    const createBlob = () => {
      const radius = MIN_RADIUS + Math.random() * (MAX_RADIUS - MIN_RADIUS);
      blobs.push({
        x: Math.random() * (canvas.width - radius * 2) + radius,
        y: Math.random() * (canvas.height - radius * 2) + radius,
        vx: (Math.random() - 0.5) * 0.2, // 아주 느릿하게
        vy: (Math.random() - 0.5) * 0.2,
        radius,
        color: PALETTE_COLORS[Math.floor(Math.random() * PALETTE_COLORS.length)],
      });
    };

    // 초기 블롭 생성
    for (let i = 0; i < MAX_BLOBS; i++) createBlob();

    /* ── 리사이즈 및 마우스 이벤트 ────────────────────────────────── */
    const resize = () => {
      canvas.width = window.innerWidth / renderScale;
      canvas.height = window.innerHeight / renderScale;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX / renderScale;
      mouse.y = e.clientY / renderScale;
    };
    const onLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    /* ── 애니메이션 로직 (생태계 구현) ─────────────────────────────── */
    let id = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // --- 충돌 및 튕겨나가기 (Physics Engine) ---
      for (let i = 0; i < blobs.length; i++) {
        for (let j = i + 1; j < blobs.length; j++) {
          const a = blobs[i];
          const b = blobs[j];

          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);

          // 두 공이 겹쳤을 때
          if (dist < a.radius + b.radius) {
            // 충돌각 계산
            const angle = Math.atan2(dy, dx);
            const targetX = b.x + Math.cos(angle) * (a.radius + b.radius);
            const targetY = b.y + Math.sin(angle) * (a.radius + b.radius);

            // 위치 보정
            const ax = (targetX - a.x) * 0.5;
            const ay = (targetY - a.y) * 0.5;
            a.x += ax; a.y += ay;
            b.x -= ax; b.y -= ay;

            // 탄성 충돌 물리 법칙 적용
            const sinA = Math.sin(angle);
            const cosA = Math.cos(angle);

            // 벨로시티 회전
            const va = { vx: a.vx * cosA + a.vy * sinA, vy: a.vy * cosA - a.vx * sinA };
            const vb = { vx: b.vx * cosA + b.vy * sinA, vy: b.vy * cosA - b.vx * sinA };

            // x축 속도 교환 (튕겨나감)
            const tmp = va.vx;
            va.vx = vb.vx;
            vb.vx = tmp;

            // 마찰 및 탄성 적용
            va.vx *= BOUNCE_ELASTICITY;
            vb.vx *= BOUNCE_ELASTICITY;

            // 다시 벨로시티 회전 복원
            a.vx = va.vx * cosA - va.vy * sinA;
            a.vy = va.vy * cosA + va.vx * sinA;
            b.vx = vb.vx * cosA - vb.vy * sinA;
            b.vy = vb.vy * cosA + vb.vx * sinA;
          }
        }
      }

      // --- 블롭 업데이트 및 그리기 ---
      for (let i = blobs.length - 1; i >= 0; i--) {
        const b = blobs[i];

        // 1. 마우스 반발
        const dx = b.x - mouse.x;
        const dy = b.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < MOUSE_REPEL_R) {
          const f = (MOUSE_REPEL_R - dist) / MOUSE_REPEL_R * MOUSE_REPEL_F;
          b.vx += (dx / dist) * f * 0.1; // 반발도 부드럽게
          b.vy += (dy / dist) * f * 0.1;
        }

        // 물리 적용 및 감쇠 (더 느릿하게 감쇠)
        b.x += b.vx;
        b.y += b.vy;
        b.vx *= 0.995;
        b.vy *= 0.995;

        // 벽 충돌 (튕겨나감)
        if (b.x < b.radius) { b.x = b.radius; b.vx *= -BOUNCE_ELASTICITY; }
        if (b.x > canvas.width - b.radius) { b.x = canvas.width - b.radius; b.vx *= -BOUNCE_ELASTICITY; }
        if (b.y < b.radius) { b.y = b.radius; b.vy *= -BOUNCE_ELASTICITY; }
        if (b.y > canvas.height - b.radius) { b.y = canvas.height - b.radius; b.vy *= -BOUNCE_ELASTICITY; }

        // 2. 그리기 (그라데이션 제거, 단색 + 강한 후광으로 몽환적 연출)
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = b.color.solid;

        // 몽환적인 은은한 후광 효과 (블러를 아주 넓게 펼침)
        ctx.shadowColor = b.color.shadow;
        ctx.shadowBlur = b.radius * 2;

        ctx.fill();
        ctx.shadowBlur = 0; // 후광 리셋
      }

      id = requestAnimationFrame(animate);
    };
    animate();

    // --- 클린업 ---
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
      <canvas
          ref={canvasRef}
          // CSS object-cover로 강제로 늘려서 더 부드럽고 몽환적인 블러 연출
          className="fixed inset-0 w-full h-full -z-10 object-cover bg-background transition-opacity duration-1000 selection:bg-primary/20"
      />
  );
};

export default FloatingPalettes;