import type { Variants } from "framer-motion";

export const screenVariants: Variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? "100%" : "-100%",
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: (direction: number) => ({
        x: direction > 0 ? "-100%" : "100%",
        opacity: 0,
        transition: { duration: 0.25, ease: "easeOut" },
    }),
};

export const itemVariants: Variants = {
    hidden: { opacity: 0, y: 8 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.25, ease: "easeOut", delay: i * 0.03 },
    }),
};