/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BASE_URL: "http://localhost:3000",
    },
    images: {
        dangerouslyAllowSVG: true,
    },
    output: "standalone",
};

export default nextConfig;
