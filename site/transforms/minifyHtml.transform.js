const htmlmin = require('html-minifier');
const path = require('path');
const log = require(path.join(process.cwd(), 'lib/log'));

module.exports = (eleventyConfig) =>
  eleventyConfig.addTransform('minifyHTML', (content, outputPath) => {
    try {
      const minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    } catch (err) {
      log.error(`html minify error: ${err}`);
    }
  });
