import React from 'react';

const GlassmorphicCard = ({
    children,
    className = '',
    hover = true,
    glow = true,
    padding = 'p-8',
    borderRadius = 'rounded-3xl',
    background = 'bg-white/5',
    border = 'border border-blue-400/20',
    backdropBlur = 'backdrop-blur-lg',
    hoverTransform = 'hover:scale-105',
    hoverBorder = 'hover:border-blue-400/40',
    hoverBackground = 'hover:bg-white/10',
    glowColor = 'rgba(74, 158, 255, 0.3)',
    animationDelay = '0s',
    onClick,
    style = {}
}) => {
    const baseClasses = `
        ${background}
        ${border}
        ${borderRadius}
        ${padding}
        ${backdropBlur}
        transition-all
        duration-500
        ease-out
        ${hover ? `${hoverTransform} ${hoverBorder} ${hoverBackground}` : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
    `.trim().replace(/\s+/g, ' ');

    const cardStyle = {
        animationDelay,
        ...style
    };

    const handleClick = (e) => {
        if (onClick) {
            onClick(e);
        }
    };

    return (
        <div
            className={baseClasses}
            style={cardStyle}
            onClick={handleClick}
        >
            {glow && (
                <div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                        background: `radial-gradient(circle at center, ${glowColor}, transparent 70%)`,
                        filter: 'blur(20px)',
                        zIndex: -1
                    }}
                />
            )}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

// Preset variations
export const FeatureGlassCard = ({ children, ...props }) => (
    <GlassmorphicCard
        background="bg-white/3"
        border="border border-blue-400/20"
        hoverBorder="hover:border-blue-400/50"
        hoverBackground="hover:bg-white/5"
        hoverTransform="hover:scale-105 hover:-translate-y-2"
        className="group"
        {...props}
    >
        {children}
    </GlassmorphicCard>
);

export const PaymentGlassCard = ({ children, ...props }) => (
    <GlassmorphicCard
        background="bg-white/5"
        border="border border-blue-400/30"
        hoverBorder="hover:border-blue-400/60"
        hoverBackground="hover:bg-white/8"
        hoverTransform="hover:scale-110"
        glowColor="rgba(74, 158, 255, 0.4)"
        className="group text-center"
        {...props}
    >
        {children}
    </GlassmorphicCard>
);

export const RoadmapGlassCard = ({ children, ...props }) => (
    <GlassmorphicCard
        background="bg-white/4"
        border="border border-blue-400/25"
        hoverBorder="hover:border-blue-400/50"
        hoverBackground="hover:bg-white/6"
        hoverTransform="hover:scale-105"
        glowColor="rgba(74, 158, 255, 0.25)"
        className="group"
        {...props}
    >
        {children}
    </GlassmorphicCard>
);

export const ContactGlassCard = ({ children, ...props }) => (
    <GlassmorphicCard
        background="bg-white/3"
        border="border border-blue-400/20"
        hoverBorder="hover:border-blue-400/50"
        hoverBackground="hover:bg-white/5"
        hoverTransform="hover:scale-105"
        glowColor="rgba(74, 158, 255, 0.3)"
        className="group cursor-pointer"
        {...props}
    >
        {children}
    </GlassmorphicCard>
);

export default GlassmorphicCard;
