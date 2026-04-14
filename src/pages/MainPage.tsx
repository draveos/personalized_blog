import { FilmHero, type Slide } from "../components/FilmHero";
import GlassFilters from "../components/GlassFilters";
import { Navbar } from "../components/NavBar";
import {LiquidGlassCursor} from "../components/LiquidGlassCursor";
import InteractiveCard from "../components/InteractiveCard";
import ShowcaseItem from "../components/ShowcaseItem";
import { ScrollReveal } from "../components/ScrollReveal";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getAllPosts } from "../lib/posts";
import video1 from "../assets/water.mp4"
import video2 from "../assets/paint.mp4"
import video3 from "../assets/network.mp4"


const heroSlides: Slide[] = [
    {
        main: "Sejin Kim",
        sub: "실험과 기록. 관람자로 편하게 둘러보세요.",
        accent: "Hello"
    },
    {
        main: "Between sips",
        sub: "커피와 커피 사이, 쌓이는 노트들.",
        accent: "Notes"
    },
    {
        main: "Still brewing",
        sub: "완성보다 과정이 재밌습니다.",
        accent: "WIP"
    },
];

const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
});

function formatKoDate(iso: string): string {
    const parsed = new Date(iso);
    return Number.isNaN(parsed.getTime()) ? iso : dateFormatter.format(parsed);
}

