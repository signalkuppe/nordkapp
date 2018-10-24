
let orari = {}
let enCode = 'en-US'
json.forEach(function (rawData)
{
  try {
    orari.orari = {
        it: rawData.fields.orari.it,
        en: rawData.fields.orari[enCode]
    }
    orari.giornoDiChiusura = {
        it: rawData.fields.giornoDiChiusura.it,
        en: rawData.fields.giornoDiChiusura[enCode]
    }
    orari.chiusuraStagionale = {
        it: rawData.fields.chiusuraStagionale.it,
        en: rawData.fields.chiusuraStagionale[enCode]
    }
    orari.mostraChiusuraStagionale = rawData.fields.mostraChiusuraStagionale[enCode]
  }

  catch(err) {
    console.log('transform orari error', err)
    process.exit(1)
  }	
	
})
done(orari)