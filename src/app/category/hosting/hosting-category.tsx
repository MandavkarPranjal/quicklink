"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Tool {
    name: string;
    description: string;
    url: string;
}

export default function HostingCategory() {
    const [tools, setTools] = useState<Tool[]>([]);

    useEffect(() => {
        fetch("/docs/tools.json")
            .then((response) => response.json())
            .then((data) => {
                const databaseCategory = data.categories.find(
                    (category: { name: string }) => category.name.toLowerCase() === "hosting"
                );
                setTools(databaseCategory ? databaseCategory.tools : []);
            })
            .catch((error) => console.error("Failed to load tools:", error));
    }, []);

    return (
        <div className="flex min-h-screen flex-col justify-between p-8 font-[family-name:var(--font-geist-sans)] sm:p-20">
            <main className="flex flex-grow flex-col items-center justify-center text-center">
                <div className="text-5xl font-semibold">
                    Hosting
                </div>
                <div className="mt-4"></div>
                <div className="">
                    {tools.map((tool) => (
                        <div key={tool.name}>
                            <Link
                                href={tool.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className="text-blue-500 hover:underline" >
                                    {tool.name}
                                </span>
                                - <span className="text-gray-500 hover:text-white/60">{tool.description}</span>
                            </Link>
                        </div>
                    ))}
                </div>
            </main>
            <footer className="mt-8 text-center text-sm text-gray-500">
                <a
                    href="https://github.com/MandavkarPranjal/quickpic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                >
                    View on GitHub
                </a>
            </footer>
        </div>
    );
}
