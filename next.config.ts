import type { NextConfig } from 'next'

// 部署到 GitHub Pages 项目站点时需设置 NEXT_PUBLIC_BASE_PATH=/becomingchinese
// 绑定自定义域名后清空该变量即可
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: basePath || undefined,
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
}

export default nextConfig
