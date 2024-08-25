// postcss.config.cjs

const { default: autoprefixer } = require('autoprefixer');

/** @type {import('postcss-load-config').Config} */
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer:{}
  },
};
