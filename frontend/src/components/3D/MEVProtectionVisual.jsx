export default function MEVProtectionVisual() {
    return (
        <section className="py-20">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent mb-4">
                    MEV Protection
                </h2>
                <p className="text-xl text-gray-200/90 max-w-3xl mx-auto">
                    Your trades are protected from front-running and sandwich attacks
                </p>
            </div>

            <div className="flex justify-center">
                <div className="relative w-[400px] h-[400px] bg-gradient-to-b from-red-500/10 to-black/70 rounded-3xl flex flex-col items-center justify-center overflow-hidden">
                    {/* Attack lines */}
                    <div className="absolute inset-0">
                        {[0, 1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="attack-line absolute w-0.5 h-[100px] bg-gradient-to-b from-transparent via-red-500 to-transparent opacity-0"
                                style={{
                                    left: `${20 + i * 20}%`,
                                    animation: `attack 3s infinite`,
                                    animationDelay: `${i * 0.5}s`
                                }}
                            />
                        ))}
                    </div>

                    {/* Shield */}
                    <div className="shield w-[150px] h-[180px] bg-gradient-to-br from-teal-500 to-purple-500 flex items-center justify-center mb-8 relative z-10"
                        style={{
                            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                        }}>
                        <span className="text-6xl text-white font-bold">✓</span>
                    </div>

                    <div className="text-3xl font-bold mb-4 relative z-10">MEV Protected</div>
                    <div className="text-lg text-gray-300 text-center relative z-10 px-8">
                        No Front-Running. No Sandwich Attacks.<br />Just Fair Trading.
                    </div>
                </div>
            </div>
        </section>
    );
}
