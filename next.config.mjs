/** @type {import('next').NextConfig} */
const nextConfig = {

  env: {
    BASE_URL: "http://localhost:4000",
  },

  images: {

     dangerouslyAllowSVG: true,
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
