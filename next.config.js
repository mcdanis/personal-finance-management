/** @type {import('next').NextConfig} */
require("dotenv").config();
const nextConfig = {
  reactStrictMode: true,
  env: {
    BE_PATH: process.env.URL_BE,
  },
};

module.exports = nextConfig;
