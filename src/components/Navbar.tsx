"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
    const { scrollY } = useScroll();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Fade in the navbar after a slight scroll
    const opacity = useTransform(scrollY, [0, 100], [0, 1]);
    const y = useTransform(scrollY, [0, 100], [-20, 0]);

    if (!isMounted) return null;

    return (
        <motion.nav
            style={{ opacity, y }}
            className="fixed top-0 left-0 right-0 z-50 glass-nav h-14 px-6 md:px-12 flex items-center justify-between pointer-events-auto"
        >
            <div className="flex-1">
                <Link href="/" className="text-white/90 font-medium tracking-tight text-lg hover:text-white transition-colors">
                    WH‑1000XM6
                </Link>
            </div>

            <div className="hidden md:flex flex-1 justify-center space-x-8 text-sm">
                {["Overview", "Technology", "Noise Cancelling", "Specs"].map((item) => (
                    <Link
                        key={item}
                        href={`#${item.toLowerCase().replace(" ", "-")}`}
                        className="text-white/70 hover:text-white transition-colors tracking-wide"
                    >
                        {item}
                    </Link>
                ))}
            </div>

            <div className="flex-1 flex justify-end items-center space-x-6">
                <div className="hidden md:block text-sm text-white/70 hover:text-white transition-colors cursor-pointer">
                    Buy
                </div>
                <button className="relative group px-4 py-1.5 rounded-full overflow-hidden inline-flex items-center gap-2">
                    <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors rounded-full" />
                    <div className="absolute inset-0 rounded-full border border-white/20 group-hover:border-[#00D6FF]/50 transition-colors" />
                    <span className="relative text-sm font-medium text-white/90 group-hover:text-white">Experience</span>
                </button>
            </div>
        </motion.nav>
    );
}
