/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Suppress known webpack critical dependency warnings originating from
  // sequelize's dynamic require in certain dialect connection managers.
  webpack: (config, { isServer }) => {
    // Disable expression context critical warnings which are noisy for some
    // libraries (like sequelize) that use dynamic requires internally.
    if (config && config.module) {
      // This flag turns off the "the request of a dependency is an expression" warnings
      config.module.exprContextCritical = false;
    }
    // Only apply to server build; client shouldn't include sequelize in the first place.
    if (isServer && config && config.ignoreWarnings) {
      config.ignoreWarnings.push((warning) => {
        // some Next build warnings are objects with module and message fields
        const msg = warning && warning.message ? warning.message : String(warning);
        if (typeof msg === 'string' && msg.includes('Critical dependency: the request of a dependency is an expression')) {
          // This is a noisy warning coming from libraries that use dynamic requires (e.g., sequelize).
          return true;
        }
        return false;
      });
    }
    return config;
  },
};

module.exports = nextConfig;
