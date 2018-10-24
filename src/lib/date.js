var date = require('date-fns')
const it = require('date-fns/locale/it')

module.exports = {
  format: (dateString, formatString) => {
    return date.format(dateString, formatString, {locale: it})
  },
  getTime: (dateString) => {
    return date.getTime(dateString)
  }
}