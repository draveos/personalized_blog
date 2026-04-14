interface NumberInputProps {
    label: string
    value: number
    onChange: (value: number) => void
}

export function NumberInput({ label, value, onChange }: NumberInputProps) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-xs text-muted-foreground">{label}</label>
            <input
                type="number"
                value={Math.round(value)}
                onChange={(e) => onChange(Number(e.target.value))}
                className="px-3 py-1.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/30"
            />
        </div>
    )
}
