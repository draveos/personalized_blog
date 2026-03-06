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
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // 스크롤 전(Hero 위)에는 흰색, 스크롤 후에는 테마 색상(Foreground) 적용
    const textColor = scrolled ? "text-foreground" : "text-white";
    const subTextColor = scrolled ? "text-foreground/70" : "text-white/70";

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 py-4 ${
                    scrolled
                        ? "py-3 bg-background/70 backdrop-blur-xl "
                        : "bg-transparent"
                }`}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <a href="/" className="flex items-center gap-3 group">
                        <div className="relative w-10 h-10 flex items-center justify-center overflow-hidden rounded-xl bg-primary transition-transform duration-500 group-hover:rotate-[360deg] shadow-lg">
                            <span className="text-lg font-black text-primary-foreground italic">S</span>
                        </div>
                        <span className={`text-xl font-bold tracking-tighter uppercase transition-colors duration-500 ${textColor}`}>
                            DWS
                        </span>
                    </a>

                    {/* Desktop Links - 캡슐형 디자인 */}
                    <div className={`hidden md:flex items-center gap-1 p-1 rounded-full border transition-all duration-500 ${
                        scrolled ? "bg-black/5 border-black/5" : "bg-white/10 border-white/10 backdrop-blur-md"
                    }`}>
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${subTextColor} hover:text-primary hover:bg-white/10`}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-4">
                        <button className={`p-2 transition-colors duration-500 ${subTextColor} hover:text-primary`}>
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
                            className={`md:hidden p-2 rounded-xl border transition-all ${
                                scrolled ? "bg-black/5 border-black/10 text-foreground" : "bg-white/10 border-white/20 text-white"
                            }`}
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
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[110] md:hidden bg-background/95 backdrop-blur-2xl flex flex-col p-8"
                    >
                        <div className="flex justify-end mb-8">
                            <button onClick={() => setMobileOpen(false)} className="p-2 rounded-full bg-muted">
                                <X className="w-8 h-8" />
                            </button>
                        </div>

                        <div className="flex flex-col gap-6">
                            {NAV_LINKS.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="text-4xl font-black text-foreground hover:text-primary transition-colors flex items-center justify-between"
                                >
                                    {link.label}
                                    <link.icon className="w-8 h-8 text-muted-foreground" />
                                </a>
                            ))}
                        </div>

                        <a
                            href="/login"
                            className="mt-auto p-6 rounded-3xl bg-primary text-primary-foreground text-center text-2xl font-black shadow-xl"
                        >
                            Get Started
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}