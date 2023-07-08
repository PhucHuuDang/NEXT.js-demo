/** @type {import('next').NextConfig} */

// if you want to use difference domain name,
// you have to write it in your configuration file (is here)
const nextConfig = {
    images: {
        domains: ["images.pexels.com", "www.pexels.com"],
    },
};

module.exports = nextConfig;
