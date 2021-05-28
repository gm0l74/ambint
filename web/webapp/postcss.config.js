//---------------------------------
// AmbInt - Admin
// File : postcss.config.js
//
// @ version             1.0
//
// @ start date          06 05 2021
// @ last update         20 05 2021
//---------------------------------
const purgecss = [
  '@fullhuman/postcss-purgecss',
  {
    content: ['./components/**/*.{js,ts,tsx}', './pages/**/*.{js,ts,tsx}'],
    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
  },
];

module.exports = {
  plugins: [
    'postcss-import',
    'tailwindcss',
    'autoprefixer',
    'postcss-nested',
    // ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
  ],
};
