/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_ZOOM_SDK_CLIENT_ID: process.env.NEXT_ZOOM_SDK_CLIENT_ID,
    NEXT_ZOOM_SDK_SECRET_ID: process.env.NEXT_ZOOM_SDK_SECRET_ID,
    NEXT_ZOOM_SERVER_TO_SERVER_CLIENT_ID:
      process.env.NEXT_ZOOM_SERVER_TO_SERVER_CLIENT_ID,
    NEXT_ZOOM_SERVER_TO_SERVER_SECRET_ID:
      process.env.NEXT_ZOOM_SERVER_TO_SERVER_SECRET_ID,
    NEXT_ZOOM_SERVER_TO_SERVER_ACCOUNT_ID:
      process.env.NEXT_ZOOM_SERVER_TO_SERVER_ACCOUNT_ID,
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },

  images: {
    remotePatterns: [],
  },
}

export default nextConfig
