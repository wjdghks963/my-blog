/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CLOUD_NAME: process.env.CLOUD_NAME,
    CLOUD_PRESET_NAME: process.env.CLOUD_PRESET_NAME,
    MY_EMAIL: process.env.MY_EMAIL,
  },
  images: {
    domains: ["res.cloudinary.com", "velog.velcdn.com", "images.velog.io","k.kakaocdn.net","lh3.googleusercontent.com","avatars.githubusercontent.com","pbs.twimg.com"],
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    return [
      {
        source: "/api/postImage/:postImageUrl*",
        destination: `https://res.cloudinary.com/:postImageUrl*`,
      },
    ];
  },
};

const removeImports = require("next-remove-imports")();

module.exports = removeImports({ ...nextConfig });
