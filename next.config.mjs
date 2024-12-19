/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
			{
        protocol: "https",
        hostname: "s4-media1.study4.com",
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
