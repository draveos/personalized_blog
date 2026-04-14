import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { getAllPosts } from "../../lib/posts";

function formatDate(iso: string): string {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" });
}

export default function PostsListPage() {
    const posts = getAllPosts();

    return (
        <main className="min-h-screen bg-black text-white">
            <div className="max-w-5xl mx-auto px-6 pt-32 pb-24">
                <header className="mb-20">
                    <p className="text-xs font-mono uppercase tracking-[0.3em] text-white/40 mb-6">
                        Journal · {posts.length.toString().padStart(2, "0")}
                    </p>
                    <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1]">
                        쓰는 것이 만드는 것보다 먼저.
                    </h1>
                    <p className="mt-6 max-w-xl text-white/55 text-lg leading-relaxed">
                        인터랙션·시스템·회고. 손에 닿는 결정들만 남깁니다.
                    </p>
                </header>

                <ul className="flex flex-col gap-4">
                    {posts.map((post, idx) => (
                        <motion.li
                            key={post.slug}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.4,
                                delay: idx * 0.05,
                                ease: [0.2, 0.8, 0.2, 1],
                            }}
                        >
                            <Link
                                to={`/posts/${post.slug}`}
                                className="group block rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm p-8 md:p-10 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
                            >
                                <div className="flex items-start justify-between gap-6">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 text-xs font-mono text-white/40 mb-4">
                                            <time dateTime={post.date}>{formatDate(post.date)}</time>
                                            {post.readingTime ? (
                                                <>
                                                    <span className="text-white/20">·</span>
                                                    <span>{post.readingTime}분</span>
                                                </>
                                            ) : null}
                                        </div>
                                        <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-white leading-snug transition-colors group-hover:text-primary">
                                            {post.title}
                                        </h2>
                                        <p className="mt-3 text-white/55 leading-relaxed line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                        {post.tags.length > 0 && (
                                            <ul className="mt-6 flex flex-wrap gap-2">
                                                {post.tags.map((tag) => (
                                                    <li
                                                        key={tag}
                                                        className="text-[11px] font-mono uppercase tracking-wider text-white/45 px-2.5 py-1 rounded-full border border-white/10"
                                                    >
                                                        {tag}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    <ArrowUpRight
                                        className="w-5 h-5 text-white/30 transition-all duration-300 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                        aria-hidden="true"
                                    />
                                </div>
                            </Link>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </main>
    );
}
