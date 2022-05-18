const { withContentlayer } = require("next-contentlayer")

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CL_CLIENT_ID: process.env.CL_CLIENT_ID,
    CL_ENDPOINT: process.env.CL_ENDPOINT,
  },
}

module.exports = withContentlayer(nextConfig)
