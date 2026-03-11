"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/auth-context";
import { useSiteStore, type Site } from "../lib/site-store";
import { Plus, Globe, Calendar, Trash2, Pencil, ExternalLink, LayoutGrid, Monitor } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardPage() {
    const { isLoggedIn } = useAuth();
    const { sites, createSite, deleteSite } = useSiteStore();
    const navigate = useNavigate();

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newName, setNewName] = useState("");
    const [newDesc, setNewDesc] = useState("");
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    // 비로그인 상태 대응
    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-6">
                <div className="text-center p-12 rounded-[3rem] border border-white/5 bg-white/5 backdrop-blur-3xl max-w-md w-full">
                    <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Monitor className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4 tracking-tighter">Access Denied</h2>
                    <p className="text-slate-500 mb-8 font-light">Please sign in to manage your cinematic records.</p>
                    <button
                        onClick={() => navigate("/login")}
                        className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-black hover:scale-105 transition-all"
                    >
                        Go to Authentication
                    </button>
                </div>
            </div>
        );
    }

    const handleCreate = () => {
        if (!newName.trim()) return;
        const site = createSite(newName.trim(), newDesc.trim());
        setShowCreateModal(false);
        setNewName("");
        setNewDesc("");
        navigate(`/builder/${site.id}`);
    };

    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6">
            <main className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-16 px-2">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            <span className="text-xs font-mono tracking-[0.4em] text-white/40 uppercase">Workspace Alpha</span>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black tracking-tighter">
                            Your <span className="text-primary italic font-serif font-light">Library</span>
                        </h2>
                    </div>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-black font-black text-lg hover:bg-primary hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    >
                        <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
                        Create Record
                    </button>
                </div>

                {/* Content Area */}
                {sites.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-40 rounded-[4rem] border border-white/5 bg-[#080808] relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.05),transparent_70%)]" />
                        <Globe className="w-20 h-20 text-white/10 mb-8" />
                        <h3 className="text-2xl font-bold text-white mb-3">No active records found</h3>
                        <p className="text-slate-500 mb-10 text-center max-w-xs font-light">
                            Start your journey by creating your first cinematic website project.
                        </p>
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="px-10 py-4 rounded-full border border-white/20 hover:border-primary hover:bg-primary/5 transition-all text-sm font-bold tracking-widest uppercase"
                        >
                            Initial Setup
                        </button>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sites.map((site) => (
                            <SiteCard
                                key={site.id}
                                site={site}
                                onEdit={() => navigate(`/builder/${site.id}`)}
                                onDelete={() => setDeleteConfirm(site.id)}
                                isDeleting={deleteConfirm === site.id}
                                onConfirmDelete={() => deleteSite(site.id)}
                                onCancelDelete={() => setDeleteConfirm(null)}
                            />
                        ))}
                    </div>
                )}
            </main>

            {/* Create Modal (Portal 감성) */}
            <AnimatePresence>
                {showCreateModal && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                            onClick={() => setShowCreateModal(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative bg-[#111] border border-white/10 rounded-[3rem] p-10 md:p-14 w-full max-w-xl shadow-2xl"
                        >
                            <h3 className="text-4xl font-black text-white mb-10 tracking-tighter">
                                New <span className="text-primary italic">Project</span>
                            </h3>
                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase ml-1">Project Name</label>
                                    <input
                                        type="text"
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                        placeholder="Enter title..."
                                        className="w-full px-0 py-4 bg-transparent border-b border-white/10 focus:border-primary transition-colors text-2xl font-medium outline-none placeholder:text-white/10"
                                        autoFocus
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase ml-1">Description</label>
                                    <textarea
                                        value={newDesc}
                                        onChange={(e) => setNewDesc(e.target.value)}
                                        placeholder="A brief summary of this work..."
                                        className="w-full px-0 py-4 bg-transparent border-b border-white/10 focus:border-primary transition-colors text-lg font-light outline-none placeholder:text-white/10 resize-none h-24"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-6 mt-16">
                                <button onClick={() => setShowCreateModal(false)} className="text-white/40 hover:text-white transition-colors font-bold">DISCARD</button>
                                <button
                                    onClick={handleCreate}
                                    disabled={!newName.trim()}
                                    className="px-10 py-4 rounded-2xl bg-primary text-primary-foreground font-black hover:scale-105 transition-all disabled:opacity-20"
                                >
                                    CREATE & LAUNCH
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

function SiteCard({ site, onEdit, onDelete, isDeleting, onConfirmDelete, onCancelDelete }: any) {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="group bg-[#0d0d0d] rounded-[2.5rem] border border-white/5 overflow-hidden hover:border-primary/40 transition-all duration-500"
        >
            {/* Preview area (미니멀하게) */}
            <div className="h-52 bg-gradient-to-br from-zinc-800 to-black relative flex items-center justify-center p-8">
                <div className="w-full h-full rounded-2xl border border-white/5 bg-black/40 backdrop-blur-md flex items-center justify-center">
                    <LayoutGrid className="w-8 h-8 text-white/10" />
                </div>
                {/* Hover 시에만 보이는 오버레이 */}
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <button onClick={onEdit} className="bg-white text-black px-6 py-3 rounded-full font-black text-sm tracking-widest uppercase shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        Launch Editor
                    </button>
                </div>
            </div>

            {/* Info */}
            <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{site.name}</h3>
                    <div className="text-[10px] font-mono text-white/20 bg-white/5 px-2 py-1 rounded tracking-tighter uppercase">
                        Active
                    </div>
                </div>
                <p className="text-sm text-slate-500 mb-8 line-clamp-1 font-light tracking-tight">{site.description || "No description provided."}</p>

                <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-white/30 uppercase mb-8">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(site.createdAt).toLocaleDateString()}</span>
                    </div>
                    <span>{site.pages.length} Pages</span>
                </div>

                {isDeleting ? (
                    <div className="flex gap-2 animate-pulse">
                        <button onClick={onConfirmDelete} className="flex-1 py-3 bg-red-500 text-white rounded-xl text-xs font-black">CONFIRM</button>
                        <button onClick={onCancelDelete} className="px-4 py-3 bg-white/10 text-white rounded-xl text-xs font-black">CANCEL</button>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <button onClick={onEdit} className="p-3 rounded-xl bg-white/5 hover:bg-primary/20 hover:text-primary transition-all text-white/50">
                            <Pencil className="w-4 h-4" />
                        </button>
                        <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-white/50">
                            <ExternalLink className="w-4 h-4" />
                        </button>
                        <button onClick={onDelete} className="p-3 rounded-xl bg-white/5 hover:text-red-500 transition-all text-white/50 ml-auto">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    );
}