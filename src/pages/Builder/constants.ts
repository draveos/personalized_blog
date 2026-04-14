import {
    Type,
    AlignLeft,
    Image as ImageIcon,
    Square,
    Minus,
    MousePointerClick,
    Columns,
} from "lucide-react"
import type { SiteBlock } from "../../lib/site-store"

export function generateId() {
    return Math.random().toString(36).slice(2, 11)
}

export const BLOCK_TEMPLATES: {
    type: SiteBlock["type"]
    label: string
    icon: typeof Type
    defaults: Partial<SiteBlock>
}[] = [
    {
        type: "heading",
        label: "Heading",
        icon: Type,
        defaults: {
            content: "New Heading",
            width: 500,
            height: 50,
            styles: { fontSize: "36px", fontWeight: "700", color: "#1a1a1a" },
        },
    },
    {
        type: "paragraph",
        label: "Text",
        icon: AlignLeft,
        defaults: {
            content: "Add your text content here. Click to edit.",
            width: 500,
            height: 80,
            styles: { fontSize: "16px", color: "#666666", lineHeight: "1.6" },
        },
    },
    {
        type: "image",
        label: "Image",
        icon: ImageIcon,
        defaults: {
            content: "/images/hero-1.jpg",
            width: 400,
            height: 250,
            styles: { borderRadius: "12px", objectFit: "cover" },
        },
    },
    {
        type: "button",
        label: "Button",
        icon: MousePointerClick,
        defaults: {
            content: "Click Me",
            width: 160,
            height: 48,
            styles: {
                backgroundColor: "#c4704a",
                color: "#ffffff",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
            },
        },
    },
    {
        type: "divider",
        label: "Divider",
        icon: Minus,
        defaults: {
            content: "",
            width: 600,
            height: 2,
            styles: { backgroundColor: "#e5e5e5" },
        },
    },
    {
        type: "spacer",
        label: "Spacer",
        icon: Square,
        defaults: {
            content: "",
            width: 600,
            height: 60,
            styles: {},
        },
    },
    {
        type: "card",
        label: "Card",
        icon: Columns,
        defaults: {
            content: "Card content goes here",
            width: 350,
            height: 200,
            styles: {
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                border: "1px solid #e5e5e5",
                padding: "24px",
                fontSize: "16px",
                color: "#333333",
            },
        },
    },
]
