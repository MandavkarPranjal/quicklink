"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const Category = ({ name, icon }) => (
    <Link
        href={`/category/${name.toLowerCase()}`}
    >
        {icon} - <span className="text-blue-500 hover:underline">{name}</span>
    </Link>
);

export default function Home() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("/docs/tools.json")
            .then((response) => response.json())
            .then((data) => setCategories(data.categories))
            .catch((error) => console.error("Failed to load categories:", error));
    }, []);

    return (
        <div className="flex min-h-screen flex-col justify-between p-8 font-[family-name:var(--font-geist-sans)] sm:p-20">
            <main className="flex flex-grow flex-col items-center justify-center text-center">
                <div className="text-2xl">
                    Hi. I&apos;m{" "}
                    <a
                        href="https://x.com/__pr4njal"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                    >
                        Pranjal
                    </a>
                    . I built this website because I always forget where to find the tools I need.
                </div>
                <div className="mt-2"></div>
                <p className="inline-block rounded-full border border-white/30 bg-white/5 px-2 py-0.5 text-center text-sm text-white/60">
                    All tools are free to use
                </p>

                {/* Category Section */}
                <div className="mt-4"></div>
                {categories.map((category) => (
                    <Category key={category.name} {...category} />
                ))}
            </main>
            <footer className="mt-8 text-center text-sm text-gray-500">
                <a
                    href="https://github.com/MandavkarPranjal/quicklink"
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
