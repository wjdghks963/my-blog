const removeImports = require("next-remove-imports")();
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    CLOUD_NAME: process.env.CLOUD_NAME,
    CLOUD_PRESET_NAME: process.env.CLOUD_PRESET_NAME,
    MY_EMAIL: process.env.MY_EMAIL,
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "velog.velcdn.com",
      "images.velog.io",
      "img.icons8.com",
      "k.kakaocdn.net",
      "github.com",
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
      "pbs.twimg.com",
      "storage.junglog.xyz",
    ],
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    return [
      {
        source: "/api/postImage/:postImageUrl*",
        destination: `https://res.cloudinary.com/:postImageUrl*`,
      },
      {
        source: "/api/npm-downloads",
        destination: "https://api.npmjs.org/downloads/point/last-month/@wjdghks963/react-native-shuffle-pincode",
      },
    ];
  },
};

module.exports = removeImports({ ...nextConfig });
