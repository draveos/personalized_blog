"use client";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../lib/auth-context";
import { Navbar } from "../../components/NavBar";
import { ArrowLeft, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { motion } from "framer-motion";

// 메인에서 썼던 영상 하나를 가져옵니다.
import videoAccess from "../../assets/water.mp4";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        await new Promise((r) => setTimeout(r, 1000));

        const success = login(email, password);
        if (success) {
            navigate("/dashboard");
        } else {
            setError("Invalid credentials. Hint: admin@studio.com");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col font-sans overflow-hidden">
            <Navbar />

            <div className="flex-1 flex flex-col lg:flex-row pt-20">
                {/* 1. Left: Minimal Login Form */}
                <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 z-20 bg-black">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-md w-full mx-auto lg:mx-0"
                    >
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-primary transition-colors mb-12 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Studio
                        </Link>

                        <div className="mb-10">
                            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
                                Authentication
                            </h1>
                            <p className="text-white/50 font-light text-lg">
                                Enter your credentials to access the editor.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 ml-1">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@studio.com"
                                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-white placeholder:text-white/20"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 ml-1">
                                    Security Key
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-white placeholder:text-white/20"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)]"
                            >
                                {isLoading ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    "Confirm Access"
                                )}
                            </button>
                        </form>

                        <div className="mt-12 pt-8 border-t border-white/5 text-center">
                            <p className="text-white/30 text-sm font-light">
                                Don't have an account? <span className="text-white hover:text-primary cursor-pointer transition-colors">Contact Admin</span>
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* 2. Right: Cinematic Visual (Merge with Main Theme) */}
                <div className="hidden lg:flex flex-[1.2] relative bg-[#0a0a0a] overflow-hidden">
                    {/* 영상 레이어 */}
                    <video
                        src={videoAccess}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale"
                    />

                    {/* 오버레이 효과: 코너쪽에서 들어오는 은은한 빛 */}
                    <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-black" />
                    <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(var(--primary-rgb),0.15),transparent_60%)]" />

                    {/* 타이포그래피 장식 */}
                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-20 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5 }}
                        >
                            <h2 className="text-7xl xl:text-8xl font-black tracking-[ -0.05em] leading-none mb-6">
                                BEYOND <br /> <span className="text-primary italic font-serif font-light">RECORDING</span>
                            </h2>
                            <p className="text-xl text-white/40 font-light tracking-widest uppercase">
                                Visual Studio Edition 2026
                            </p>
                        </motion.div>
                    </div>

                    {/* 하단 장식 요소 */}
                    <div className="absolute bottom-12 right-12 flex gap-8 items-center opacity-20">
                        <div className="text-right">
                            <p className="text-[10px] font-mono tracking-widest">SYSTEM STATUS</p>
                            <p className="text-xs font-mono font-bold">ENCRYPTED / SECURE</p>
                        </div>
                        <div className="h-8 w-[1px] bg-white/30" />
                        <div className="w-12 h-12 border border-white/50 rounded-full flex items-center justify-center text-[10px] font-mono">
                            DWS
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}