import { type Site, type SiteBlock } from "../../../lib/site-store"
import { generateId, BLOCK_TEMPLATES } from "../constants"

interface UseBlockActionsParams {
    site: Site
    currentPageIndex: number
    saveSite: (site: Site) => void
    setSelectedBlockId: (id: string | null) => void
}

export function useBlockActions({
    site,
    currentPageIndex,
    saveSite,
    setSelectedBlockId,
}: UseBlockActionsParams) {
    const currentPage = site.pages[currentPageIndex]

    const updateBlock = (blockId: string, updates: Partial<SiteBlock>) => {
        const newPages = [...site.pages]
        const page = { ...newPages[currentPageIndex] }
        page.blocks = page.blocks.map((b) => (b.id === blockId ? { ...b, ...updates } : b))
        newPages[currentPageIndex] = page
        saveSite({ ...site, pages: newPages })
    }

    const updateBlockStyles = (blockId: string, styleUpdates: Record<string, string>) => {
        const block = currentPage.blocks.find((b) => b.id === blockId)
        if (!block) return
        updateBlock(blockId, { styles: { ...block.styles, ...styleUpdates } })
    }

    const addBlock = (template: (typeof BLOCK_TEMPLATES)[number]) => {
        const newBlock: SiteBlock = {
            id: generateId(),
            type: template.type,
            content: template.defaults.content || "",
            x: 60 + Math.random() * 100,
            y: 60 + currentPage.blocks.length * 80,
            width: template.defaults.width || 400,
            height: template.defaults.height || 60,
            styles: template.defaults.styles || {},
        }
        const newPages = [...site.pages]
        newPages[currentPageIndex] = {
            ...currentPage,
            blocks: [...currentPage.blocks, newBlock],
        }
        saveSite({ ...site, pages: newPages })
        setSelectedBlockId(newBlock.id)
    }

    const deleteBlock = (blockId: string) => {
        const newPages = [...site.pages]
        newPages[currentPageIndex] = {
            ...currentPage,
            blocks: currentPage.blocks.filter((b) => b.id !== blockId),
        }
        saveSite({ ...site, pages: newPages })
        setSelectedBlockId(null)
    }

    const duplicateBlock = (blockId: string) => {
        const block = currentPage.blocks.find((b) => b.id === blockId)
        if (!block) return
        const newBlock = { ...block, id: generateId(), x: block.x + 20, y: block.y + 20 }
        const newPages = [...site.pages]
        newPages[currentPageIndex] = {
            ...currentPage,
            blocks: [...currentPage.blocks, newBlock],
        }
        saveSite({ ...site, pages: newPages })
        setSelectedBlockId(newBlock.id)
    }

    return { updateBlock, updateBlockStyles, addBlock, deleteBlock, duplicateBlock }
}
