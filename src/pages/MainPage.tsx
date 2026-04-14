import { FilmHero } from "../components/FilmHero";
import GlassFilters from "../components/GlassFilters";
import { Navbar } from "../components/NavBar";
import {LiquidGlassCursor} from "../components/LiquidGlassCursor";
import InteractiveCard from "../components/InteractiveCard";
import ShowcaseItem from "../components/ShowcaseItem";
import CTASection from "../components/CTAsection";
import { motion } from "framer-motion";
import video1 from "../assets/water.mp4"
import video2 from "../assets/paint.mp4"
import video3 from "../assets/network.mp4"


function App() {
    return (
        /**
         * 전체 테마 설정
         * bg-background: oklch 테마 적용
         * selection: 드래그 시 강조 색상
         */
        <div className="min-h-screen bg-transparent text-foreground overflow-x-hidden font-sans selection:bg-black">
            <LiquidGlassCursor/>

            {/* 1. 전역 효과 레이어: 리퀴드 글래스 필터 및 유동적 배경 색상 */}
            <GlassFilters />

            {/* 2. 상단 네비게이션: 스크롤 감지 및 투명도 조절 */}
            <Navbar />

            <main>
                {/* 3. Hero Section (영상 배경 + 흰색 텍스트 고정) */}
                <section className="relative w-full bg-black">
                    <FilmHero />
                </section>

                {/* 4. Intro Section: Secondary Hero */}
                <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-black">
                    {/* 배경 영상 레이어 */}
                    <div className="absolute inset-0 z-0 opacity-30">
                        <video
                            src={video2}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover grayscale"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
                    </div>

                    <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                        {/* 상단 태그 애니메이션 */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.8 }}
                            className="text-sm font-bold tracking-[0.4em] uppercase text-primary mb-8"
                        >
                            Visual-First Record
                        </motion.p>

                        {/* 메인 타이틀: 한 줄씩 스르륵 */}
                        <h2 className="text-sm md:text-[6rem] font-black tracking-tighter leading-[0.9] text-white flex flex-col items-center">
                            <motion.span
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: 0.1 }}
                            >
                                Design your vision
                            </motion.span>
                            <motion.span
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="italic font-serif text-primary font-light"
                            >
                                not just a website.
                            </motion.span>
                        </h2>

                        {/* 하단 설명 문구 */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: false }}
                            transition={{ duration: 1.5, delay: 1.5 }}
                            className="mt-16 text-lg text-white/60 md:text-xl max-w-2xl mx-auto leading-relaxed font-medium"
                        >
                            당신의 모든 아이디어는 예술적인 기록이 됩니다.
                        </motion.p>
                    </div>
                </section>

                {/* 5. Features Grid: 주요 기능 소개 (카드 스타일) */}
                <section id="features" className="py-28 px-6 bg-black relative z-10 ">
                    <div className="max-w-6xl mx-auto ">
                        <h2 className="text-4xl md:text-6xl font-bold text-white text-center mb-20 tracking-tighter">
                            Essential Toolkit
                        </h2>

                        {/* 그리드 컨테이너 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Drag & Drop",
                                    description: "직관적인 인터페이스로 요소를 자유롭게 배치하세요. 복잡한 코딩 없이 드래그만으로 레이아웃이 완성됩니다.",
                                    video: video1
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
                                    videoSrc={feature.video}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* 6. Showcase: 단계별 작업 흐름 (Ripple Gallery 적용) */}
                <section id="showcase" className="py-40 px-6 bg-black relative z-10">
                    <div className="max-w-6xl mx-auto flex flex-col gap-20">
                        <div className="mb-10 px-4">
                            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-white">How it works</h2>
                            <div className="h-1 w-24 bg-primary rounded-full" />
                        </div>

                        <div className="flex flex-col gap-16">
                            {[
                                {
                                    step: "01",
                                    title: "Choose & Create",
                                    desc: "빈 캔버스에서 시작하거나 템플릿을 선택하세요. 당신의 상상력이 현실이 되는 첫 번째 단계입니다.",
                                    video: video1
                                },
                                {
                                    step: "02",
                                    title: "Drag & Design",
                                    desc: "블록을 추가하고, 위치를 바꾸며 모든 디테일을 다듬습니다. 코딩 없이도 완벽한 픽셀 퍼펙트를 구현하세요.",
                                    video: video2
                                },
                                {
                                    step: "03",
                                    title: "Publish & Share",
                                    desc: "만족스럽다면 단 한 번의 클릭으로 세상에 공유하세요. 전 세계 어디서든 당신의 결과물을 확인할 수 있습니다.",
                                    video: video3
                                },
                            ].map((item, i) => (
                                <ShowcaseItem
                                    key={i}
                                    step={item.step}
                                    title={item.title}
                                    desc={item.desc}
                                    videoSrc={item.video}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* 7. CTA: 강렬한 하단 카드 */}
                <CTASection />
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