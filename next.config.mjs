/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'dummyimage.com'
          },
          {
            protocol: "https",
            hostname: "img.freepik.com"
          },
          {
            protocol: "https",
            hostname: "images-na.ssl-images-amazon.com"
          }
        ],
      },
};

export default nextConfig;
