import { motion } from "framer-motion";

const meta = [
    { label: "Focus", value: "AI × Service" },
    { label: "Based in", value: "Seoul, KR" },
    { label: "Affiliation", value: "CAU · CAS-korea" },
    { label: "Contact", value: "draveos20@gmail.com" },
];

const links = [
    { label: "GitHub", href: "https://github.com/draveos" },
    { label: "Tistory Archive", href: "https://slowbutperfect.tistory.com/" },
];

const stack = [
    "PyTorch",
    "scikit-learn",
    "Python",
    "TypeScript",
    "React",
    "Vite",
    "TailwindCSS",
    "Figma",
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
                <motion.header
                    className="mb-24"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                >
                    <p className="text-xs font-mono uppercase tracking-[0.3em] text-white/40 mb-8">
                        About
                    </p>
                    <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1] max-w-3xl break-keep">
                        모델의 무게와 서비스의 감각 사이에서 씁니다.
                    </h1>
                </motion.header>

                <section className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
                    <div className="md:col-span-7 space-y-6 text-white/70 text-lg leading-[1.65] max-w-prose">
                        <p>
                            AI를 공부하는 학생입니다. 모델 아키텍처, 경량화, 실제 환경에서의
                            효율 — 논문 위의 수치와 사용자의 손 사이에 있는 간극을 들여다봅니다.
                        </p>
                        <p>
                            딥러닝 최적화와 웹 서비스 배포의 교차점에서 작업합니다.
                            학술적 지식을 실제 프로덕트의 기준으로 재구성하는 일, 그게 지금 관심사입니다.
                        </p>
                        <p>
                            이 블로그는 결론보다 과정을, 정답보다 관찰을 남기는 장소입니다.
                            만든 것을 글로 옮기며 설계의 의도를 다시 한 번 정리합니다.
                        </p>
                        <p className="text-white/45 text-base">
                            프로젝트는 <a className="underline underline-offset-4 hover:text-primary transition-colors" href="https://github.com/draveos" target="_blank" rel="noopener noreferrer">깃허브</a>에 공개되어 있습니다.
                        </p>
                    </div>

                    <aside className="md:col-span-4 md:col-start-9">
                        <dl className="space-y-6">
                            {meta.map((m) => (
                                <div
                                    key={m.label}
                                    className="flex items-baseline justify-between gap-6 border-b border-white/5 pb-4"
                                >
                                    <dt className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">
                                        {m.label}
                                    </dt>
                                    <dd className="text-sm text-white/80 break-all text-right">{m.value}</dd>
                                </div>
                            ))}
                        </dl>

                        <div className="mt-10">
                            <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 mb-4">
                                Stack
                            </p>
                            <ul className="flex flex-wrap gap-2">
                                {stack.map((s) => (
                                    <li
                                        key={s}
                                        className="text-[11px] font-mono uppercase tracking-wider text-white/45 px-2.5 py-1 rounded-full border border-white/10"
                                    >
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-10">
                            <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 mb-4">
                                Links
                            </p>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.href}>
                                        <a
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group inline-flex items-center gap-2 text-sm text-white/75 hover:text-primary transition-colors"
                                        >
                                            <span className="underline underline-offset-4 decoration-white/20 group-hover:decoration-primary">{link.label}</span>
                                            <span aria-hidden className="text-white/30 group-hover:text-primary transition-colors">↗</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                </section>

                <footer className="mt-24 flex items-center justify-between border-t border-white/5 pt-10">
                    <p className="text-white/45 text-sm">
                        feedback은 언제든지 환영합니다.
                    </p>
                    <a
                        href="mailto:draveos20@gmail.com"
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4"
                    >
                        <span
                            aria-hidden="true"
                            className="inline-block w-1 h-1 rounded-full bg-primary"
                        />
                        draveos20@gmail.com
                    </a>
                </footer>
            </div>
        </main>
    );
}