function App() {
    const latestPosts = getAllPosts().slice(0, 3);

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
                    <FilmHero slides={heroSlides} />
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
                            Personal Log · 2026
                        </motion.p>

                        {/* 메인 타이틀: 한 줄씩 스르륵 */}
                        <h2 className="text-sm md:text-[6rem] font-black tracking-tighter leading-[0.9] text-white flex flex-col items-center">
                            <motion.span
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: 0.1 }}
                            >
                                Notes from a
                            </motion.span>
                            <motion.span
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="italic font-serif text-primary font-light"
                            >
                                working developer.
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
                            프론트엔드, 인터랙션, 그리고 사이드 프로젝트에 대한 개인 기록.
                        </motion.p>
                    </div>
                </section>

                {/* 5. Features Grid: 주요 기능 소개 (카드 스타일) */}
                <section id="features" className="py-28 px-6 bg-black relative z-10 ">
                    <div className="max-w-6xl mx-auto ">
                        <h2 className="text-4xl md:text-6xl font-bold text-white text-center mb-20 tracking-tighter break-keep">
                            What I write about
                        </h2>

                        {/* 그리드 컨테이너 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Frontend Craft",
                                    description: "React, TypeScript, Tailwind. 매일 마주치는 UI 엔지니어링 문제와 내가 택한 해결 방식을 기록합니다.",
                                    video: video1
                                },
                                {
                                    title: "Motion & Interaction",
                                    description: "Framer Motion과 CSS만으로 만드는 섬세한 모션. 스크롤, 호버, 전환 — 감각을 코드로 옮기는 과정."
                                },
                                {
                                    title: "Design Systems",
                                    description: "토큰, 타이포, 컬러 팔레트. 규칙이 있는 시각 언어를 어떻게 유지할지 고민하고 반복합니다."
                                },
                                {
                                    title: "Side Projects",
                                    description: "주말마다 쌓아가는 작은 실험들. 완성도보다 발견에 집중하는 공간입니다."
                                },
                                {
                                    title: "Reading Notes",
                                    description: "기술서와 에세이에서 건져 올린 문장들. 코드가 아닌 생각의 레이어를 정리합니다."
                                },
                                {
                                    title: "Retrospectives",
                                    description: "끝난 프로젝트를 천천히 되짚는 글. 무엇을 얻었고 어디서 막혔는지 담백하게 남깁니다."
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
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-16">
                        <div className="md:col-span-5 md:sticky md:top-24 self-start">
                            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-white break-keep">How I work</h2>
                            <div className="h-1 w-24 bg-primary rounded-full mb-8" />
                            <p className="text-white/60 leading-relaxed text-base max-w-sm">
                                관찰에서 기록까지 — 작은 프로젝트 하나를 매듭짓기 위해 반복하는 세 단계.
                            </p>
                        </div>

                        <div className="md:col-span-7 flex flex-col gap-16">
                            {[
                                {
                                    step: "01",
                                    title: "Observe & Sketch",
                                    desc: "좋은 인터페이스는 관찰에서 시작합니다. 레퍼런스를 모으고, 손으로 스케치하며 문제의 결을 파악합니다.",
                                    video: video1
                                },
                                {
                                    step: "02",
                                    title: "Prototype in Code",
                                    desc: "아이디어는 실제 동작하는 프로토타입이 될 때 비로소 검증됩니다. 빠르게 만들고, 과감히 버리는 과정을 반복합니다.",
                                    video: video2
                                },
                                {
                                    step: "03",
                                    title: "Write & Revisit",
                                    desc: "만든 것을 글로 옮길 때 비로소 이해가 단단해집니다. 나중의 나를 위한 기록을 남기는 것이 마지막 단계입니다.",
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

                {/* 7. Latest writing */}
                <section id="latest" className="py-40 px-6 bg-black relative z-10">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-20 flex items-end justify-between gap-8 px-4">
                            <div>
                                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white break-keep">Latest writing</h2>
                                <div className="h-1 w-24 bg-primary rounded-full mt-4" />
                            </div>
                            <Link
                                to="/posts"
                                className="hidden md:inline-block text-sm font-medium tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors"
                            >
                                All posts →
                            </Link>
                        </div>

                        {latestPosts.length === 0 ? (
                            <ScrollReveal>
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 px-4 py-24">
                                    <div className="md:col-span-7">
                                        <p className="text-xs font-medium tracking-[0.25em] uppercase text-white/40 mb-6">
                                            Coming soon
                                        </p>
                                        <h3 className="text-4xl md:text-6xl font-semibold tracking-tighter text-white leading-[1.1] break-keep max-w-[18ch]">
                                            첫 글을 <br />준비 중입니다.
                                        </h3>
                                    </div>
                                    <div className="md:col-span-4 md:col-start-9 flex flex-col justify-end gap-6">
                                        <p className="text-base text-white/60 leading-relaxed max-w-prose">
                                            생각이 정리되는 대로 이곳에 먼저 도착합니다.
                                            그 전까지 지나간 기록을 둘러보실 수 있어요.
                                        </p>
                                        <Link
                                            to="/posts"
                                            className="inline-block text-sm font-medium tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-primary/60 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
                                        >
                                            Browse archive →
                                        </Link>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                                {latestPosts.map((post, i) => (
                                    <ScrollReveal key={post.slug} delay={i * 120}>
                                        <Link
                                            to={`/posts/${post.slug}`}
                                            className="group block h-full focus:outline-none focus-visible:ring-1 focus-visible:ring-primary/60 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
                                        >
                                            <article className="flex flex-col h-full gap-5 border-t border-white/10 pt-8 pb-2 transition-colors duration-300 group-hover:border-primary/40">
                                                <time
                                                    dateTime={post.date}
                                                    className="text-xs font-medium tracking-[0.25em] uppercase text-white/40"
                                                >
                                                    {formatKoDate(post.date)}
                                                </time>
                                                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white leading-tight group-hover:text-primary transition-colors break-keep">
                                                    {post.title}
                                                </h3>
                                                {post.excerpt && (
                                                    <p className="text-white/60 leading-relaxed text-base line-clamp-3">
                                                        {post.excerpt}
                                                    </p>
                                                )}
                                                {post.tags.length > 0 && (
                                                    <ul className="flex flex-wrap gap-x-3 gap-y-1 text-[0.65rem] font-medium tracking-[0.2em] uppercase text-white/40">
                                                        {post.tags.map((tag) => (
                                                            <li key={tag}>#{tag}</li>
                                                        ))}
                                                    </ul>
                                                )}
                                                <span className="mt-auto pt-4 text-sm font-medium tracking-[0.2em] uppercase text-white/40 group-hover:text-white transition-colors">
                                                    Read →
                                                </span>
                                            </article>
                                        </Link>
                                    </ScrollReveal>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

            </main>

            {/* 9. Footer */}
            <footer className="py-16 px-6 border-t border-border">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-sm font-medium text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <span className="text-foreground font-black tracking-tighter text-lg uppercase">Sejin.</span>
                        <span>© 2026. Personal log.</span>
                    </div>
                    <div className="flex gap-10">
                        <a href="#" className="hover:text-foreground transition-colors">About</a>
                        <a href="#" className="hover:text-foreground transition-colors">RSS</a>
                        <a href="#" className="hover:text-foreground transition-colors">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;
