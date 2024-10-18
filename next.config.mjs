/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.FIREBASE_IMG_HOSTNAME,
        port: '',
        // pathname: process.env.FIREBASE_IMG_PATHNAME,
      },
    ],
  },
};

export default nextConfig;
