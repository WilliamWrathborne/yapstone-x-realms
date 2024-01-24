// next.config.js

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    serverRuntimeConfig: {
      // Will only be available on the server side
      // Pass through env variables here if needed
    },
    publicRuntimeConfig: {
      // Will be available on both server and client
    },
    // You may need to add more config settings here
  };
  
  module.exports = nextConfig;
