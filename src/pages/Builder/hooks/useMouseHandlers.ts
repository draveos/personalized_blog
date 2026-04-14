import { useState, useCallback, useEffect, useRef } from "react"
import type { Site, SiteBlock } from "../../../lib/site-store"

interface UseMouseHandlersParams {
    site: Site
    currentPageIndex: number
    selectedBlockId: string | null
    setSelectedBlockId: (id: string | null) => void
    showPreview: boolean
    zoom: number
    updateBlock: (blockId: string, updates: Partial<SiteBlock>) => void
    canvasRef: React.RefObject<HTMLDivElement>
}

export function useMouseHandlers({
    site,
    currentPageIndex,
    selectedBlockId,
    setSelectedBlockId,
    showPreview,
    zoom,
    updateBlock,
    canvasRef,
}: UseMouseHandlersParams) {
    const [isDragging, setIsDragging] = useState(false)
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
    const [isResizing, setIsResizing] = useState(false)
    const [resizeDirection, setResizeDirection] = useState<string>("")
    const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, w: 0, h: 0 })

    const currentPage = site.pages[currentPageIndex]

    const handleMouseDown = (e: React.MouseEvent, blockId: string) => {
        if (showPreview) return
        e.stopPropagation()
        const block = currentPage.blocks.find((b) => b.id === blockId)
        if (!block) return

        setSelectedBlockId(blockId)
        setIsDragging(true)

        const rect = canvasRef.current?.getBoundingClientRect()
        if (rect) {
            setDragOffset({
                x: (e.clientX - rect.left) / zoom - block.x,
                y: (e.clientY - rect.top) / zoom - block.y,
            })
        }
    }

    const handleResizeDown = (e: React.MouseEvent, blockId: string, direction: string) => {
        if (showPreview) return
        e.stopPropagation()
        const block = currentPage.blocks.find((b) => b.id === blockId)
        if (!block) return

        setSelectedBlockId(blockId)
        setIsResizing(true)
        setResizeDirection(direction)
        setResizeStart({ x: e.clientX, y: e.clientY, w: block.width, h: block.height })
    }

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (isDragging && selectedBlockId) {
                const rect = canvasRef.current?.getBoundingClientRect()
                if (rect) {
                    const newX = Math.max(0, (e.clientX - rect.left) / zoom - dragOffset.x)
                    const newY = Math.max(0, (e.clientY - rect.top) / zoom - dragOffset.y)
                    updateBlock(selectedBlockId, { x: Math.round(newX), y: Math.round(newY) })
                }
            }
            if (isResizing && selectedBlockId) {
                const dx = (e.clientX - resizeStart.x) / zoom
                const dy = (e.clientY - resizeStart.y) / zoom

                const updates: Partial<SiteBlock> = {}
                if (resizeDirection.includes("e")) updates.width = Math.max(40, Math.round(resizeStart.w + dx))
                if (resizeDirection.includes("s")) updates.height = Math.max(20, Math.round(resizeStart.h + dy))
                if (resizeDirection.includes("w")) {
                    updates.width = Math.max(40, Math.round(resizeStart.w - dx))
                    const block = currentPage.blocks.find((b) => b.id === selectedBlockId)
                    if (block) updates.x = block.x + (resizeStart.w - (updates.width || resizeStart.w))
                }
                if (resizeDirection.includes("n")) {
                    updates.height = Math.max(20, Math.round(resizeStart.h - dy))
                    const block = currentPage.blocks.find((b) => b.id === selectedBlockId)
                    if (block) updates.y = block.y + (resizeStart.h - (updates.height || resizeStart.h))
                }
                updateBlock(selectedBlockId, updates)
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [isDragging, isResizing, selectedBlockId, dragOffset, resizeStart, resizeDirection, zoom]
    )

    const handleMouseUp = useCallback(() => {
        setIsDragging(false)
        setIsResizing(false)
    }, [])

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("mouseup", handleMouseUp)
        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mouseup", handleMouseUp)
        }
    }, [handleMouseMove, handleMouseUp])

    return { handleMouseDown, handleResizeDown, isDragging, isResizing }
}
