"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LinkPreview } from "@/components/ui/link-preview";

interface Tool {
    name: string;
    description: string;
    url: string;
}

export default function DatabaseCategory() {
    const [tools, setTools] = useState<Tool[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prevDots => {
                if (prevDots.length >= 3) {
                    return ''
                }
                return prevDots + '.'
            })
        }, 500) // Change dot every 500ms
        fetch("/docs/tools.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                const databaseCategory = data.categories.find(
                    (category: { name: string }) => category.name.toLowerCase() === "dev-tools"
                );
                setTools(databaseCategory ? databaseCategory.tools : []);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Failed to load categories:", error);
                setError("Failed to load categories");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-screen flex-col justify-between p-8 sm:p-20">
                <main className="flex flex-grow flex-col items-center justify-center text-center">
                    <div className="font-mono text-2xl">
                        Loading<span className="inline-block w-8">{dots}</span>
                    </div>
                </main>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex min-h-screen flex-col justify-between p-8 sm:p-20">
                <main className="flex flex-grow flex-col items-center justify-center text-center">
                    <div className="font-mono text-2xl">
                        {error}
                    </div>
                </main>
            </div>
        )
    }

    return (
        <main className="flex flex-grow flex-col items-center justify-center text-center">
            <div className="text-5xl font-semibold">
                Database
            </div>
            <div className="mt-4"></div>
            <div className="">
                {tools.map((tool) => (
                    <div key={tool.name}>
                        <LinkPreview
                            url={tool.url}
                        >
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
                        </LinkPreview>

                    </div>
                ))}
            </div>
        </main>
    );
}
