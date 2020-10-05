let idCounter = 0
let articleDB = {
  article: [],
  count: 0,
}

const add = ({ title, content }) => {
  idCounter++
  articleDB['article'].push({
    _id: idCounter,
    title: `id:${idCounter} ${title} `,
    content: `id:${idCounter} ${content} `,
  })
  articleDB.count++

  return new Promise((res, rej) => {
    res(articleDB)
  })
}

const read = (id) =>
  new Promise((res, rej) => {
    const article = articleDB.article.filter((a) => a._id === +id)
    if (!article.length) rej(`Article Id:${id} not found!`)
    res({
      article,
      count: 1,
    })
  })

const readAll = (id) => new Promise((res, rej) => res(articleDB))

const update = ({ _id, title, content }) =>
  new Promise((res, rej) => {
    let updatedItem
    // update
    articleDB.article.forEach((a) => {
      if (a._id === +_id) {
        a.title = title
        a.content = content
        updatedItem = a
      }
    })
    // contain in array
    if (updatedItem) res([updatedItem])
    else throw new Error(`Article Id:${_id} not found!`)
  })

const remove = (id) =>
  new Promise((res, rej) => {
    try {
      if (articleDB.count === 0) throw new Error('No articles!')
      const originLength = articleDB.article.length
      articleDB.article = articleDB.article.filter((a) => a._id !== +id)
      if (originLength === articleDB.article.length)
        throw new Error(`Article Id:${id} not found!`)

      articleDB.count = articleDB.article.length
      console.log('articleDB', articleDB)
      res(articleDB)
    } catch (err) {
      rej(`${err}`)
    }
  })

export default {
  read,
  add,
  readAll,
  remove,
  update,
}
