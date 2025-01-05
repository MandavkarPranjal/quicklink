"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const Category = ({ name, icon }) => (
    <Link
        href={`/category/${name.toLowerCase()}`}
        className="flex items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
    >
        <span className="text-2xl mr-3">{icon}</span>
        <span className="text-lg">{name}</span>
        <ArrowRight className="ml-auto" size={20} />
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
                <div>
                    Hi. I&apos;m{" "}
                    <a
                        href="https://x.com/__pr4njal"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                    >
                        Pranjal
                    </a>
                    . I built these tools because I was annoyed they did not exist without signing in.<br />
                    <p className="text-center text-white/60">
                        I don&apos;t collect your data as cookies or anything. All work is done on your side.
                    </p>
                </div>

                {/* Category Section */}
                <div className="mt-4"></div>
                <section className="w-full max-w-4xl mb-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {categories.map((category) => (
                            <Category key={category.name} {...category} />
                        ))}
                    </div>
                </section>
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
