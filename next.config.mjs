/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'iframe.mediadelivery.net',
        port: '',
        pathname: '/embed/**'
      }, {
        protocol: 'https',
        hostname: 'salud-casa.b-cdn.net',
        port: '',
        pathname: '/**'
      }, {
        protocol: 'https',
        hostname: 'marbella-clinica.b-cdn.net',
        port: '',
        pathname: '/**'
      }, {
        protocol: 'https',
        hostname: 'ayr-clinica.b-cdn.net',
        port: '',
        pathname: '/**'
      }, {
        protocol: 'https',
        hostname: 'dent-clinica.b-cdn.net',
        port: '',
        pathname: '/**'
      }, {
        protocol: 'https',
        hostname: 'fvaras-kinesiologia.b-cdn.net',
        port: '',
        pathname: '/**'
      }, {
        protocol: 'https',
        hostname: 'upvisor-website.b-cdn.net',
        port: '',
        pathname: '/**'
      }
    ]
  }
};

export default nextConfig;
