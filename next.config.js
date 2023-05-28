const removeImports = require("next-remove-imports")();
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    mdxRs: true,
  },
  env: {
    CLOUD_NAME: process.env.CLOUD_NAME,
    CLOUD_PRESET_NAME: process.env.CLOUD_PRESET_NAME,
    MY_EMAIL: process.env.MY_EMAIL,
  },
  images: {
    domains: ["res.cloudinary.com", "velog.velcdn.com", "images.velog.io", "img.icons8.com","k.kakaocdn.net","lh3.googleusercontent.com","avatars.githubusercontent.com","pbs.twimg.com"],
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




//module.exports = withMDX({ ...nextConfig })
module.exports = removeImports({ ...nextConfig })
