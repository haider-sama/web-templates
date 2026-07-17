import { motion } from "framer-motion";
import type { NavItem } from "@/utils/types";
import { screenVariants, itemVariants } from "@/utils/variants";
import MobileMenuFeaturedCard from "@/components/nav/MobileMenuFeaturedCard";

interface MobileMenuSubScreenProps {
    screen: NavItem;
    direction: number;
    onBack: () => void;
    onNavigate: () => void;
}

export default function MobileMenuSubScreen({
    screen,
    direction,
    onBack,
    onNavigate,
}: MobileMenuSubScreenProps) {
    return (
        <motion.div
            key={screen.label}
            custom={direction}
            variants={screenVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="max-h-[70vh] overflow-y-auto p-8 pt-4"
        >
            <button
                type="button"
                onClick={onBack}
                className="mb-8 gap-2 
                flex items-center 
                text-sm font-medium text-gray-500"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4"
                >
                    <path
                        fillRule="evenodd"
                        d="M12.79 5.23a.75.75 0 010 1.06L9.06 10l3.73 3.71a.75.75 0 11-1.06 1.06l-4.24-4.24a.75.75 0 010-1.06l4.24-4.24a.75.75 0 011.06 0z"
                        clipRule="evenodd"
                    />
                </svg>
                Back
            </button>

            <h2 className="mb-8 text-base font-semibold uppercase tracking-widest 
            text-gray-500">
                {screen.label}
            </h2>

            <div className="flex flex-col gap-8">
                {screen.panels?.map((panel) => (
                    <div key={panel.heading}>
                        <h3 className="mb-2 text-sm font-semibold uppercase 
                        tracking-widest text-gray-500">
                            {panel.heading}
                        </h3>
                        <ul className="flex flex-col gap-2">
                            {panel.items.map((link, i) => (
                                <motion.li
                                    key={link.title}
                                    custom={i}
                                    variants={itemVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <a
                                        href={link.href}
                                        onClick={onNavigate}
                                        className="block rounded p-3 text-base 
                                        font-medium text-gray-700 transition-colors 
                                        hover:bg-gray-100 hover:text-gray-900"
                                    >
                                        {link.title}
                                        {link.description ? (
                                            <span className="mt-0.5 block text-sm 
                                            font-normal leading-snug text-gray-400">
                                                {link.description}
                                            </span>
                                        ) : null}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                ))}

                {screen.featured ? (
                    <MobileMenuFeaturedCard featured={screen.featured} onNavigate={onNavigate} />
                ) : null}
            </div>
        </motion.div>
    );
}