import { AnimatePresence, motion } from "framer-motion";
import type { NavItem } from "@/utils/types";
import type { Variants } from "framer-motion";

interface NavDropdownProps {
    activeItem: NavItem | null;
    isOpen: boolean;
}

const containerVariants: Variants = {
    hidden: { opacity: 0, y: -8 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
        opacity: 0,
        y: -8,
        transition: { duration: 0.25, ease: "easeOut" },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: -6 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.25, ease: "easeOut", delay: i * 0.03 },
    }),
};

function DropdownLink({
    href,
    title,
    description,
    index,
}: {
    href: string;
    title: string;
    description?: string;
    index: number;
}) {
    return (
        <motion.a
            href={href}
            custom={index}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="group flex flex-col 
            rounded 
            px-4 py-2 
            transition-colors"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
        >
            <span className="text-sm font-medium text-secondary 
            transition-colors group-hover:text-primary">
                {title}
            </span>
            {description ? (
                <span className="mt-1 text-sm leading-snug text-gray-400">
                    {description}
                </span>
            ) : null}
        </motion.a>
    );
}

export default function NavDropdown({ activeItem, isOpen }: NavDropdownProps) {
    return (
        <AnimatePresence mode="wait">
            {isOpen && activeItem && (activeItem.panels?.length || activeItem.featured) ? (
                <motion.div
                    key="dropdown-panel"
                    layout
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={containerVariants}
                    className="absolute left-0 right-0 top-full z-10 flex justify-center px-8"
                >
                    <motion.div
                        layout
                        className="mt-4 w-full max-w-6xl 
                        overflow-hidden rounded
                        bg-white
                        border border-gray-200 
                        shadow-sm"
                    >
                        <motion.div layout="position" className="p-12">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeItem.label}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                    className="grid grid-cols-1 gap-12 md:grid-cols-4"
                                >
                                    {activeItem.panels?.map((panel) => (
                                        <div key={panel.heading} className="flex flex-col">
                                            <h3 className="mb-2 text-xs font-semibold uppercase 
                                            tracking-widest text-gray-500">
                                                {panel.heading}
                                            </h3>
                                            <div className="flex flex-col gap-2">
                                                {panel.items.map((item, i) => (
                                                    <DropdownLink
                                                        key={item.title}
                                                        href={item.href}
                                                        title={item.title}
                                                        description={item.description}
                                                        index={i}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))}

                                    {activeItem.featured ? (
                                        <motion.a
                                            href={activeItem.featured.href}
                                            initial={{ opacity: 0, y: -6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, ease: "easeOut" }}
                                            className="group relative 
                                            flex flex-col justify-between 
                                            overflow-hidden rounded-xl 
                                            border border-primary/40 
                                            bg-gradient-to-br from-primary/10 via-white to-white
                                            p-4"
                                        >
                                            <div>
                                                <h4 className="text-base 
                                                font-semibold 
                                                text-secondary transition-colors 
                                                group-hover:text-primary">
                                                    {activeItem.featured.title}
                                                </h4>
                                                <p className="mt-2 text-sm leading-snug text-gray-400">
                                                    {activeItem.featured.description}
                                                </p>
                                            </div>
                                            <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary transition-transform group-hover:translate-x-1">
                                                Learn more
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    className="h-4 w-4"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M3 10a.75.75 0 01.75-.75h10.638L11.29 6.15a.75.75 0 111.02-1.1l5 4.65a.75.75 0 010 1.1l-5 4.65a.75.75 0 11-1.02-1.1l3.098-3.1H3.75A.75.75 0 013 10z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                        </motion.a>
                                    ) : null}
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}