import { motion } from "motion/react";

export function Loading() {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary via-primary/95 to-accent"
        >
            <div className="text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <div className="relative inline-block">
                        <motion.div
                            animate={{
                                rotate: 360,
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            className="w-24 h-24 border-4 border-white/20 rounded-full border-t-white"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center">
                                <span className="text-3xl font-bold text-white">S</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <h1 className="text-4xl font-bold text-white mb-2">StepHub</h1>
                    <p className="text-white/80 text-lg mb-8">Shoes Store</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="flex gap-2 justify-center"
                >
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            animate={{
                                y: [0, -10, 0],
                            }}
                            transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: i * 0.1,
                            }}
                            className="w-2 h-2 bg-white rounded-full"
                        />
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
}
