/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */

await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.cinemapalace.ro",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/choose-location",
        permanent: true,
      },
    ];
  },
};

export default config;
