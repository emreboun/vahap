import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  /* webpack(config) {
    config.module.rules.push({
      test: /\.module\.css$/,
      use: ["style-loader", "css-loader", "postcss-loader"],
      include: path.resolve(__dirname, "styles"), // Allow styles outside `app/`
    });
    return config;
  }, */
};

export default nextConfig;
