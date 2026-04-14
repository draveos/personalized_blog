import { useState } from "react"
import { Palette } from "lucide-react"
import type { SiteBlock } from "../../../lib/site-store"
import { PanelSection } from "./PanelSection"
import { NumberInput } from "./NumberInput"

interface StylePanelProps {
    block: SiteBlock
    onUpdate: (updates: Partial<SiteBlock>) => void
    onUpdateStyles: (styles: Record<string, string>) => void
}

export function StylePanel({ block, onUpdate, onUpdateStyles }: StylePanelProps) {
    const [expandedSections, setExpandedSections] = useState<Set<string>>(
        new Set(["position", "typography", "appearance"])
    )

    const toggleSection = (section: string) => {
        setExpandedSections((prev) => {
            const next = new Set(prev)
            if (next.has(section)) next.delete(section)
            else next.add(section)
            return next
        })
    }

    const hasTypography =
        block.type === "heading" ||
        block.type === "paragraph" ||
        block.type === "button" ||
        block.type === "card"

    const hasBackground =
        block.type === "button" ||
        block.type === "card" ||
        block.type === "divider"

    return (
        <div className="p-4 flex flex-col gap-4">
            <div className="flex items-center gap-2 pb-3 border-b border-border">
                <Palette className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-foreground capitalize">{block.type}</span>
            </div>

            {/* Position & Size */}
            <PanelSection
                title="Position & Size"
                id="position"
                expanded={expandedSections.has("position")}
                onToggle={() => toggleSection("position")}
            >
                <div className="grid grid-cols-2 gap-2">
                    <NumberInput label="X" value={block.x} onChange={(v) => onUpdate({ x: v })} />
                    <NumberInput label="Y" value={block.y} onChange={(v) => onUpdate({ y: v })} />
                    <NumberInput label="W" value={block.width} onChange={(v) => onUpdate({ width: v })} />
                    <NumberInput label="H" value={block.height} onChange={(v) => onUpdate({ height: v })} />
                </div>
            </PanelSection>

            {/* Typography */}
            {hasTypography && (
                <PanelSection
                    title="Typography"
                    id="typography"
                    expanded={expandedSections.has("typography")}
                    onToggle={() => toggleSection("typography")}
                >
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-muted-foreground">Font Size</label>
                            <input
                                type="text"
                                value={block.styles.fontSize || "16px"}
                                onChange={(e) => onUpdateStyles({ fontSize: e.target.value })}
                                className="px-3 py-1.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/30"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-muted-foreground">Font Weight</label>
                            <select
                                value={block.styles.fontWeight || "400"}
                                onChange={(e) => onUpdateStyles({ fontWeight: e.target.value })}
                                className="px-3 py-1.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/30"
                            >
                                <option value="300">Light</option>
                                <option value="400">Regular</option>
                                <option value="500">Medium</option>
                                <option value="600">Semibold</option>
                                <option value="700">Bold</option>
                                <option value="800">Extra Bold</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-muted-foreground">Text Color</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="color"
                                    value={block.styles.color || "#000000"}
                                    onChange={(e) => onUpdateStyles({ color: e.target.value })}
                                    className="w-8 h-8 rounded-lg cursor-pointer border border-border"
                                />
                                <input
                                    type="text"
                                    value={block.styles.color || "#000000"}
                                    onChange={(e) => onUpdateStyles({ color: e.target.value })}
                                    className="flex-1 px-3 py-1.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/30"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-muted-foreground">Line Height</label>
                            <input
                                type="text"
                                value={block.styles.lineHeight || "1.5"}
                                onChange={(e) => onUpdateStyles({ lineHeight: e.target.value })}
                                className="px-3 py-1.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/30"
                            />
                        </div>
                    </div>
                </PanelSection>
            )}

            {/* Appearance */}
            <PanelSection
                title="Appearance"
                id="appearance"
                expanded={expandedSections.has("appearance")}
                onToggle={() => toggleSection("appearance")}
            >
                <div className="flex flex-col gap-2">
                    {hasBackground && (
                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-muted-foreground">Background</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="color"
                                    value={block.styles.backgroundColor || "#ffffff"}
                                    onChange={(e) => onUpdateStyles({ backgroundColor: e.target.value })}
                                    className="w-8 h-8 rounded-lg cursor-pointer border border-border"
                                />
                                <input
                                    type="text"
                                    value={block.styles.backgroundColor || "#ffffff"}
                                    onChange={(e) => onUpdateStyles({ backgroundColor: e.target.value })}
                                    className="flex-1 px-3 py-1.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/30"
                                />
                            </div>
                        </div>
                    )}
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-muted-foreground">Border Radius</label>
                        <input
                            type="text"
                            value={block.styles.borderRadius || "0"}
                            onChange={(e) => onUpdateStyles({ borderRadius: e.target.value })}
                            className="px-3 py-1.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/30"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-muted-foreground">Border</label>
                        <input
                            type="text"
                            value={block.styles.border || "none"}
                            onChange={(e) => onUpdateStyles({ border: e.target.value })}
                            className="px-3 py-1.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/30"
                            placeholder="1px solid #e5e5e5"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-muted-foreground">Padding</label>
                        <input
                            type="text"
                            value={block.styles.padding || "0"}
                            onChange={(e) => onUpdateStyles({ padding: e.target.value })}
                            className="px-3 py-1.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/30"
                        />
                    </div>
                </div>
            </PanelSection>

            {/* Image Source */}
            {block.type === "image" && (
                <PanelSection
                    title="Image Source"
                    id="content"
                    expanded={expandedSections.has("content")}
                    onToggle={() => toggleSection("content")}
                >
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-muted-foreground">Image URL</label>
                        <input
                            type="text"
                            value={block.content}
                            onChange={(e) => onUpdate({ content: e.target.value })}
                            className="px-3 py-1.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/30"
                            placeholder="/images/hero-1.jpg"
                        />
                    </div>
                </PanelSection>
            )}
        </div>
    )
}
