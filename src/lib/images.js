/*
* Recupera src e alt di un'immagine di un field di contentful
*/

module.exports = {

  /* restituisce l'url di un'immagine con la sua trasformazione */

  getUrl (image, transformation)  {
      try {
          return image.fields.file.url + (transformation ? '?'+ transformation : '')
      }
      catch (err) {
          console.log(err)
      }
  },

  /* restituisce l'alt di un'immagine  */

  getAlt (image)  {
      try {
          return image.fields.description
      }
      catch (err) {
          console.log(err)
      }
  }
  
}