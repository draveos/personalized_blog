"use client";

import RippleCard from "./RippleCard";

const images = [
    { url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe", title: "Abstract Flow" },
    { url: "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43", title: "Digital Ocean" },
    { url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853", title: "Neon Pulse" },
    { url: "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b", title: "Deep Space" },
];

export default function InteractiveGallery() {
    return (
        <section className="py-24 px-10 bg-black">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {images.map((img, i) => (
                    <RippleCard key={i} url={img.url} title={img.title} />
                ))}
            </div>
        </section>
    );
}