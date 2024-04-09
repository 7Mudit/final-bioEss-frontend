/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bigmusclesnutrition.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
