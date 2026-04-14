import { useState } from "react"
import { Move, Copy, Trash2 } from "lucide-react"
import type { SiteBlock } from "../../../lib/site-store"

interface BlockRendererProps {
    block: SiteBlock
    isSelected: boolean
    isPreview: boolean
    zoom: number
    onMouseDown: (e: React.MouseEvent) => void
    onResizeDown: (e: React.MouseEvent, direction: string) => void
    onDelete: () => void
    onDuplicate: () => void
    onContentChange: (content: string) => void
}

export function BlockRenderer({
    block,
    isSelected,
    isPreview,
    zoom,
    onMouseDown,
    onResizeDown,
    onDelete,
    onDuplicate,
    onContentChange,
}: BlockRendererProps) {
    const [isEditing, setIsEditing] = useState(false)

    const startEditing = (e: React.MouseEvent) => {
        if (!isPreview) {
            e.stopPropagation()
            setIsEditing(true)
        }
    }

    const renderContent = () => {
        switch (block.type) {
            case "heading":
                return isEditing ? (
                    <input
                        type="text"
                        value={block.content}
                        onChange={(e) => onContentChange(e.target.value)}
                        onBlur={() => setIsEditing(false)}
                        autoFocus
                        className="w-full h-full bg-transparent outline-none"
                        style={block.styles}
                    />
                ) : (
                    <div className="w-full h-full cursor-text" style={block.styles} onDoubleClick={startEditing}>
                        {block.content}
                    </div>
                )

            case "paragraph":
                return isEditing ? (
                    <textarea
                        value={block.content}
                        onChange={(e) => onContentChange(e.target.value)}
                        onBlur={() => setIsEditing(false)}
                        autoFocus
                        className="w-full h-full bg-transparent outline-none resize-none"
                        style={block.styles}
                    />
                ) : (
                    <div className="w-full h-full cursor-text" style={block.styles} onDoubleClick={startEditing}>
                        {block.content}
                    </div>
                )

            case "image":
                return (
                    <img
                        src={block.content || "/images/hero-1.jpg"}
                        alt="User content"
                        className="w-full h-full"
                        style={{
                            objectFit: (block.styles.objectFit as React.CSSProperties["objectFit"]) || "cover",
                            borderRadius: block.styles.borderRadius || "0",
                        }}
                        crossOrigin="anonymous"
                    />
                )

            case "button":
                return (
                    <div
                        className="w-full h-full flex items-center justify-center cursor-pointer"
                        style={block.styles}
                        onDoubleClick={startEditing}
                    >
                        {isEditing ? (
                            <input
                                type="text"
                                value={block.content}
                                onChange={(e) => onContentChange(e.target.value)}
                                onBlur={() => setIsEditing(false)}
                                autoFocus
                                className="bg-transparent outline-none text-center w-full"
                                style={{
                                    color: block.styles.color,
                                    fontSize: block.styles.fontSize,
                                    fontWeight: block.styles.fontWeight,
                                }}
                            />
                        ) : (
                            block.content
                        )}
                    </div>
                )

            case "divider":
                return <div className="w-full h-full" style={{ backgroundColor: block.styles.backgroundColor || "#e5e5e5" }} />

            case "spacer":
                return <div className="w-full h-full" />

            case "card":
                return (
                    <div className="w-full h-full" style={block.styles} onDoubleClick={startEditing}>
                        {isEditing ? (
                            <textarea
                                value={block.content}
                                onChange={(e) => onContentChange(e.target.value)}
                                onBlur={() => setIsEditing(false)}
                                autoFocus
                                className="w-full h-full bg-transparent outline-none resize-none"
                                style={{
                                    fontSize: block.styles.fontSize,
                                    color: block.styles.color,
                                    padding: block.styles.padding,
                                }}
                            />
                        ) : (
                            block.content
                        )}
                    </div>
                )

            default:
                return <div>{block.content}</div>
        }
    }

    return (
        <div
            className={`absolute ${!isPreview ? "cursor-move" : ""} ${isSelected ? "z-10" : "z-0"}`}
            style={{
                left: block.x * zoom,
                top: block.y * zoom,
                width: block.width * zoom,
                height: block.height * zoom,
            }}
            onMouseDown={onMouseDown}
        >
            {isSelected && (
                <>
                    {/* Selection outline */}
                    <div
                        className="absolute -inset-px rounded border-2 pointer-events-none"
                        style={{ borderColor: "#c4704a" }}
                    />

                    {/* Floating toolbar */}
                    <div
                        className="absolute -top-10 left-0 flex items-center gap-1 bg-card rounded-lg shadow-lg border border-border px-1.5 py-1 z-20"
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        <button
                            className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                            title="Move"
                        >
                            <Move className="w-3.5 h-3.5" />
                        </button>
                        <button
                            onClick={onDuplicate}
                            className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                            title="Duplicate"
                        >
                            <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                            onClick={onDelete}
                            className="p-1 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                            title="Delete"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    {/* Resize handles */}
                    {(["n", "e", "s", "w", "ne", "nw", "se", "sw"] as const).map((dir) => {
                        const isCorner = dir.length === 2
                        const style: React.CSSProperties = {
                            position: "absolute",
                            width: isCorner ? "10px" : "6px",
                            height: isCorner ? "10px" : "6px",
                            backgroundColor: "#c4704a",
                            borderRadius: isCorner ? "2px" : "1px",
                            zIndex: 30,
                        }

                        if (dir.includes("n")) style.top = "-5px"
                        if (dir.includes("s")) style.bottom = "-5px"
                        if (dir.includes("e")) style.right = "-5px"
                        if (dir.includes("w")) style.left = "-5px"
                        if (dir === "n" || dir === "s") {
                            style.left = "50%"
                            style.transform = "translateX(-50%)"
                        }
                        if (dir === "e" || dir === "w") {
                            style.top = "50%"
                            style.transform = "translateY(-50%)"
                        }

                        const cursor =
                            dir === "n" || dir === "s"
                                ? "ns-resize"
                                : dir === "e" || dir === "w"
                                ? "ew-resize"
                                : dir === "ne" || dir === "sw"
                                ? "nesw-resize"
                                : "nwse-resize"

                        return (
                            <div
                                key={dir}
                                style={{ ...style, cursor }}
                                onMouseDown={(e) => onResizeDown(e, dir)}
                                onClick={(e) => e.stopPropagation()}
                            />
                        )
                    })}
                </>
            )}

            <div className="w-full h-full overflow-hidden">{renderContent()}</div>
        </div>
    )
}


