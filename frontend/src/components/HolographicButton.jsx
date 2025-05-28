import React, { useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

const HolographicButton = React.forwardRef(
  (
    {
      children,
      className,
      variant = "default",
      size = "default",
      icon,
      glowColor = "var(--quantum-cyan)",
      particleColors = ["var(--quantum-cyan)", "var(--quantum-indigo)"],
      ...props
    },
    ref,
  ) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <Button
        ref={ref}
        className={cn(
          "relative overflow-hidden transition-all duration-300",
          "border border-border/30 backdrop-blur-sm",
          "shadow-[0_0_15px_rgba(0,0,0,0.1)]",
          {
            "bg-background/30 text-foreground hover:bg-background/50 border border-quantum-cyan/30":
              variant === "default",
            "bg-transparent border border-border/50 hover:bg-background/10":
              variant === "outline",
            "bg-transparent hover:bg-background/10": variant === "ghost",
            "h-10 px-4 py-2 text-sm": size === "default",
            "h-9 px-3 py-1 text-xs": size === "sm",
            "h-12 px-6 py-3 text-base": size === "lg",
          },
          isHovered && `shadow-[0_0_15px_${glowColor}]`,
          className,
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">
          {icon}
          {children}
        </span>
        <div
          className={cn(
            "absolute inset-0 opacity-0 transition-opacity duration-300",
            isHovered && "opacity-20",
          )}
          style={{
            background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`,
          }}
        />
        <div
          className={cn(
            "absolute inset-0 opacity-0 transition-opacity duration-300",
            isHovered && "opacity-30",
          )}
          style={{
            background: `linear-gradient(90deg, transparent, ${glowColor}40, transparent)`,
            backgroundSize: "200% 100%",
            animation: isHovered ? "shimmer 1.5s infinite" : "none",
          }}
        />
        <style jsx>{`
          @keyframes shimmer {
            0% {
              background-position: 200% 0;
            }
            100% {
              background-position: -200% 0;
            }
          }
        `}</style>
      </Button>
    );
  },
);

HolographicButton.displayName = "HolographicButton";

export { HolographicButton };
