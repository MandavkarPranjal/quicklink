"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LinkPreview } from "@/components/ui/link-preview";

interface Tool {
    name: string;
    description: string;
    url: string;
}

export default function AuthenticationCategory() {
    const [tools, setTools] = useState<Tool[]>([]);

    useEffect(() => {
        fetch("/docs/tools.json")
            .then((response) => response.json())
            .then((data) => {
                const databaseCategory = data.categories.find(
                    (category: { name: string }) => category.name.toLowerCase() === "authentication"
                );
                setTools(databaseCategory ? databaseCategory.tools : []);
            })
            .catch((error) => console.error("Failed to load tools:", error));
    }, []);

    return (
        <main className="flex flex-grow flex-col items-center justify-center text-center">
            <div className="text-5xl font-semibold">
                Authentication
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
