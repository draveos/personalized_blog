"use client"

import { useState, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
    ArrowLeft,
    Eye,
    Settings,
    Home,
    LayoutDashboard,
} from "lucide-react"
import { useAuth } from "../../lib/auth-context"
import { useSiteStore, type Site } from "../../lib/site-store"
import { BLOCK_TEMPLATES } from "./constants"
import { useBlockActions } from "./hooks/useBlockActions"
import { useMouseHandlers } from "./hooks/useMouseHandlers"
import { BlockRenderer } from "./components/BlockRenderer"
import { StylePanel } from "./components/StylePanel"

export default function BuilderPage() {
    const params = useParams()
    const navigate = useNavigate()
    const { isLoggedIn } = useAuth()
    const { getSite, updateSite } = useSiteStore()

    const siteId = params.siteId as string
    const site = getSite(siteId)

    const [currentPageIndex, setCurrentPageIndex] = useState(0)
    const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)
    const [showPreview, setShowPreview] = useState(false)
    const [showStylePanel, setShowStylePanel] = useState(true)
    const [zoom, setZoom] = useState(1)

    const canvasRef = useRef<HTMLDivElement>(null)

    if (!isLoggedIn || !site) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                        {!isLoggedIn ? "Please sign in" : "Site not found"}
                    </h2>
                    <button
                        onClick={() => navigate(isLoggedIn ? "/dashboard" : "/login")}
                        className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
                    >
                        {isLoggedIn ? "Go to Dashboard" : "Go to Login"}
                    </button>
                </div>
            </div>
        )
    }

    const currentPage = site.pages[currentPageIndex]
    const selectedBlock = currentPage?.blocks.find((b) => b.id === selectedBlockId) || null

    const saveSite = (updatedSite: Site) => updateSite(updatedSite)

    const { updateBlock, updateBlockStyles, addBlock, deleteBlock, duplicateBlock } = useBlockActions({
        site,
        currentPageIndex,
        saveSite,
        setSelectedBlockId,
    })

    const { handleMouseDown, handleResizeDown, wasDraggingRef } = useMouseHandlers({
        site,
        currentPageIndex,
        selectedBlockId,
        setSelectedBlockId,
        showPreview,
        zoom,
        updateBlock,
        canvasRef,
    })

    return (
        <div className="h-screen flex flex-col bg-background overflow-hidden">
            {/* Top toolbar */}
            <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 flex-shrink-0">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                        aria-label="Back to dashboard"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="h-6 w-px bg-border" />
                    <button
                        onClick={() => navigate("/")}
                        className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                        aria-label="Go to Home"
                    >
                        <Home className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                        aria-label="Go to Dashboard"
                    >
                        <LayoutDashboard className="w-4 h-4" />
                    </button>
                    <div className="h-6 w-px bg-border" />
                    <span className="text-sm font-semibold text-foreground">{site.name}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-secondary rounded-lg px-2 py-1">
                        <button
                            onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                            className="text-xs font-medium px-2 py-1 rounded text-muted-foreground hover:text-foreground transition-colors"
                        >
                            -
                        </button>
                        <span className="text-xs font-medium text-foreground min-w-[40px] text-center">
                            {Math.round(zoom * 100)}%
                        </span>
                        <button
                            onClick={() => setZoom(Math.min(2, zoom + 0.1))}
                            className="text-xs font-medium px-2 py-1 rounded text-muted-foreground hover:text-foreground transition-colors"
                        >
                            +
                        </button>
                    </div>
                    <button
                        onClick={() => setShowPreview(!showPreview)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                            showPreview
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-foreground hover:bg-accent"
                        }`}
                    >
                        <Eye className="w-4 h-4" />
                        <span className="hidden sm:block">Preview</span>
                    </button>
                    <button
                        onClick={() => setShowStylePanel(!showStylePanel)}
                        className={`p-2 rounded-lg transition-colors ${
                            showStylePanel
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                        }`}
                        aria-label="Toggle style panel"
                    >
                        <Settings className="w-4 h-4" />
                    </button>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Left: Block Palette */}
                {!showPreview && (
                    <aside className="w-56 border-r border-border bg-card flex-shrink-0 overflow-y-auto">
                        <div className="p-4">
                            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                                Add Blocks
                            </h3>
                            <div className="flex flex-col gap-1.5">
                                {BLOCK_TEMPLATES.map((template) => (
                                    <button
                                        key={template.type}
                                        onClick={() => addBlock(template)}
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm text-foreground hover:bg-secondary transition-colors group"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                            <template.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                        </div>
                                        {template.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="border-t border-border p-4">
                            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                                Page Background
                            </h3>
                            <input
                                type="color"
                                value={currentPage.background}
                                onChange={(e) => {
                                    const newPages = [...site.pages]
                                    newPages[currentPageIndex] = { ...currentPage, background: e.target.value }
                                    saveSite({ ...site, pages: newPages })
                                }}
                                className="w-full h-10 rounded-lg cursor-pointer border border-border"
                            />
                        </div>
                    </aside>
                )}

                {/* Center: Canvas */}
                <main
                    className="flex-1 overflow-auto flex items-start justify-center p-8"
                    style={{ backgroundColor: "#e8e5e0" }}
                    onClick={() => {
                        if (wasDraggingRef.current) {
                            wasDraggingRef.current = false
                            return
                        }
                        !showPreview && setSelectedBlockId(null)}}
                >
                    <div
                        ref={canvasRef}
                        className="relative shadow-2xl rounded-lg"
                        style={{
                            width: `${800 * zoom}px`,
                            minHeight: `${1200 * zoom}px`,
                            backgroundColor: currentPage.background,
                        }}
                    >
                        {/* Grid lines */}
                        {!showPreview && (
                            <div
                                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                                style={{
                                    backgroundImage: `
                                        linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                                        linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                                    `,
                                    backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
                                }}
                            />
                        )}

                        {currentPage.blocks.map((block) => (
                            <BlockRenderer
                                key={block.id}
                                block={block}
                                isSelected={selectedBlockId === block.id && !showPreview}
                                isPreview={showPreview}
                                zoom={zoom}
                                onMouseDown={(e) => handleMouseDown(e, block.id)}
                                onResizeDown={(e, dir) => handleResizeDown(e, block.id, dir)}
                                onDelete={() => deleteBlock(block.id)}
                                onDuplicate={() => duplicateBlock(block.id)}
                                onContentChange={(content) => updateBlock(block.id, { content })}
                            />
                        ))}
                    </div>
                </main>

                {/* Right: Style Panel */}
                {!showPreview && showStylePanel && selectedBlock && (
                    <aside className="w-72 border-l border-border bg-card flex-shrink-0 overflow-y-auto">
                        <StylePanel
                            block={selectedBlock}
                            onUpdate={(updates) => updateBlock(selectedBlock.id, updates)}
                            onUpdateStyles={(styles) => updateBlockStyles(selectedBlock.id, styles)}
                        />
                    </aside>
                )}
            </div>
        </div>
    )
}
