import { motion } from "framer-motion";
import type { NavItem } from "@/utils/types";
import { screenVariants, itemVariants } from "@/utils/variants";

interface MobileMenuRootScreenProps {
    items: NavItem[];
    direction: number;
    onDrillInto: (item: NavItem) => void;
    onNavigate: () => void;
}

export default function MobileMenuRootScreen({
    items,
    direction,
    onDrillInto,
    onNavigate,
}: MobileMenuRootScreenProps) {
    return (
        <motion.div
            key="root"
            custom={direction}
            variants={screenVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="max-h-[70vh] overflow-y-auto p-8 pt-4"
        >
            <ul className="flex flex-col gap-1 text-lg font-medium">
                {items.map((item, i) => {
                    const hasChildren = Boolean(item.panels?.length || item.featured);

                    return (
                        <motion.li
                            key={item.label}
                            custom={i}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {hasChildren ? (
                                <button
                                    type="button"
                                    onClick={() => onDrillInto(item)}
                                    className="flex w-full items-center justify-between 
                                    rounded p-4 text-left text-gray-700 
                                    transition-colors hover:bg-gray-100 hover:text-gray-900"
                                >
                                    <span className="uppercase tracking-wide">{item.label}</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="h-4 w-4 text-gray-400"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.21 14.77a.75.75 0 01.02-1.06L10.94 10 7.23 6.29a.75.75 0 111.06-1.06l4.24 4.24a.75.75 0 010 1.06l-4.24 4.24a.75.75 0 01-1.08-.02z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            ) : (
                                <a
                                    href={item.href}
                                    onClick={onNavigate}
                                    className="block rounded p-4 uppercase tracking-wide 
                                    text-gray-700 transition-colors hover:bg-gray-100 
                                    hover:text-gray-900"
                                >
                                    {item.label}
                                </a>
                            )}
                        </motion.li>
                    );
                })}
            </ul>
        </motion.div>
    );
}