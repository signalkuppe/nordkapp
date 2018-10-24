const logo = require(process.cwd() + '/src/lib/logo')
const menu = collection('menu-parsed')
const orari = collection('orari-parsed')
const conserve = collection('conserva-parsed')
page({
    path:
    {
      it: 'index',
      en: 'index'
    },
    layout: 'homepage',
    blocks: {
      top: template('top'),
      hero: template('hero', { logo: logo, orari: orari }),
      nav: template('nav'),
      ristorante: template('ristorante'),
      menu: template('menu', menu),
      conserve: template('conserve', { conserve: conserve }),
      contatti: template('contatti')
    },
    title: ``,
    description: ``,
    canonical: ``,
    og: {
      title: ``,
      image: '',
      description: 'homepage.meta_description'
    },
    postBuild : ($) => {
      const lang = $('body')[0].attribs['data-language']
      $('.lang-' + lang).addClass('active')
    }
})


 