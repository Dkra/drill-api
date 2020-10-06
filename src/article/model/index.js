import memoryDB from '../db'

export default class ArticleModel {
  read() {
    return memoryDB.read
  }
  add() {
    return memoryDB.add
  }
  readAll() {
    return memoryDB.readAll
  }
  remove() {
    return memoryDB.remove
  }
  update() {
    return memoryDB.update
  }
}
