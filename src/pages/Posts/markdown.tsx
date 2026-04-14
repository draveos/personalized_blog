import { Fragment, type ReactNode } from "react";

type Block =
    | { kind: "h2"; text: string }
    | { kind: "h3"; text: string }
    | { kind: "p"; text: string }
    | { kind: "ul"; items: string[] }
    | { kind: "ol"; items: string[] }
    | { kind: "code"; lang: string; text: string };

function parseBlocks(md: string): Block[] {
    const lines = md.replace(/\r\n/g, "\n").split("\n");
    const blocks: Block[] = [];
    let i = 0;
    while (i < lines.length) {
        const line = lines[i];
        if (line.startsWith("```")) {
            const lang = line.slice(3).trim();
            const buf: string[] = [];
            i++;
            while (i < lines.length && !lines[i].startsWith("```")) {
                buf.push(lines[i]);
                i++;
            }
            i++;
            blocks.push({ kind: "code", lang, text: buf.join("\n") });
            continue;
        }
        if (line.startsWith("### ")) {
            blocks.push({ kind: "h3", text: line.slice(4) });
            i++;
            continue;
        }
        if (line.startsWith("## ")) {
            blocks.push({ kind: "h2", text: line.slice(3) });
            i++;
            continue;
        }
        if (/^\s*$/.test(line)) {
            i++;
            continue;
        }
        if (/^-\s+/.test(line)) {
            const items: string[] = [];
            while (i < lines.length && /^-\s+/.test(lines[i])) {
                items.push(lines[i].replace(/^-\s+/, ""));
                i++;
            }
            blocks.push({ kind: "ul", items });
            continue;
        }
        if (/^\d+\.\s+/.test(line)) {
            const items: string[] = [];
            while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
                items.push(lines[i].replace(/^\d+\.\s+/, ""));
                i++;
            }
            blocks.push({ kind: "ol", items });
            continue;
        }
        const paraBuf: string[] = [line];
        i++;
        while (i < lines.length && !/^\s*$/.test(lines[i]) && !lines[i].startsWith("#") && !lines[i].startsWith("```") && !/^(-|\d+\.)\s+/.test(lines[i])) {
            paraBuf.push(lines[i]);
            i++;
        }
        blocks.push({ kind: "p", text: paraBuf.join(" ") });
    }
    return blocks;
}

function renderInline(text: string): ReactNode[] {
    const nodes: ReactNode[] = [];
    const pattern = /(\*\*[^*]+\*\*|`[^`]+`)/g;
    let last = 0;
    let key = 0;
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(text)) !== null) {
        if (match.index > last) nodes.push(<Fragment key={key++}>{text.slice(last, match.index)}</Fragment>);
        const token = match[0];
        if (token.startsWith("**")) {
            nodes.push(<strong key={key++} className="font-semibold text-white">{token.slice(2, -2)}</strong>);
        } else {
            nodes.push(
                <code key={key++} className="px-1.5 py-0.5 rounded-md bg-white/10 text-[0.9em] font-mono text-white/90">
                    {token.slice(1, -1)}
                </code>,
            );
        }
        last = match.index + token.length;
    }
    if (last < text.length) nodes.push(<Fragment key={key++}>{text.slice(last)}</Fragment>);
    return nodes;
}

interface MarkdownProps {
    source: string;
}

export function Markdown({ source }: MarkdownProps) {
    const blocks = parseBlocks(source);
    return (
        <div className="flex flex-col gap-6 text-[17px] leading-[1.75] text-white/75">
            {blocks.map((block, idx) => {
                switch (block.kind) {
                    case "h2":
                        return (
                            <h2
                                key={idx}
                                className="mt-8 text-2xl md:text-3xl font-semibold tracking-tight text-white"
                            >
                                {renderInline(block.text)}
                            </h2>
                        );
                    case "h3":
                        return (
                            <h3
                                key={idx}
                                className="mt-4 text-xl font-semibold tracking-tight text-white"
                            >
                                {renderInline(block.text)}
                            </h3>
                        );
                    case "p":
                        return <p key={idx}>{renderInline(block.text)}</p>;
                    case "ul":
                        return (
                            <ul key={idx} className="flex flex-col gap-2 pl-5 list-disc marker:text-white/30">
                                {block.items.map((item, j) => (
                                    <li key={j}>{renderInline(item)}</li>
                                ))}
                            </ul>
                        );
                    case "ol":
                        return (
                            <ol key={idx} className="flex flex-col gap-2 pl-5 list-decimal marker:text-white/40 marker:font-mono marker:text-sm">
                                {block.items.map((item, j) => (
                                    <li key={j}>{renderInline(item)}</li>
                                ))}
                            </ol>
                        );
                    case "code":
                        return (
                            <pre
                                key={idx}
                                className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-[13px] leading-relaxed font-mono text-white/85"
                            >
                                <code>{block.text}</code>
                            </pre>
                        );
                    default:
                        return null;
                }
            })}
        </div>
    );
}
