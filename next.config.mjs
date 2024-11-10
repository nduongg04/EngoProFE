/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BASE_URL: "http://localhost:3000",
    },
    images: {
        dangerouslyAllowSVG: true,
    },
};

export default nextConfig;
