import { ArrowRight, MousePointerClick, Palette, Layers, Zap, Sparkles, Globe } from "lucide-react";
import { FilmHero } from "./components/FilmHero";
import GlassFilters from "./components/GlassFilters";
import FloatingPalettes from "./components/FloatingPalettes";
import { Navbar } from "./components/NavBar";
import {LiquidGlassCursor} from "./components/LiquidGlassCursor";
import InteractiveCard from "./components/InteractiveCard";

function App() {
    return (
        /**
         * 전체 테마 설정
         * bg-background: oklch 테마 적용
         * selection: 드래그 시 강조 색상
         */
        <div className="min-h-screen bg-transparent text-foreground overflow-x-hidden font-sans selection:bg-primary/30">
            <FloatingPalettes/>
            <LiquidGlassCursor/>

            {/* 1. 전역 효과 레이어: 리퀴드 글래스 필터 및 유동적 배경 색상 */}
            <GlassFilters />


            {/* 2. 상단 네비게이션: 스크롤 감지 및 투명도 조절 */}
            <Navbar />

            <main>
                {/* 3. Hero Section (영상 배경 + 흰색 텍스트 고정) */}
                <section className="relative w-full">
                    <FilmHero />
                </section>

                {/* 4. Intro Section: 디자인 철학 강조 */}
                <section className="relative py-32 overflow-hidden">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <p className="text-sm font-bold tracking-[0.3em] uppercase text-primary mb-6">
                            Visual-First Record
                        </p>
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-balance">
                            Design your vision,<br />
                            <span className="text-muted-foreground italic font-serif font-light">not just a website.</span>
                        </h2>
                        <p className="mt-10 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
                            드래그 앤 드롭으로 완성하는 직관적인 에디터.
                            당신의 모든 아이디어는 예술적인 기록이 됩니다.
                        </p>
                    </div>
                </section>

                {/* 5. Features Grid: 주요 기능 소개 (카드 스타일) */}
                <section id="features" className="py-28 px-6 bg-muted/30 relative z-10">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-4xl md:text-6xl font-bold text-center mb-20 tracking-tighter">
                            Essential Toolkit
                        </h2>

                        {/* 그리드 컨테이너 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Drag & Drop",
                                    description: "직관적인 인터페이스로 요소를 자유롭게 배치하세요. 복잡한 코딩 없이 드래그만으로 레이아웃이 완성됩니다.",
                                    image: "/images/feature1.jpg" // 준비된 이미지 경로가 있다면 넣으세요
                                },
                                {
                                    title: "Visual Styling",
                                    description: "색상, 폰트, 간격을 실시간 시각적 컨트롤로 커스텀합니다. 당신의 감각을 즉시 반영하세요."
                                },
                                {
                                    title: "Block System",
                                    description: "미리 빌드된 고품질 블록들로 빠르게 구조를 잡으세요. 생산성이 비약적으로 상승합니다."
                                },
                                {
                                    title: "Instant Preview",
                                    description: "수정 사항을 즉시 확인하세요. 보이는 그대로 결과물이 되는 마법 같은 경험을 제공합니다."
                                },
                                {
                                    title: "AI Intelligence",
                                    description: "번역부터 요약까지, 당신의 기록을 AI가 더 가치 있게 만듭니다. 스마트한 작업의 시작입니다."
                                },
                                {
                                    title: "Multi-Platform",
                                    description: "블로그부터 개인 대시보드까지 하나의 공간에서 관리하세요. 어디서든 접근 가능한 클라우드 기반입니다."
                                },
                            ].map((feature, i) => (
                                // 기존 div 대신 InteractiveCard를 렌더링합니다.
                                <InteractiveCard
                                    key={i}
                                    title={feature.title}
                                    description={feature.description}
                                    image={feature.image}
                                    // video="/videos/preview.mp4" // 비디오가 있다면 추가 가능
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* 6. Showcase: 단계별 작업 흐름 */}
                <section id="showcase" className="py-32 px-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex flex-col gap-32">
                            {[
                                { step: "01", title: "Choose & Create", desc: "빈 캔버스에서 시작하거나 템플릿을 선택하세요." },
                                { step: "02", title: "Drag & Design", desc: "블록을 추가하고, 위치를 바꾸며 모든 디테일을 다듬습니다." },
                                { step: "03", title: "Publish & Share", desc: "만족스럽다면 단 한 번의 클릭으로 세상을 공유하세요." },
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col md:flex-row items-center gap-16 group">
                                    <div className="text-[10rem] font-black text-muted/20 flex-shrink-0 leading-none transition-colors group-hover:text-primary/20">
                                        {item.step}
                                    </div>
                                    <div className="text-center md:text-left">
                                        <h3 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">{item.title}</h3>
                                        <p className="text-xl text-muted-foreground max-w-md mx-auto md:mx-0">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 7. CTA: 강렬한 하단 카드 */}
                <section className="py-32 px-6">
                    <div className="max-w-6xl mx-auto rounded-[3rem] bg-foreground text-background p-16 md:p-32 text-center relative overflow-hidden group">
                        {/* 배경 노이즈 오버레이 */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                        <div className="relative z-10">
                            <h2 className="text-5xl md:text-8xl font-bold mb-12 tracking-tighter">
                                Ready to <span className="text-primary italic">record?</span>
                            </h2>
                            <a
                                href="/login"
                                className="inline-flex items-center gap-3 px-12 py-6 rounded-full bg-primary text-primary-foreground font-black text-xl hover:scale-105 transition-transform"
                            >
                                Start Building
                                <ArrowRight className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            {/* 8. Footer */}
            <footer className="py-16 px-6 border-t border-border">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-sm font-medium text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <span className="text-foreground font-black tracking-tighter text-lg uppercase">Studio.</span>
                        <span>© 2026. All rights reserved.</span>
                    </div>
                    <div className="flex gap-10">
                        <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-foreground transition-colors">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;