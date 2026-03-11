"use client";

import { useState, useEffect } from "react";
import { Menu, X, Home, Sparkles, Layers, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const NAV_LINKS = [
    { href: "#", label: "Home", icon: Home },
    { href: "#features", label: "Features", icon: Sparkles },
    { href: "#showcase", label: "Showcase", icon: Layers },
];

export function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 py-4 ${
                    scrolled
                        ? "py-3 bg-black/60 backdrop-blur-xl" // 보더(border-b) 제거, 더 짙은 투명 블랙
                        : "bg-transparent"
                }`}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <a href="/" className="flex items-center gap-3 group">
                        <div className="relative w-10 h-10 flex items-center justify-center overflow-hidden rounded-xl bg-primary transition-transform duration-500 group-hover:rotate-[360deg] shadow-lg">
                            <span className="text-lg font-black text-primary-foreground italic">S</span>
                        </div>
                        <span className="text-xl font-bold tracking-tighter uppercase text-white transition-colors duration-500">
                            DWS
                        </span>
                    </a>

                    {/* Desktop Links - 다크 테마 캡슐 디자인 */}
                    <div className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/5 backdrop-blur-md border border-white/5">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="px-5 py-2 rounded-full text-sm font-medium text-white hover:text-primary hover:bg-white/5 transition-all"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-white/60 hover:text-primary transition-colors">
                            <Search className="w-5 h-5" />
                        </button>

                        <a
                            href="/login"
                            className="hidden md:block px-6 py-2.5 rounded-full text-sm font-bold bg-primary text-primary-foreground hover:scale-105 active:scale-95 transition-all shadow-lg"
                        >
                            Get Started
                        </a>

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden p-2 rounded-xl bg-white/5 text-white border border-white/10"
                        >
                            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-[110] md:hidden bg-black/95 backdrop-blur-2xl flex flex-col p-8"
                    >
                        <div className="flex justify-between items-center mb-12">
                            <span className="text-2xl font-black text-white italic tracking-tighter">DWS</span>
                            <button onClick={() => setMobileOpen(false)} className="p-3 rounded-full bg-white/10 text-white">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex flex-col gap-8">
                            {NAV_LINKS.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="text-5xl font-bold text-white/30 hover:text-primary transition-all flex items-center justify-between group"
                                >
                                    {link.label}
                                    <link.icon className="w-10 h-10 group-hover:text-primary transition-colors" />
                                </a>
                            ))}
                        </div>

                        <a
                            href="/login"
                            className="mt-auto p-6 rounded-3xl bg-primary text-primary-foreground text-center text-2xl font-black shadow-2xl"
                        >
                            Get Started
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}