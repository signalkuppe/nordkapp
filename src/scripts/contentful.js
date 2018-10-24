const path = require('path')
const mkdirp = require('mkdirp')
const contentful = require('contentful')
const Client = contentful.createClient({
  space: 'ie2ovsa57oqt',
  accessToken: 'dbb8cdedbe01333a603a8f7f8d4d3396b4e24c2be6147ccb5b48090f34af26c8',
  resolveLinks: true
})
const _ = require('lodash')
const fs = require('fs')
const perPage = 20
const getSpace = async () => {
  try {
    let space = await Client.getSpace()
    mkdirp(path.join(process.cwd(),'data/json'), (err, dir) => {
      if (err) {
        console.log('❗', err)
        process.exit(1)          
      }
      fs.writeFileSync(path.join(process.cwd(), 'data/json/space.json'), JSON.stringify(space), 'utf-8')
    })
  } catch (err) {
    console.log('Errore recupero space', err)
  }
}
const getContent = async () => {
  try {
    let contentTypes = await Client.getContentTypes()
    contentTypes.items.forEach(async (ct) => {
      let entries = []
      let iteration = 1
      let skip = 0
      let limit = perPage
      let chunk = await getEntries(ct.sys.id, limit, skip)
      entries = chunk.items
      while (chunk.total > perPage * iteration) {
        skip =  perPage * iteration
        limit = perPage
        let chunk = await getEntries(ct.sys.id, limit, skip)
        entries = _.union(entries, chunk.items)
        iteration ++
      }
      try {
        mkdirp(path.join(process.cwd(),'data/json'), (err, dir) => {
          if (err) {
            console.log('❗', err)
            process.exit(1)          
          }
          fs.writeFileSync(path.join(process.cwd(), `data/json/${ct.sys.id}.json`), JSON.stringify(entries), 'utf-8')
        })
        console.log('✅ finito', ct.sys.id, entries.length)
      } catch (err) {
        console.log('❗', err)
        process.exit(1)
      }
    })
  } catch (err) {
    console.log('❗', err)
    process.exit(1)
  }
}

const getFiles = async () => {
  try {
    let entries = []
    let iteration = 1
    let skip = 0
    let limit = perPage
    let chunk = await getAssets(limit, skip)
    entries = chunk.items
    while (chunk.total > perPage * iteration) {
      skip =  perPage * iteration
      limit = perPage
      let chunk = await getAssets(limit, skip)
      entries = _.union(entries, chunk.items)
      iteration ++
    }
    try {
      mkdirp(path.join(process.cwd(),'data/json'), (err, dir) => {
        if (err) {
          console.log('❗', err)
          process.exit(1)          
        }
        fs.writeFileSync(path.join(process.cwd(), `data/json/assets.json`), JSON.stringify(entries), 'utf-8')
      })
      console.log('✅ finiti gli assets', entries.length)
    } catch (err) {
      console.log('❗', err)
      process.exit(1)
    }
    
  } catch (err) {
    console.log('❗', err)
    process.exit(1)
  }
}

const getAssets = async (limit, skip) => {
  let query = {
    skip: skip,
    limit: limit,
    order: 'sys.createdAt'
  }
  try {
    let result = await Client.getAssets(query)
    return result
  } catch (err) {
    console.log('❗', err)
    process.exit(1)
  }
}

const getEntries = async (contentType, limit, skip) => {
  let query = {
    content_type: contentType,
    include: 1,
    skip: skip,
    limit: limit,
    locale: '*',
    order: 'sys.createdAt'
  }
  try {
    let result = await Client.getEntries(query)
    return result
  } catch (err) {
    console.log('❗', err)
    process.exit(1)
  }
}

getSpace()
getContent()
getFiles()
