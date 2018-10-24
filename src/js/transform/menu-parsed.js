const path = require('path')
const _markdown = require(path.join(process.cwd(), 'src/lib/markdown'))
const _piatto = (p) => {
    return {
        nome: {
            it: p.fields.nomeDelPiatto.it,
            en: p.fields.nomeDelPiatto[enCode]
        },
        prezzo: p.fields.prezzo[enCode]
    }
}
let menu = {}
let enCode = 'en-US'
json.forEach(function (rawData)
{
  try {
    menu.title = {
        it: rawData.fields.nomeDelMenu.it,
        en: rawData.fields.nomeDelMenu[enCode]
    }
    const antipasti = rawData.fields.antipasti[enCode]
    if (antipasti) {
        menu.antipasti = antipasti.map((p, index) => {
            return _piatto(p)
        })
    }
    const primi = rawData.fields.primi[enCode]
    if (primi) {
        menu.primi = primi.map((p, index) => {
            return _piatto(p)
        })
    }
    const secondi = rawData.fields.primi[enCode]
    if (secondi) {
        menu.secondi = secondi.map((p, index) => {
            return _piatto(p)
        })
    }
    const dolci = rawData.fields.dolci[enCode]
    if (dolci) {
        menu.dolci = dolci.map((p, index) => {
            return _piatto(p)
        })
    }
    menu.fuoriMenu = {
        it: _markdown(rawData.fields.fuoriMenu.it),
        en: _markdown(rawData.fields.fuoriMenu[enCode])
    }
    menu.mostraFuoriMenu = rawData.fields.mostraFuoriMenu[enCode]
  }

  catch(err) {
    console.log('transform menu error', err)
    process.exit(1)
  }	
	
})
done(menu)