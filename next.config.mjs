/** @type {import('next').NextConfig} */
const nextConfig = {
  // env: {
  //   NEXT_BASE_API_URL: process.env.NEXT_BASE_API_URL,
  //   SERVER_HOST: process.env.SERVER_HOST,
  //   SERVER_PROTOCOL: process.env.SERVER_PROTOCOL,
  //   NEXT_IMAGE_URL: process.env.NEXT_IMAGE_URL,
  // },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },

  images: {
    remotePatterns: [],
  },
}

export default nextConfig
