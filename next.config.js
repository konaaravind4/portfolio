/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "avatars.githubusercontent.com" },
            { protocol: "https", hostname: "github.com" },
        ],
    },
    experimental: {
        mdxRs: true,
    },
};

module.exports = nextConfig;
