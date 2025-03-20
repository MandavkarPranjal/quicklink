"use client";

import Link from "next/link";
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
                setCategories(data.categories);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Failed to load categories:", error);
                setError("Failed to load categories");
                setLoading(false);
            });
        return () => clearInterval(interval)
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
        <div className="flex min-h-screen flex-col justify-between p-8 font-[family-name:var(--font-geist-sans)] sm:p-20">
            <main className="flex flex-grow flex-col items-center justify-center text-center">
                <div className="text-2xl">
                    Hi. I&apos;m{" "}
                    <a
                        href="https://x.com/__pr4njal"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                    >
                        Pranjal
                    </a>
                    . I built this website because I always forget where to find the tools I need.
                </div>
                <div className="mt-2"></div>
                <p className="inline-block rounded-full border border-white/30 bg-white/5 px-2 py-0.5 text-center text-sm text-white/60">
                    All tools are free to use with limits
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
