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
          },
          {
            protocol: "https",
            hostname: "prod-img.thesouledstore.com"
          }
        ],
      },
      async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "https://ecommerce.smitghelani.xyz" }, // replace this your actual origin
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ]
    }
};

export default nextConfig;
