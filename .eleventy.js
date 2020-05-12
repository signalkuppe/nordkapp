const transforms = require('./site/transforms/index');

module.exports = function (eleventyConfig) {
  transforms(eleventyConfig);
  eleventyConfig.addWatchTarget('./**/*.css');
  eleventyConfig.addWatchTarget('./**/*.js');

  eleventyConfig.setBrowserSyncConfig({
    injectChanges: false, // make a full reload on every change (to have a reload when a css changes, since we don't have css files in the final output, only inline styles via transforms)
  });

  return {
    dir: {
      input: 'site',
      includes: 'includes',
      data: 'data',
      output: 'dist',
    },
  };
};
