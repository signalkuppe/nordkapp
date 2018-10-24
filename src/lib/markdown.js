/*
* Converte una stringa in Markdown, evidenziando i code block con Prism.js
*/

var marked = require('marked')
var Prism = require('prismjs')

const renderer = new marked.Renderer();

 // render custom di code blocks compatibile con prismjs
renderer.code = function (code, lang, escaped) {

  code = this.options.highlight(code, lang);
  
  if (!lang)
    return '<pre><code>' + code + '\n</code></pre>';

  let langClass = this.options.langPrefix + lang;

  return '<pre class="' + langClass + '"><code class="' + langClass + '">' + code + '</code></pre>\n';
};

 // render custom per le immagini (mette odd e even)
var i = 0;
renderer.image = function (href, title, text) {

    var imageClass= function () {
        return i % 2 ? 'image-odd': 'image-even'
    }
    var out = ''
    if (title) {
      out += '<figure>';
    }
    out += '<img class="'+imageClass()+'" data-src="' + href + '" alt="' + text + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += ' data-lazyload />';
    if (title) {
      out += '<figcaption>'+ title +'</figcaption>'
      out += '</figure>';
    }
    i++;
    return out;
};


marked.setOptions({
    langPrefix: 'language-',
    highlight: function (code, language) {
        if (!Prism.languages.hasOwnProperty(language)) 
            lang = extensions[lang] || 'markup';
      
        return Prism.highlight(code, Prism.languages[language]);
    },
    renderer: renderer,
    breaks: true
});

const toHtml = (markDownString) => {
    i = 0;
    return marked(markDownString)
}

module.exports = toHtml
