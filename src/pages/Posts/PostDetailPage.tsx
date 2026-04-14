import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { getPostBySlug } from "../../lib/posts";
import { Markdown } from "./markdown";

function formatDate(iso: string): string {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" });
}

function NotFound({ slug }: { slug: string }) {
    return (
        <main className="min-h-screen bg-black text-white">
            <div className="max-w-prose mx-auto px-6 pt-32 pb-24">
                <p className="text-xs font-mono uppercase tracking-[0.3em] text-white/40 mb-6">
                    404 · Missing
                </p>
                <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.15]">
                    찾는 글이 여기에 없습니다.
                </h1>
                <p className="mt-6 text-white/55 text-lg leading-relaxed">
                    <code className="px-1.5 py-0.5 rounded-md bg-white/10 font-mono text-[0.85em]">
                        /{slug}
                    </code>{" "}
                    경로의 글은 존재하지 않거나, 이미 치워졌습니다.
                </p>
                <Link
                    to="/posts"
                    className="inline-flex items-center gap-2 mt-10 text-sm text-white/70 hover:text-primary transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    전체 글 목록으로
                </Link>
            </div>
        </main>
    );
}

export default function PostDetailPage() {
    const { slug = "" } = useParams<{ slug: string }>();
    const post = getPostBySlug(slug);

    if (!post) return <NotFound slug={slug} />;

    return (
        <main className="min-h-screen bg-black text-white">
            <motion.article
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                className="max-w-prose mx-auto px-6 pt-32 pb-24"
            >
                <Link
                    to="/posts"
                    className="inline-flex items-center gap-2 mb-12 text-xs font-mono uppercase tracking-[0.2em] text-white/40 hover:text-primary transition-colors"
                >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Journal
                </Link>

                <header className="mb-14">
                    <div className="flex items-center gap-3 text-xs font-mono text-white/40 mb-6">
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                        {post.readingTime ? (
                            <>
                                <span className="text-white/20">·</span>
                                <span>{post.readingTime}분</span>
                            </>
                        ) : null}
                    </div>
                    <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.15] text-white">
                        {post.title}
                    </h1>
                    {post.excerpt && (
                        <p className="mt-6 text-white/60 text-lg leading-relaxed">
                            {post.excerpt}
                        </p>
                    )}
                    {post.tags.length > 0 && (
                        <ul className="mt-8 flex flex-wrap gap-2">
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
                </header>

                <div className="h-px bg-white/10 mb-14" />

                <Markdown source={post.body} />
            </motion.article>
        </main>
    );
}
