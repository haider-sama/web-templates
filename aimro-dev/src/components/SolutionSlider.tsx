import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Slide {
    id: string;
    label: string;
    title: string;
    description: string;
}

interface Props {
    slides: Slide[];
}

export default function SolutionSlider({ slides }: Props) {
    const [paused, setPaused] = useState(false);
    const [active, setActive] = useState(0);
    const [direction, setDirection] = useState<"next" | "prev">("next");

    const slide = slides[active];

    const next = () => {
        setDirection("next");
        setActive((prev) => (prev + 1) % slides.length);
    };

    const previous = () => {
        setDirection("prev");
        setActive((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    useEffect(() => {
        if (paused) return;

        const interval = setInterval(() => {
            setDirection("next");
            setActive((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [paused, slides.length]);

    return (
        <div
            className="overflow-hidden rounded-[2rem] border border-gray-300 bg-secondary"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {/* Timeline */}
            <div className="hidden border-b border-white/10 p-8 md:block">
                <div className="relative">

                    {/* Background line */}
                    <div className="absolute left-0 right-0 top-6 h-px bg-gray-700" />

                    {/* Active progress */}
                    <motion.div
                        className="absolute left-0 top-6 h-px bg-primary"
                        animate={{
                            width: `${(active / (slides.length - 1)) * 100}%`,
                        }}
                        transition={{
                            duration: 0.45,
                            ease: "easeInOut",
                        }}
                    />

                    {/* Timeline Items */}
                    <div className="relative flex justify-between">
                        {slides.map((item, index) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setDirection(index > active ? "next" : "prev");
                                    setActive(index);
                                }}
                                className="group flex w-24 flex-col items-center"
                            >
                                <motion.div
                                    layout
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 30,
                                    }}
                                    className={`
                                            z-10 flex h-12 w-12 items-center justify-center
                                            rounded-full border-2 bg-secondary
                                            font-semibold
                                            ${active >= index
                                            ? "border-primary text-primary"
                                            : `border-gray-600 text-gray-500 
                                                group-hover:border-primary`
                                        }
                                        ${active === index
                                            ? "bg-primary text-gray-400"
                                            : ""
                                        }
                                        `}
                                >
                                    {item.id}
                                </motion.div>

                                <span
                                    className={`
                                    mt-4 text-center text-sm font-medium transition-colors
                                    ${active === index
                                            ? "text-primary"
                                            : "text-gray-400"
                                        }
                                `}
                                >
                                    {item.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="border-b border-white/10 p-4 md:hidden">

                <div className="flex items-center justify-between">
                    <button
                        onClick={previous}
                        className="rounded-full border border-gray-700 px-4 py-2 text-gray-300 transition hover:border-primary hover:text-primary"
                    >
                        ←
                    </button>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                            className="text-center"
                        >
                            <p className="text-primary text-sm font-semibold tracking-[0.2em]">
                                {slide.id} / {slides.length.toString().padStart(2, "0")}
                            </p>

                            <p className="mt-2 font-medium text-gray-300">
                                {slide.label}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    <button
                        onClick={next}
                        className="rounded-full border border-gray-700 px-4 py-2 
                        text-gray-300 transition hover:border-primary hover:text-primary"
                    >
                        →
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-16">
                <span className="text-primary text-sm font-semibold tracking-[0.25em]">
                    {slide.id} / {slides.length.toString().padStart(2, "0")}
                </span>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{
                            opacity: 0,
                            x: direction === "next" ? 80 : -80,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        exit={{
                            opacity: 0,
                            x: direction === "next" ? -80 : 80,
                        }}
                        transition={{
                            duration: 0.45,
                            ease: "easeOut",
                        }}
                    >
                        <h3 className="mt-8 text-5xl font-bold text-gray-200 break-words">
                            {slide.title}
                        </h3>

                        <p className="mt-8 max-w-3xl text-xl leading-9 text-gray-400">
                            {slide.description}
                        </p>
                    </motion.div>
                </AnimatePresence>

            </div>
        </div>
    );
}