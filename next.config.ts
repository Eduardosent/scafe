import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  /* Configuración de TypeScript */
  typescript: {
    // Esto ignora los errores de tipos durante el build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;