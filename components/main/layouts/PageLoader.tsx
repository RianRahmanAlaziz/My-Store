"use client";

import { motion } from "motion/react";

export function PageLoader() {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--background)]/80 backdrop-blur-sm">
            <div className="text-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="mx-auto mb-4 h-16 w-16 rounded-full border-4 border-[var(--border)] border-t-[var(--accent)]"
                />

                <p className="text-[var(--muted-foreground)]">
                    Loading...
                </p>
            </div>
        </div>
    );
}