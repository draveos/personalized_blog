import { useEffect, useRef, useState } from "react"

export function CounterNumber({ end, suffix = "" }: { end: number; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null)
    const [value, setValue] = useState(0)
    const [started, setStarted] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started) {
                    setStarted(true)
                }
            },
            { threshold: 0.5 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [started])

    useEffect(() => {
        if (!started) return
        let frame: number
        const duration = 2000
        const startTime = performance.now()

        const animate = (now: number) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setValue(Math.round(eased * end))
            if (progress < 1) {
                frame = requestAnimationFrame(animate)
            }
        }

        frame = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(frame)
    }, [started, end])

    return (
        <span ref={ref} className="tabular-nums">
      {value.toLocaleString()}
            {suffix}
    </span>
    )
}
