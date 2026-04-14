import { motion } from "framer-motion";

const meta = [
    { label: "Role", value: "Product Engineer" },
    { label: "Based in", value: "Seoul, KR" },
    { label: "Writing since", value: "2022" },
];

const stack = ["TypeScript", "React", "Node", "Rust", "Figma"];

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
                        인터페이스의 감각과 시스템의 무게 사이에서 씁니다.
                    </h1>
                </motion.header>

                <section className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
                    <div className="md:col-span-7 space-y-6 text-white/70 text-lg leading-[1.65] max-w-prose">
                        <p>
                            제품 엔지니어로 일하며, 인터랙션 디테일과 데이터 흐름이 함께 만들어내는
                            감각에 관심이 있습니다. 잘 작동하는 것과 잘 느껴지는 것 사이의 거리를
                            좁히는 일을 합니다.
                        </p>
                        <p>
                            이 블로그는 결론보다는 과정을, 정답보다는 관찰을 남기는 장소입니다.
                            만든 것을 글로 옮기며 다시 한 번 설계의 의도를 정리합니다.
                        </p>
                        <p className="text-white/45 text-base">
                            더 긴 바이오와 이력은 곧 정리될 예정입니다.
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
                                    <dd className="text-sm text-white/80">{m.value}</dd>
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
                    </aside>
                </section>

                <footer className="mt-24 flex items-center justify-between border-t border-white/5 pt-10">
                    <p className="text-white/45 text-sm">
                        연락 수단은 준비 중.
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-white/40">
                        <span
                            aria-hidden="true"
                            className="inline-block w-1 h-1 rounded-full bg-white/30"
                        />
                        Contact — Coming soon
                    </span>
                </footer>
            </div>
        </main>
    );
}
