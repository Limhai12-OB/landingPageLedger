import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

export default function nextConfig(phase: string): NextConfig {
  return {
    reactStrictMode: true,
    // Keep live dev chunks separate from production builds and other dev ports.
    // Next sets PORT to the actual listening port before loading server config.
    distDir: phase === PHASE_DEVELOPMENT_SERVER
      ? `.next-dev/${process.env.PORT || "3000"}`
      : ".next",
  };
}
