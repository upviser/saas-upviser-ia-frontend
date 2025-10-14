/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Configuración para dominios dinámicos
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },

  // Configuración para manejar dominios dinámicos
  async rewrites() {
    return {
      beforeFiles: [
        // Manejar subdominios dinámicos
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: '(?<subdomain>.*)\\.upviser\\.cl',
            },
          ],
          destination: '/:path*',
        },
        // Manejar dominios personalizados
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: '(?<domain>.*\\.cl)',
            },
          ],
          destination: '/:path*',
        },
      ],
    };
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'iframe.mediadelivery.net',
        port: '',
        pathname: '/embed/**'
      }, {
        protocol: 'https',
        hostname: 'upviser-website.b-cdn.net',
        port: '',
        pathname: '/**'
      }, {
        protocol: 'https',
        hostname: 'web1-upviser.b-cdn.net',
        port: '',
        pathname: '/**'
      }, {
        protocol: 'https',
        hostname: 'web2-upviser.b-cdn.net',
        port: '',
        pathname: '/**'
      }, {
        protocol: 'https',
        hostname: 'web3-upviser.b-cdn.net',
        port: '',
        pathname: '/**'
      }, {
        protocol: 'https',
        hostname: 'web4-upviser.b-cdn.net',
        port: '',
        pathname: '/**'
      }, {
        protocol: 'https',
        hostname: 'web5-upviser.b-cdn.net',
        port: '',
        pathname: '/**'
      },
      // Patrones para dominios dinámicos
      {
        protocol: 'https',
        hostname: '*.upviser.cl',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: '*.cl',
        port: '',
        pathname: '/**'
      }
    ]
  }
};

export default nextConfig;
