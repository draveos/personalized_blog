import { ChevronDown } from "lucide-react"

interface PanelSectionProps {
    title: string
    id: string
    expanded: boolean
    onToggle: () => void
    children: React.ReactNode
}

export function PanelSection({ title, expanded, onToggle, children }: PanelSectionProps) {
    return (
        <div className="border border-border rounded-xl overflow-hidden">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary/50 transition-colors"
            >
                {title}
                <ChevronDown
                    className={`w-4 h-4 text-muted-foreground transition-transform ${expanded ? "rotate-180" : ""}`}
                />
            </button>
            {expanded && <div className="px-3 pb-3">{children}</div>}
        </div>
    )
}
