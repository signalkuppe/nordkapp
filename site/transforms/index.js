// Import transforms to include
const inlineCss = require('./inlineCss.transform');
const minifyHTML = require('./minifyHtml.transform');

module.exports = (eleventyConfig) => {
  inlineCss(eleventyConfig);
  minifyHTML(eleventyConfig);
  return;
};
