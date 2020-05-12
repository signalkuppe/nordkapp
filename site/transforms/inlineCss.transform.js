const path = require('path');
const fs = require('fs');
const glob = require('glob');
const autoprefixer = require('autoprefixer');
const postcss = require('postcss');
const { PurgeCSS } = require('purgecss');
const CleanCSS = require('clean-css');
const cheerio = require('cheerio');
const log = require(path.join(process.cwd(), 'lib/log'));
const cssGlobPattern = `${path.join(process.cwd(), 'site/css/screen')}/**/*.css`;
const printCss = fs.readFileSync(path.join(process.cwd(), 'site/css/print/print.css'), 'utf-8');

module.exports = function (eleventyConfig) {
  eleventyConfig.addTransform('processHtml', async function (content, outputPath) {
    if (outputPath.endsWith('.html')) {
      try {
        let css = '';
        const cssFiles = glob.sync(cssGlobPattern, {});
        const htmlFile = path.join(process.cwd(), outputPath);
        const result = await new PurgeCSS().purge({
          // obtain the purged styles from html files with linked stylesheets
          content: [htmlFile],
          css: cssFiles,
        });
        result.forEach((r) => {
          css += r.css; // we get the purged style from each file
        });
        const prefixed = await postcss([autoprefixer]).process(css, { from: undefined }); // add prefixes
        const minified = `<style media="screen">${
          new CleanCSS({}).minify(prefixed.css).styles
        }</style>`; // minify it

        const minifiedPrint = `<style media="print">${
          new CleanCSS({}).minify(printCss).styles
        }</style>`; // minify it
        const $ = cheerio.load(content); // manipulate the dom
        $('head').append(minified); // add the inline minified styles
        $('head').append(minifiedPrint); // add the inline print minified styles
        return $.html();
      } catch (err) {
        log.error(`css inline error: ${err}`);
      }
    } else {
      return content;
    }
  });
};
