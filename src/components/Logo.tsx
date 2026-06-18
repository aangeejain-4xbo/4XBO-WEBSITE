import React from "react";
import { motion } from "motion/react";

interface LogoProps {
  variant?: "horizontal" | "vertical" | "icon-only";
  size?: "sm" | "md" | "lg";
  className?: string;
  isFooter?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = "horizontal",
  size = "md",
  className = "",
}) => {
  const isIconOnly = variant === "icon-only";

  // Full wordmark logo height by size key
  const heightClass = size === "sm" ? "h-7" : size === "lg" ? "h-12" : "h-9 sm:h-10";
  // Square mark height by size key
  const markHeightClass = size === "sm" ? "h-6" : size === "lg" ? "h-10" : "h-8";

  return (
    <motion.div
      className={`inline-flex items-center justify-start cursor-pointer select-none brand ${className}`}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 450, damping: 18 }}
    >
      <img
        src={isIconOnly ? "/logo-mark.png" : "/logo.png"}
        alt="4X BackOffice"
        draggable={false}
        width={isIconOnly ? 457 : 997}
        height={isIconOnly ? 457 : 479}
        className={`w-auto object-contain ${isIconOnly ? markHeightClass : heightClass}`}
      />
    </motion.div>
  );
};
