import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export interface SiteBlock {
    id: string
    type: "heading" | "paragraph" | "image" | "spacer" | "button" | "divider" | "card" | "columns"
    content: string
    x: number
    y: number
    width: number
    height: number
    styles: Record<string, string>
}

export interface SitePage {
    id: string
    name: string
    blocks: SiteBlock[]
    background: string
    createdAt: string
}

export interface Site {
    id: string
    name: string
    description: string
    pages: SitePage[]
    createdAt: string
    updatedAt: string
}

interface SiteStoreContextType {
    sites: Site[]
    createSite: (name: string, description: string) => Site
    updateSite: (site: Site) => void
    deleteSite: (id: string) => void
    getSite: (id: string) => Site | undefined
}

const SiteStoreContext = createContext<SiteStoreContextType | undefined>(undefined)

function generateId() {
    return Math.random().toString(36).slice(2, 11)
}

function getDefaultPage(): SitePage {
    return {
        id: generateId(),
        name: "Home",
        blocks: [
            {
                id: generateId(),
                type: "heading",
                content: "Welcome to Your New Site",
                x: 60,
                y: 40,
                width: 680,
                height: 60,
                styles: { fontSize: "42px", fontWeight: "700", color: "#1a1a1a" },
            },
            {
                id: generateId(),
                type: "paragraph",
                content: "Start building your dream website by dragging and editing blocks. Click on any element to customize it.",
                x: 60,
                y: 120,
                width: 680,
                height: 80,
                styles: { fontSize: "18px", color: "#666666", lineHeight: "1.6" },
            },
            {
                id: generateId(),
                type: "button",
                content: "Get Started",
                x: 60,
                y: 230,
                width: 180,
                height: 48,
                styles: { backgroundColor: "#c4704a", color: "#ffffff", borderRadius: "8px", fontSize: "16px", fontWeight: "600" },
            },
        ],
        background: "#faf8f5",
        createdAt: new Date().toISOString(),
    }
}

export function SiteStoreProvider({ children }: { children: ReactNode }) {
    const [sites, setSites] = useState<Site[]>([])

    const createSite = useCallback((name: string, description: string) => {
        const newSite: Site = {
            id: generateId(),
            name,
            description,
            pages: [getDefaultPage()],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
        setSites((prev) => [...prev, newSite])
        return newSite
    }, [])

    const updateSite = useCallback((site: Site) => {
        setSites((prev) =>
            prev.map((s) => (s.id === site.id ? { ...site, updatedAt: new Date().toISOString() } : s))
        )
    }, [])

    const deleteSite = useCallback((id: string) => {
        setSites((prev) => prev.filter((s) => s.id !== id))
    }, [])

    const getSite = useCallback(
        (id: string) => sites.find((s) => s.id === id),
        [sites]
    )

    return (
        <SiteStoreContext.Provider value={{ sites, createSite, updateSite, deleteSite, getSite }}>
            {children}
        </SiteStoreContext.Provider>
    )
}

export function useSiteStore() {
    const context = useContext(SiteStoreContext)
    if (context === undefined) {
        throw new Error("useSiteStore must be used within a SiteStoreProvider")
    }
    return context
}
