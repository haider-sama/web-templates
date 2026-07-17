import type { NavItem } from "../utils/types";

export const navItems: NavItem[] = [
    {
        label: "Products",
        href: "/products",
        panels: [
            {
                heading: "AI Software",
                items: [
                    {
                        title: "AIM AI Operating System (AIOS)",
                        href: "/products/aios",
                        description:
                            "Learns manufacturing tasks from human demonstrations.",
                    },
                    {
                        title: "AIM Executor (AIMEX)",
                        href: "/products/aimex",
                        description: "Execution platform for robotic workcells.",
                    },
                ],
            },
            {
                heading: "Business",
                items: [
                    {
                        title: "Robot-as-a-Service",
                        href: "/products/raas",
                        description: "Flexible robotic workforce, pay-as-you-go.",
                    },
                    {
                        title: "Equipment Sales",
                        href: "/products/equipment",
                        description: "Purchase industrial robotics outright.",
                    },
                ],
            },
        ],
        featured: {
            title: "Manufacturing AI",
            description:
                "Reduce labor costs by more than 50% with AI-powered robotic workers.",
            href: "/products",
        },
    },

    {
        label: "Engineering Services",
        href: "/engineering-services",
        panels: [
            {
                heading: "Services",
                items: [
                    {
                        title: "Factory Integration",
                        href: "/engineering-services/integration",
                        description: "End-to-end deployment of robotic workcells.",
                    },
                    {
                        title: "Workflow Automation",
                        href: "/engineering-services/workflows",
                        description: "Capture and automate manufacturing knowledge.",
                    },
                    {
                        title: "Production Optimization",
                        href: "/engineering-services/optimization",
                        description: "Improve throughput and operational efficiency.",
                    },
                ],
            },
        ],
    },

    {
        label: "Manufacturing",
        href: "/manufacturing",
        panels: [
            {
                heading: "Sectors",
                items: [
                    {
                        title: "3C Electronics",
                        href: "/manufacturing/electronics",
                        description: "High-precision assembly automation.",
                    },
                    {
                        title: "Woodworking",
                        href: "/manufacturing/woodworking",
                        description: "Cabinet and wood floor production.",
                    },
                    {
                        title: "Assembly",
                        href: "/manufacturing/assembly",
                        description: "General assembly line automation.",
                    },
                ],
            },
        ],
    },

    {
        label: "Company",
        href: "/company",
        panels: [
            {
                heading: "Company",
                items: [
                    { title: "About", href: "/company/about" },
                    { title: "Leadership", href: "/company/leadership" },
                    { title: "Careers", href: "/company/careers" },
                ],
            },
        ],
    },

    {
        label: "Investors",
        href: "/investors",
    },
];