const path = require('path')
const _images = require(path.join(process.cwd(), 'src/lib/images'))
let result = []
let enCode = 'en-US'
json.forEach(function (rawData)
{
	
  let conserva = {};

  try {

    // parso la risposta per avere un oggetto foto più comodo con i formati e i dati che mi servono  

    conserva.nome = {
        it: rawData.fields.nome.it,
        en: rawData.fields.nome[enCode]
    }

    conserva.prezzo = rawData.fields.prezzo[enCode]

    // trovo la copertina
    if (rawData.fields.foto) {
      const foto = _.find(collection('assets'), (a) => a.sys.id === rawData.fields.foto[enCode].sys.id)
      conserva.foto = {
        alt: _images.getAlt(foto),
        small: _images.getUrl(foto,'w=420&h=420&fm=jpg&q=80&fit=fill&fl=progressive'),
        large: _images.getUrl(foto,'w=1170&fm=jpg&q=80&fit=fill&fl=progressive')
      }	
    }

  }

  catch(err) {
    console.log(err)
    process.exit(1)
  }	

	result.push(conserva);
	
})
done(result);