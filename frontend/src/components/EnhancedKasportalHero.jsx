import { motion } from "framer-motion";
import { Circle } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";

function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-white/[0.08]",
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: rotate - 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate,
            }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className={cn("absolute", className)}
        >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width,
                    height,
                }}
                className="relative"
            >
                <div
                    className={cn(
                        "absolute inset-0 rounded-full",
                        "bg-gradient-to-r to-transparent",
                        gradient,
                        "backdrop-blur-[2px] border-2 border-white/[0.15]",
                        "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
                        "after:absolute after:inset-0 after:rounded-full",
                        "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
                    )}
                />
            </motion.div>
        </motion.div>
    );
}

function EnhancedKasportalHero() {
    const navigate = useNavigate();

    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay: 0.5 + i * 0.2,
                ease: [0.25, 0.4, 0.25, 1],
            },
        }),
    };

    const logoVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 1.2,
                ease: [0.25, 0.4, 0.25, 1],
            },
        },
    };

    const pulseVariants = {
        pulse: {
            scale: [1, 1.05, 1],
            boxShadow: [
                "0 0 0 0 rgba(20, 184, 166, 0.4)",
                "0 0 0 20px rgba(20, 184, 166, 0)",
                "0 0 0 0 rgba(20, 184, 166, 0)",
            ],
            transition: {
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
            },
        },
    };

    const handleGetStarted = () => {
        navigate("/features/token-swapping");
    };

    const handleLearnMore = () => {
        navigate("/learn");
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/[0.08] via-transparent to-purple-500/[0.08] blur-3xl" />

            <div className="absolute inset-0 overflow-hidden">
                <ElegantShape
                    delay={0.3}
                    width={600}
                    height={140}
                    rotate={12}
                    gradient="from-teal-500/[0.15]"
                    className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
                />

                <ElegantShape
                    delay={0.5}
                    width={500}
                    height={120}
                    rotate={-15}
                    gradient="from-purple-500/[0.15]"
                    className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
                />

                <ElegantShape
                    delay={0.4}
                    width={300}
                    height={80}
                    rotate={-8}
                    gradient="from-violet-500/[0.15]"
                    className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
                />

                <ElegantShape
                    delay={0.6}
                    width={200}
                    height={60}
                    rotate={20}
                    gradient="from-amber-500/[0.15]"
                    className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
                />

                <ElegantShape
                    delay={0.7}
                    width={150}
                    height={40}
                    rotate={-25}
                    gradient="from-cyan-500/[0.15]"
                    className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
                />
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        custom={0}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.1] mb-8 md:mb-12 backdrop-blur-sm"
                    >
                        <Circle className="h-2 w-2 fill-teal-400 text-teal-400" />
                        <span className="text-sm text-white/70 tracking-wide font-medium">
                            Welcome to the Future of Finance
                        </span>
                    </motion.div>

                    <motion.div
                        variants={logoVariants}
                        initial="hidden"
                        animate="visible"
                        className="mb-8"
                    >
                        <motion.div
                            variants={pulseVariants}
                            animate="pulse"
                            className="inline-block bg-gradient-to-r from-teal-500 to-purple-600 p-6 md:p-8 rounded-3xl shadow-2xl border border-white/10 backdrop-blur-sm"
                        >
                            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tight drop-shadow-2xl">
                                Kasportal
                            </h1>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        custom={1}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 tracking-tight leading-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/90">
                                Building the Future of
                            </span>
                            <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-white/95 to-purple-300">
                                Decentralized Finance
                            </span>
                        </h2>
                    </motion.div>

                    <motion.div
                        custom={2}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/60 mb-10 md:mb-12 leading-relaxed font-light tracking-wide max-w-4xl mx-auto px-4">
                            Bridging traditional payment systems with blockchain technology.
                            From Apple Pay to smart contract utilities, we're making crypto
                            accessible to everyone everywhere.
                        </p>
                    </motion.div>

                    <motion.div
                        custom={3}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                    >
                        <button
                            onClick={handleGetStarted}
                            className={cn(
                                "px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105",
                                "bg-gradient-to-r from-teal-500 to-purple-500 text-white shadow-2xl",
                                "hover:shadow-teal-500/25 border border-white/10 backdrop-blur-sm",
                                "focus:outline-none focus:ring-4 focus:ring-teal-500/50"
                            )}
                        >
                            Start Trading Now
                        </button>
                        <button
                            onClick={handleLearnMore}
                            className={cn(
                                "px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105",
                                "border-2 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm",
                                "hover:border-white/40 shadow-lg hover:shadow-xl",
                                "focus:outline-none focus:ring-4 focus:ring-white/20"
                            )}
                        >
                            Learn More
                        </button>
                    </motion.div>
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-gray-900/60 pointer-events-none" />
        </div>
    );
}

export default EnhancedKasportalHero;
