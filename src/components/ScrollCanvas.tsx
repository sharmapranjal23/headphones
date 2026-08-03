"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll } from "framer-motion";

export default function ScrollCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({ w: 0, h: 0 });

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    useEffect(() => {
        const handleResize = () => {
            if (typeof window !== "undefined") {
                setSize({ w: window.innerWidth, h: window.innerHeight });
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // We use a high pixel ratio for retina displays
        const dpr = window.devicePixelRatio || 1;
        canvas.width = size.w * dpr;
        canvas.height = size.h * dpr;
        ctx.scale(dpr, dpr);

        let animationFrameId: number;

        const render = () => {
            const progress = scrollYProgress.get();
            // progress goes from 0 to 1 as the user scrolls

            ctx.clearRect(0, 0, size.w, size.h);
            const cx = size.w / 2;
            const cy = size.h / 2;

            // Base drawing functions
            const drawPart = (
                drawFn: () => void,
                xOff: number, yOff: number,
                scale: number = 1, rotation: number = 0, alpha: number = 1
            ) => {
                ctx.save();
                ctx.translate(cx + xOff, cy + yOff);
                ctx.rotate(rotation);
                ctx.scale(scale, scale);
                ctx.globalAlpha = alpha;
                drawFn();
                ctx.restore();
            };

            // Styles
            const rimLightOpts = { blur: 15, color: "rgba(255, 255, 255, 0.15)" };

            // Helper to apply rim lighting
            const applyShadow = (blur: number, color: string) => {
                ctx.shadowBlur = blur;
                ctx.shadowColor = color;
            };

            const drawHeadband = () => {
                ctx.beginPath();
                ctx.arc(0, 40, 160, Math.PI + 0.2, -0.2, false);
                ctx.lineWidth = 35;
                ctx.lineCap = "round";
                const grad = ctx.createLinearGradient(0, -120, 0, 40);
                grad.addColorStop(0, "#1F1F1F");
                grad.addColorStop(1, "#0A0A0A");
                ctx.strokeStyle = grad;
                applyShadow(20, "rgba(0, 214, 255, 0.1)");
                ctx.stroke();

                // Inner rim light
                ctx.beginPath();
                ctx.arc(0, 40, 142.5, Math.PI + 0.2, -0.2, false);
                ctx.lineWidth = 2;
                ctx.strokeStyle = "rgba(255,255,255,0.2)";
                ctx.stroke();
            };

            const drawEarCup = () => {
                ctx.beginPath();
                ctx.roundRect(-45, -70, 90, 140, 45); // w:90, h:140, r:45
                const grad = ctx.createRadialGradient(20, -20, 10, 0, 0, 100);
                grad.addColorStop(0, "#2A2A2A");
                grad.addColorStop(1, "#080808");
                ctx.fillStyle = grad;
                applyShadow(rimLightOpts.blur, rimLightOpts.color);
                ctx.fill();

                // Edge reflection
                ctx.lineWidth = 2;
                ctx.strokeStyle = "rgba(0, 214, 255, 0.3)";
                ctx.stroke();

                ctx.shadowBlur = 0; // reset
            };

            const drawCushion = () => {
                ctx.beginPath();
                ctx.roundRect(-40, -80, 80, 160, 40);
                ctx.fillStyle = "#030303";
                ctx.fill();
                ctx.lineWidth = 8;
                ctx.strokeStyle = "#111"; // deep black leather
                ctx.stroke();
            };

            const drawDriver = () => {
                // Complex inner tech
                ctx.beginPath();
                ctx.arc(0, 0, 35, 0, Math.PI * 2);
                ctx.fillStyle = "#0A0A0A";
                ctx.fill();
                ctx.lineWidth = 2;
                ctx.strokeStyle = "#00D6FF";
                applyShadow(15, "#00D6FF");
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(0, 0, 20, 0, Math.PI * 2);
                ctx.fillStyle = "#111";
                ctx.fill();
                ctx.strokeStyle = "#333";
                ctx.stroke();
                ctx.shadowBlur = 0; // reset

                // Microphones array (4 dots)
                for (let i = 0; i < 4; i++) {
                    const angle = (Math.PI * 2 / 4) * i;
                    ctx.beginPath();
                    ctx.arc(Math.cos(angle) * 25, Math.sin(angle) * 25, 3, 0, Math.PI * 2);
                    ctx.fillStyle = "#0050FF";
                    ctx.fill();
                }
            };

            // ANIMATION LOGIC (SCROLL-BASED)
            // Stages:
            // 0.0 - 0.15 : Assembled hero pose.
            // 0.15 - 0.40 : Explosion begins. (Ear cups widen, headband lifts up)
            // 0.40 - 0.65 : Full explosion. (Cushions separate, drivers visible)
            // 0.65 - 0.85 : Peak explosion, focus on tech (Scale increases, rotation applied)
            // 0.85 - 1.0 : Reassembly to hero pose.

            let hbY = -50;
            let leftCupX = -135;
            let rightCupX = 135;
            let leftCushionX = -105;
            let rightCushionX = 105;

            let driverAlpha = 0;
            let extScale = 1;

            if (progress > 0.15 && progress <= 0.4) {
                const p = (progress - 0.15) / 0.25;
                // easing
                const ease = p * p;
                hbY = -50 - (ease * 100);
                leftCupX = -135 - (ease * 180);
                rightCupX = 135 + (ease * 180);
                leftCushionX = -105 - (ease * 80);
                rightCushionX = 105 + (ease * 80);
                driverAlpha = ease * 0.5;
                extScale = 1 + (ease * 0.1);
            } else if (progress > 0.4 && progress <= 0.65) {
                const p = (progress - 0.4) / 0.25;
                hbY = -150 - (p * 50);
                leftCupX = -315 - (p * 80);
                rightCupX = 315 + (p * 80);
                leftCushionX = -185 - (p * 50);
                rightCushionX = 185 + (p * 50);
                driverAlpha = 0.5 + (p * 0.5);
                extScale = 1.1 + (p * 0.2);
            } else if (progress > 0.65 && progress <= 0.85) {
                const p = (progress - 0.65) / 0.2;
                hbY = -200 + (p * 20); // starts returning slightly
                leftCupX = -395 + (p * 100);
                rightCupX = 395 - (p * 100);
                leftCushionX = -235 + (p * 50);
                rightCushionX = 235 - (p * 50);
                driverAlpha = 1;
                extScale = 1.3 - (p * 0.1);
            } else if (progress > 0.85) {
                const p = (progress - 0.85) / 0.15;
                const ease = 1 - Math.pow(1 - p, 3); // ease out cubic
                hbY = -180 + (ease * 130);
                leftCupX = -295 + (ease * 160);
                rightCupX = 295 - (ease * 160);
                leftCushionX = -185 + (ease * 80);
                rightCushionX = 185 - (ease * 80);
                driverAlpha = 1 - ease;
                extScale = 1.2 - (ease * 0.2);
            }

            ctx.save();
            // Apply base tilt to look cinematic
            ctx.translate(cx, cy);
            // Gentle floating effect based on progress and time
            const timeOffset = Date.now() / 2000;
            ctx.translate(0, Math.sin(timeOffset) * 10);

            // Global scale for responsiveness and zoom-in effect
            const mobileScale = size.w < 768 ? 0.6 : 1;
            ctx.scale(extScale * mobileScale, extScale * mobileScale);
            ctx.translate(-cx, -cy);

            // 1. Draw Headband
            drawPart(drawHeadband, 0, hbY, 1, 0, 1);

            // 2. Draw Drivers (Inner tech)
            // Left Driver
            drawPart(drawDriver, leftCushionX - 25, 60, 1, 0, driverAlpha);
            // Right Driver
            drawPart(drawDriver, rightCushionX + 25, 60, 1, 0, driverAlpha);

            // 3. Draw Cushions
            drawPart(drawCushion, leftCushionX, 60, 1, 0.1, 1);
            drawPart(drawCushion, rightCushionX, 60, 1, -0.1, 1);

            // 4. Draw Ear Cups
            drawPart(() => drawEarCup(), leftCupX, 60, 1.2, 0.15, 1);
            drawPart(() => drawEarCup(), rightCupX, 60, 1.2, -0.15, 1);

            ctx.restore();

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => cancelAnimationFrame(animationFrameId);
    }, [scrollYProgress, size]);

    return (
        <div ref={containerRef} className="relative w-full h-full">
            <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#050505]">
                <canvas ref={canvasRef} className="w-full h-full block" />

                {/* We use subtle radial gradients overlays behind everything 
                    to blend the canvas and the UI perfectly */}
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,10,25,0.4)_0%,#050505_100%)] mix-blend-screen" />
            </div>
        </div>
    );
}
