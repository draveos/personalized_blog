"use client";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../lib/auth-context";
import { Navbar } from "../../components/NavBar";
import { ArrowLeft, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();
    const reduce = useReducedMotion();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        await new Promise((r) => setTimeout(r, 1000));

        const success = login(email, password);
        if (success) {
            navigate("/dashboard");
        } else {
            setError("Check your email and password.");
            setIsLoading(false);
        }
    };

    const ease: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

    return (
        <div className="min-h-screen bg-black text-white font-sans">
            <Navbar />

            <main className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
                {/* Soft radial glow for depth — single decorative element */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(var(--primary-rgb),0.10),transparent_60%)]"
                />

                <motion.section
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease }}
                    className="relative w-full max-w-md"
                >
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-8 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                    >
                        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                        Back
                    </Link>

                    {/* Single glass card */}
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 md:p-10">
                        <header className="mb-8">
                            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
                                Sign in
                            </h1>
                            <p className="mt-3 text-base text-white/50 leading-relaxed">
                                Enter your credentials to continue.
                            </p>
                        </header>

                        <form onSubmit={handleSubmit} noValidate className="space-y-5">
                            <div className="space-y-2">
                                <label
                                    htmlFor="email"
                                    className="block text-xs font-medium tracking-wide text-white/60"
                                >
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail
                                        aria-hidden="true"
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30"
                                    />
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@studio.com"
                                        className="w-full pl-11 pr-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder:text-white/25 transition-colors hover:border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:border-white/30"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="password"
                                    className="block text-xs font-medium tracking-wide text-white/60"
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock
                                        aria-hidden="true"
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30"
                                    />
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full pl-11 pr-12 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder:text-white/25 transition-colors hover:border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:border-white/30"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((v) => !v)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        aria-pressed={showPassword}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-white/40 hover:text-white/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        key="error"
                                        role="alert"
                                        aria-live="polite"
                                        initial={reduce ? { opacity: 0 } : { opacity: 0, y: -4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4 }}
                                        transition={{ duration: 0.24, ease }}
                                        className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400"
                                    >
                                        {error}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="relative w-full py-3.5 rounded-xl bg-white text-black font-medium text-sm tracking-wide transition-colors hover:bg-white/90 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black flex items-center justify-center overflow-hidden"
                            >
                                {isLoading ? (
                                    <span className="inline-flex items-center gap-2">
                                        <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                        <span>Signing in…</span>
                                    </span>
                                ) : (
                                    "Continue"
                                )}
                            </button>
                        </form>

                        <p className="mt-8 pt-6 border-t border-white/5 text-center text-sm text-white/40">
                            Don&rsquo;t have an account?{" "}
                            <span className="text-white/80 hover:text-white transition-colors">
                                Contact admin
                            </span>
                        </p>
                    </div>
                </motion.section>
            </main>
        </div>
    );
}
