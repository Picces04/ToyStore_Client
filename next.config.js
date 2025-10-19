/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'avatars.githubusercontent.com',
            'cdn.jsdelivr.net',
            'res.cloudinary.com',
        ],
    },
};

module.exports = nextConfig;
