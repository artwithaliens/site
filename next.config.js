/* eslint-disable unicorn/prefer-module */
const { withContentlayer } = require("next-contentlayer")

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CL_CLIENT_ID: process.env.CL_CLIENT_ID,
    CL_ENDPOINT: process.env.CL_ENDPOINT,
  },
  images: {
    domains: ["wp.artwithaliens.com"],
  },
}

module.exports = withContentlayer(nextConfig)
