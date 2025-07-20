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
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "velog.velcdn.com",
      },
      {
        protocol: "https",
        hostname: "images.velog.io",
      },
      {
        protocol: "https",
        hostname: "img.icons8.com",
      },
      {
        protocol: "https",
        hostname: "k.kakaocdn.net",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
      },
      {
        protocol: "https",
        hostname: "storage.junglog.xyz",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  webpack: (config, { isServer }) => {
    // Three.js를 위한 설정
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }

    // Three.js 모듈을 외부 의존성으로 처리하지 않음
    config.externals = config.externals || [];
    if (isServer) {
      config.externals.push({
        three: "three",
        "@react-three/fiber": "@react-three/fiber",
        "@react-three/drei": "@react-three/drei",
      });
    }

    return config;
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
      {
        source: "/api/3d-model/:path*",
        destination: "https://storage.junglog.xyz/:path*",
      },
    ];
  },
};

module.exports = removeImports({ ...nextConfig });
