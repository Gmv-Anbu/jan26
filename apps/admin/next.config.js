/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   styledComponents: true,
//   optimizeFonts: false,
// }
const nextRuntimeDotenv = require('next-runtime-dotenv');

const withConfig = nextRuntimeDotenv({
  path: '.env',
  public: ['NEXT_PUBLIC_API_URL', 'S3_IMG_URL', 'NEXT_PUBLIC_API_URL'],
});

module.exports = withConfig({
  reactStrictMode: false,
  styledComponents: true,
  optimizeFonts: false,
  images: {
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
    layoutRaw: true,
  },
});
