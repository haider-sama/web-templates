import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { NavItem } from "@/utils/types";
import MobileMenuButton from "@/components/nav/MobileMenuButton";
import MobileMenuRootScreen from "@/components/nav/MobileMenuRootScreen";
import MobileMenuSubScreen from "@/components/nav/MobileMenuSubScreen";

interface MobileMenuProps {
    items: NavItem[];
}

// Drill-down stack: null = root list, otherwise the NavItem currently
// expanded into its own "screen" (like iOS Settings navigation).
type Screen = NavItem | null;

export default function MobileMenu({ items }: MobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [screen, setScreen] = useState<Screen>(null);
    const [direction, setDirection] = useState(1);
    const sheetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";

        const handleKeydown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                screen ? goBack() : setIsOpen(false);
            }
        };

        document.addEventListener("keydown", handleKeydown);

        return () => {
            document.removeEventListener("keydown", handleKeydown);
            document.body.style.overflow = "";
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, screen]);

    const closeMenu = () => {
        setIsOpen(false);
        // Reset back to root after the sheet has slid away
        setTimeout(() => setScreen(null), 300);
    };

    const drillInto = (item: NavItem) => {
        setDirection(1);
        setScreen(item);
    };

    const goBack = () => {
        setDirection(-1);
        setScreen(null);
    };

    return (
        <>
            <MobileMenuButton isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)} />

            {/* Backdrop */}
            <div
                onClick={closeMenu}
                className={`fixed inset-0 z-40 
                    bg-black/40
                    transition-opacity duration-300 
                    md:hidden 
                    ${isOpen
                        ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
                    }`}
            />

            {/* Bottom Sheet */}
            <div
                id="mobile-sheet"
                ref={sheetRef}
                className={`fixed inset-x-0 bottom-0 
                    z-50 
                    border-t border-gray-200 
                    bg-white shadow-sm 
                    transition-transform duration-300 
                    ease-out md:hidden 
                    ${isOpen ? "translate-y-0" : "translate-y-full"}`}
            >
                <div className="mx-auto mt-2 h-2 w-16 rounded-full bg-gray-300" />

                {/* Fixed-height viewport so root/sub screens can slide past each other */}
                <div className="relative max-h-[70vh] overflow-hidden">
                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                        {screen === null ? (
                            <MobileMenuRootScreen
                                items={items}
                                direction={direction}
                                onDrillInto={drillInto}
                                onNavigate={closeMenu}
                            />
                        ) : (
                            <MobileMenuSubScreen
                                screen={screen}
                                direction={direction}
                                onBack={goBack}
                                onNavigate={closeMenu}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </>
    );
}