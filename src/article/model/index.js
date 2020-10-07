import memoryDB from '../db'

export default class ArticleModel {
  static add({ title, content }) {
    return memoryDB.add({ title, content })
  }
  static getAll() {
    return memoryDB.getAll()
  }
  static get(id) {
    return memoryDB.get(id)
  }
  static update({ _id, title, content }) {
    return memoryDB.update({ _id, title, content })
  }
  static remove(id) {
    return memoryDB.remove(id)
  }
}
