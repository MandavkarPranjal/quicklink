import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import PlausibleProvider from "next-plausible";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Quicklinks - links to all usefull tools",
    description: "A bunch of simple tools links for Devs. All free. Might be paid for extra features.",
    icons: {
        icon: "/favicon.svg",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <PlausibleProvider domain="quicklink-s.vercel.app" />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
