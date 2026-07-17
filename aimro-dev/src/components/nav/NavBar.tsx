import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import NavDropdown from "@/components/nav/NavDropdown";
import type { NavItem } from "@/utils/types";

interface NavBarProps {
    items: NavItem[];
}

export default function NavBar({ items }: NavBarProps) {
    const [activeLabel, setActiveLabel] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const activeItem = items.find((item) => item.label === activeLabel) ?? null;
    const isOpen = Boolean(activeItem);

    const handleClick = (item: NavItem) => {
        if (!item.panels?.length && !item.featured) {
            setActiveLabel(null);
            return;
        }
        setActiveLabel((current) => (current === item.label ? null : item.label));
    };

    useEffect(() => {
        function handleOutsideClick(event: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setActiveLabel(null);
            }
        }

        function handleEscape(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setActiveLabel(null);
            }
        }

        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    return (
        <div ref={containerRef} className="relative hidden md:block">
            <nav className="mt-8">
                <ul className="flex items-center gap-8 text-base font-medium">
                    {items.map((item) => {
                        const isActive = activeLabel === item.label;
                        const hasMenu = Boolean(item.panels?.length || item.featured);

                        return (
                            <li key={item.label} className="relative">
                                <button
                                    type="button"
                                    onClick={() => handleClick(item)}
                                    className={`flex items-center 
                                    gap-2 uppercase 
                                    hover:cursor-pointer
                                    transition-colors 
                                    ${isActive
                                            ? "text-primary" : "hover:text-primary"
                                        }`}
                                    aria-expanded={isActive}
                                    aria-haspopup={hasMenu}
                                >
                                    <span>{item.label}</span>

                                    {hasMenu ? (
                                        <motion.svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="h-3.5 w-3.5"
                                            animate={{ rotate: isActive ? 180 : 0 }}
                                            transition={{ duration: 0.25, ease: "easeOut" }}
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                                                clipRule="evenodd"
                                            />
                                        </motion.svg>
                                    ) : null}
                                </button>

                                {isActive ? (
                                    <motion.div
                                        layoutId="nav-underline"
                                        className="absolute -bottom-1.5 left-0 right-0 h-0.5 
                                        rounded-full bg-primary"
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                    />
                                ) : null}
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <NavDropdown activeItem={activeItem} isOpen={isOpen} />
        </div>
    );
}