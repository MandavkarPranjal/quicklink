import type { NextConfig } from "next";
import { withPlausibleProxy } from "next-plausible";

const nextConfig: NextConfig = {
    /* config options here */
    experimental: {
        reactCompiler: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.microlink.io',
                pathname: '**',
            },
            // Allow images from any domain since OpenGraph images can come from anywhere
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
};

const outputConfig = withPlausibleProxy()(nextConfig);

export default outputConfig;
