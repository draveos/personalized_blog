import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

interface ProjectStub {
    title: string;
    description: string;
    stack: string[];
    year: string;
    repo: string;
}

const projects: ProjectStub[] = [
    {
        title: "AI Resume",
        description:
            "LLM으로 이력서·자기소개서 초안을 생성하는 웹 서비스. React + Node + OpenAI API로 입력→프롬프트→출력 전 구간을 직접 설계한 Mock MVP.",
        stack: ["React", "TypeScript", "Node", "OpenAI API"],
        year: "2025",
        repo: "https://github.com/draveos/AI_Resume_Project",
    },
    {
        title: "Algorithm Visualizer",
        description:
            "정렬·탐색·트리 순회 같은 고전 알고리즘을 애니메이션으로 보여주는 학습 도구. 트리 구성, 순회 방식, 재생 속도를 손으로 돌려볼 수 있는 상호작용 실험.",
        stack: ["React", "Vite", "TypeScript"],
        year: "2025",
        repo: "https://github.com/draveos/algorithm_visualizer",
    },
    {
        title: "GAT × GCN on Pubmed",
        description:
            "Planetoid 데이터셋에서 GCN과 GAT을 직접 구현·비교. 모델 구조만이 아니라 학습 안정화와 후처리(Correct & Smooth, Ensemble)가 성능에 미치는 영향까지 실험.",
        stack: ["PyTorch", "PyG", "GNN"],
        year: "2025",
        repo: "https://github.com/draveos/GAT-GCN-Pubmed",
    },
    {
        title: "Mario × DDQN",
        description:
            "Super Mario Bros 환경에서 Double DQN으로 에이전트를 학습시키며 강화학습의 동작을 직접 관찰. Replay Buffer, Target Network, Frame stacking, Reward shaping을 손으로 설계.",
        stack: ["Python", "PyTorch", "Gym", "RL"],
        year: "2025",
        repo: "https://github.com/draveos/mario_RL",
    },
    {
        title: "EXAONE Layer Probe",
        description:
            "LG Aimers 해커톤 전 사전 실험. EXAONE 모델의 레이어별 민감도를 값 변환으로 측정하며, 어느 레이어가 품질을 떠받치는지를 코사인 유사도로 정성 관찰.",
        stack: ["LLM", "Quantization", "Python"],
        year: "2025",
        repo: "https://github.com/draveos/LGAimers-EXAONE-Experiment",
    },
    {
        title: "CAU Portal Renewal",
        description:
            "중앙대 학생 포털의 정보 구조와 사용자 흐름을 다시 설계. 과밀한 정보, 약한 위계, 개인화 부재를 출발점으로 삼아 UI/UX를 재건하는 리노베이션.",
        stack: ["React", "TypeScript", "Tailwind"],
        year: "2024",
        repo: "https://github.com/draveos/CAU_Portal_Renewal",
    },
];

const LAYOUT = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7", "md:col-span-6", "md:col-span-6"];

export default function ProjectsPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
                <header className="mb-24 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
                    <div className="md:col-span-8">
                        <p className="text-xs font-mono uppercase tracking-[0.3em] text-white/40 mb-6">
                            Projects · On GitHub
                        </p>
                        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1] break-keep max-w-[22ch]">
                            실험실에서 꺼낸 것들.
                        </h1>
                    </div>
                    <div className="md:col-span-4">
                        <p className="text-white/55 text-base leading-relaxed max-w-prose">
                            AI 모델에서 웹 서비스까지. 각 카드의 제목을 누르면 레포로 이동합니다.
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
                            className={LAYOUT[idx] ?? "md:col-span-6"}
                        >
                            <a
                                href={project.repo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block h-full rounded-3xl border border-white/5 bg-white/[0.02] p-8 md:p-10 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/15 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
                            >
                                <div className="flex items-start justify-between gap-6">
                                    <div className="flex items-center gap-3 text-xs font-mono text-white/40">
                                        <span>{project.year}</span>
                                        <span className="text-white/20">·</span>
                                        <span className="uppercase tracking-wider">GitHub</span>
                                    </div>
                                    <ArrowUpRight
                                        className="w-4 h-4 text-white/35 transition-all duration-300 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                        aria-hidden="true"
                                    />
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
                            </a>
                        </motion.li>
                    ))}
                </ul>

                <footer className="mt-24 flex items-center justify-between border-t border-white/5 pt-10">
                    <p className="text-white/45 text-sm">
                        코드는 모두 공개. 댓글/이슈 환영.
                    </p>
                    <Link
                        to="/posts"
                        className="group inline-flex items-center gap-2 text-sm font-medium text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 focus-visible:ring-offset-4 focus-visible:ring-offset-black rounded-full px-1"
                    >
                        관련 글도 읽기
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
