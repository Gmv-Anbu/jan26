/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   styledComponents: true,
//   optimizeFonts: false,
// }
const nextRuntimeDotenv = require('next-runtime-dotenv')

const withConfig = nextRuntimeDotenv({
  path: '.env',
  public: ['NEXT_PUBLIC_API_URL', 'S3_IMG_URL', 'NEXT_PUBLIC_API_URL'],
})

module.exports = withConfig({
  reactStrictMode: false,
  styledComponents: true,
  optimizeFonts: false,
  images: {
    minimumCacheTTL: 60,
    domains: [
      'picsum.photos',
      'nft-two.s3.sa-east-1.amazonaws.com',
      'nft-two1.s3.sa-east-1.amazonaws.com',
      'i.stack.imgur.com',
      'images.unsplash.com',
      'www.google.com',
      'nft-two.s3.amazonaws.com',
      'nft-two1.s3.amazonaws.com',
      'dbx-dev.s3.amazonaws.com',
      'https://d3uwo5oqixn6qw.cloudfront.net',
      'd3uwo5oqixn6qw.cloudfront.netassets',
      'd3uwo5oqixn6qw.cloudfront.net',
      'd3uwo5oqixn6qw.cloudfront.net/assets'
    ],
    // layoutRaw: true,
  },
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|JPG|jpeg)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, max-age=0, must-revalidate',
          }
        ],
      },
    ]
  },
})

// const withTM = require('next-transpile-modules')(['hashconnect']);

// module.exports = withTM({});
