/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CLOUD_NAME: process.env.CLOUD_NAME,
    CLOUD_PRESET_NAME: process.env.CLOUD_PRESET_NAME,
    MY_EMAIL: process.env.MY_EMAIL,
  },
};

// ref: https://uiwjs.github.io/react-md-editor/#support-nextjs
const removeImports = require("next-remove-imports")();

module.exports = removeImports({ ...nextConfig });
