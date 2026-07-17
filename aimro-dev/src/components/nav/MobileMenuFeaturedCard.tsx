import type { DropdownFeatured } from "@/utils/types";

interface MobileMenuFeaturedCardProps {
    featured: DropdownFeatured;
    onNavigate: () => void;
}

export default function MobileMenuFeaturedCard({
    featured,
    onNavigate,
}: MobileMenuFeaturedCardProps) {
    return (
        <a
            href={featured.href}
            onClick={onNavigate}
            className="group relative flex flex-col justify-between 
            overflow-hidden rounded-xl border border-primary/40 
            bg-gradient-to-br from-primary/10 via-white to-white p-4"
        >
            <div>
                <h4 className="text-base font-semibold text-gray-900 
                transition-colors group-hover:text-primary">
                    {featured.title}
                </h4>
                <p className="mt-1 text-sm leading-snug text-gray-400">
                    {featured.description}
                </p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-sm font-medium text-primary">
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
        </a>
    );
}