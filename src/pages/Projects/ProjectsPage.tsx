import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

interface ProjectStub {
    title: string;
    description: string;
    stack: string[];
    year: string;
}

const projects: ProjectStub[] = [
    {
        title: "Inline Editor",
        description: "인라인 편집과 버전 관리가 한 화면에서 공존하는 라이트웨이트 CMS 실험.",
        stack: ["React", "TipTap", "Supabase"],
        year: "2026",
    },
    {
        title: "Ripple",
        description: "커서와 포인터의 잔향으로 인터페이스의 감각적 깊이를 실험한 모션 연구.",
        stack: ["WebGL", "Framer Motion"],
        year: "2025",
    },
    {
        title: "Field Notes",
        description: "매일의 읽기/쓰기 흔적을 타임라인으로 묶는 개인용 저널 시스템.",
        stack: ["TypeScript", "Markdown"],
        year: "2025",
    },
];

export default function ProjectsPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
                <header className="mb-24 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
                    <div className="md:col-span-8">
                        <p className="text-xs font-mono uppercase tracking-[0.3em] text-white/40 mb-6">
                            Projects · In progress
                        </p>
                        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1] break-keep max-w-[22ch]">
                            만드는 중인 것들, 그리고 곧 공개될 것들.
                        </h1>
                    </div>
                    <div className="md:col-span-4">
                        <p className="text-white/55 text-base leading-relaxed max-w-prose">
                            각 프로젝트는 완성이 아니라 현재 진행형의 질문입니다. 곧 사례와 함께 자세히 풀어 쓸 예정.
                        </p>
                    </div>
                </header>

                <ul className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {projects.map((project, idx) => (
                        <motion.li
                            key={project.title}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.4,
                                delay: idx * 0.06,
                                ease: [0.2, 0.8, 0.2, 1],
                            }}
                            className={
                                idx === 0
                                    ? "md:col-span-7"
                                    : idx === 1
                                      ? "md:col-span-5"
                                      : "md:col-span-12"
                            }
                        >
                            <article className="group h-full rounded-3xl border border-white/5 bg-white/[0.02] p-8 md:p-10 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/10">
                                <div className="flex items-start justify-between gap-6">
                                    <div className="flex items-center gap-3 text-xs font-mono text-white/40">
                                        <span>{project.year}</span>
                                        <span className="text-white/20">·</span>
                                        <span className="uppercase tracking-wider">Coming soon</span>
                                    </div>
                                    <span className="w-1.5 h-1.5 rounded-full bg-white/30 mt-1.5" aria-hidden="true" />
                                </div>
                                <h2 className="mt-6 text-2xl md:text-3xl font-semibold tracking-tight leading-snug break-keep">
                                    {project.title}
                                </h2>
                                <p className="mt-4 text-white/55 leading-relaxed max-w-prose">
                                    {project.description}
                                </p>
                                <ul className="mt-8 flex flex-wrap gap-2">
                                    {project.stack.map((s) => (
                                        <li
                                            key={s}
                                            className="text-[11px] font-mono uppercase tracking-wider text-white/45 px-2.5 py-1 rounded-full border border-white/10"
                                        >
                                            {s}
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        </motion.li>
                    ))}
                </ul>

                <footer className="mt-24 flex items-center justify-between border-t border-white/5 pt-10">
                    <p className="text-white/45 text-sm">
                        사례는 순차적으로 공개됩니다.
                    </p>
                    <Link
                        to="/posts"
                        className="group inline-flex items-center gap-2 text-sm font-medium text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 focus-visible:ring-offset-4 focus-visible:ring-offset-black rounded-full px-1"
                    >
                        먼저 글부터 읽기
                        <ArrowUpRight
                            className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            aria-hidden="true"
                        />
                    </Link>
                </footer>
            </div>
        </main>
    );
}
