/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── Static export for GitHub Pages ───────────────────────────────────────
  // Generates a fully static `out/` folder with no Node.js server required.
  output: 'export',

  // GitHub Pages serves project repos at /repo-name/ by default.
  // Set NEXT_PUBLIC_BASE_PATH=/your-repo-name in the GitHub Actions env
  // (or leave unset when using a custom domain / user pages site).
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '',

  // Trailing slashes produce `about/index.html` instead of `about.html`,
  // which GitHub Pages handles more reliably.
  trailingSlash: true,

  // next/image server-side optimization is unavailable in static export.
  images: {
    unoptimized: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  allowedDevOrigins: [
    '192.168.1.28',
    '192.168.1.33',
    'turtle-testimonials-complete-dominant.trycloudflare.com',
    'gave-meet-mae-ways.trycloudflare.com',
    '192.168.1.6',
    'reid-corporate-lip-notre.trycloudflare.com',
    '192.168.1.12',
    'season-create-vip-cyber.trycloudflare.com',
    '192.168.1.5',
    'exams-repeated-weddings-duties.trycloudflare.com',
  ],
}

export default nextConfig
