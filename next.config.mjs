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
          },
          {
            protocol: "https",
            hostname: "t4.ftcdn.net"
          },
          {
            protocol: "https",
            hostname: "as1.ftcdn.net"
          },
          {
            protocol: "https",
            hostname: "res.cloudinary.com"
          }
        ],
      },
};

export default nextConfig;
