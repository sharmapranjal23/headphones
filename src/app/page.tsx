"use client";

import ScrollCanvas from "@/components/ScrollCanvas";
import { motion } from "framer-motion";

export default function Home() {
    return (
        <main className="relative bg-[#050505]">

            {/* The ScrollCanvas sets up a 400vh container and sticky canvas inside. */}
            {/* Absolute container to overlay text synchronously with the scroll. */}
            <div className="relative w-full h-[400vh]">
                <ScrollCanvas />

                <div className="absolute top-0 left-0 w-full h-[400vh] z-10 text-white pointer-events-none flex flex-col justify-between">

                    {/* SECTION 1: HERO (0 - 15%) ~ top of 0vh */}
                    <section className="h-screen flex flex-col items-center justify-center text-center px-6 pointer-events-auto">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            viewport={{ once: false, amount: 0.5 }}
                            className="text-5xl md:text-7xl font-bold tracking-tighter mb-4"
                        >
                            Sony WH-1000XM6
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.3 }}
                            viewport={{ once: false, amount: 0.5 }}
                            className="text-2xl md:text-3xl font-medium tracking-tight text-white/90 mb-6 text-glow"
                        >
                            Silence, perfected.
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            viewport={{ once: false, amount: 0.5 }}
                            className="text-white/60 max-w-lg md:text-lg"
                        >
                            Flagship wireless noise cancelling, re-engineered for a world that never stops.
                        </motion.p>
                    </section>

                    {/* SECTION 2: ENGINEERING REVEAL (15% - 40%) ~ near 100vh */}
                    <section className="h-screen flex items-center justify-start px-6 md:px-24 pointer-events-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ margin: "-200px" }}
                            transition={{ duration: 0.8 }}
                            className="max-w-md"
                        >
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 gradient-text">
                                Precision-engineered<br />for silence.
                            </h2>
                            <p className="text-white/60 text-lg mb-4 leading-relaxed">
                                Custom drivers, sealed acoustic chambers, and optimized airflow deliver studio-grade clarity.
                            </p>
                            <p className="text-white/60 text-lg leading-relaxed">
                                Every component is tuned for balance, power, and comfort—hour after hour.
                            </p>
                        </motion.div>
                    </section>

                    {/* SECTION 3: NOISE CANCELLING (40% - 65%) ~ near 200vh */}
                    <section className="h-screen flex items-center justify-end px-6 md:px-24 pointer-events-auto">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ margin: "-200px" }}
                            transition={{ duration: 0.8 }}
                            className="max-w-md text-right flex flex-col items-end"
                        >
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 gradient-text">
                                Adaptive noise cancelling,<br />redefined.
                            </h2>
                            <ul className="text-white/60 text-lg space-y-4 text-right list-none">
                                <li>Multi-microphone array listens in every direction.</li>
                                <li>Real-time noise analysis adjusts to your environment.</li>
                                <li>Your music stays pure—planes, trains, and crowds fade away.</li>
                            </ul>
                        </motion.div>
                    </section>

                    {/* SECTION 4: SOUND & UPSCALING (65% - 85%) ~ near 300vh */}
                    <section className="h-screen flex items-center justify-start px-6 md:px-24 pointer-events-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ margin: "-200px" }}
                            transition={{ duration: 0.8 }}
                            className="max-w-md bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white/90">
                                Immersive,<br />lifelike sound.
                            </h2>
                            <p className="text-white/60 mb-4 leading-relaxed">
                                High-performance drivers unlock detail, depth, and texture in every track.
                            </p>
                            <p className="text-white/60 leading-relaxed">
                                AI-enhanced upscaling restores clarity to compressed audio, so every note feels alive.
                            </p>
                        </motion.div>
                    </section>

                </div>
            </div>

            {/* FINAL SECTION (Reassembly and CTA 85-100%) */}
            {/* Placed naturally after the 400vh block */}
            <section className="relative h-screen bg-[#050505] flex flex-col items-center justify-center text-center px-6 z-20 overflow-hidden">

                {/* Subtle radial glow to tie it back */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,80,255,0.08)_0%,#050505_70%)] pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1 }}
                    className="relative z-10"
                >
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-white">
                        Hear everything.<br />Feel nothing else.
                    </h2>
                    <p className="text-xl text-white/60 mb-10">
                        WH-1000XM6. Designed for focus, crafted for comfort.
                    </p>
                    <div className="flex flex-col md:flex-row items-center gap-6 justify-center">
                        <button className="px-8 py-4 rounded-full gradient-primary text-white font-medium text-lg hover:shadow-[0_0_30px_rgba(0,214,255,0.4)] transition-all">
                            Experience WH-1000XM6
                        </button>
                        <a href="#" className="text-white/70 hover:text-white transition-colors underline underline-offset-4 decoration-white/20">
                            See full specs
                        </a>
                    </div>
                    <p className="text-sm text-white/40 mt-12">
                        Engineered for airports, offices, and everything in between.
                    </p>
                </motion.div>
            </section>

        </main>
    );
}
