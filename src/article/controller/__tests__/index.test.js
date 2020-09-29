import "regenerator-runtime/runtime"; // move to jest setup file
import articleDB from '../../db'
import {
  createArticle,
  getArticles,
  getArticle,
  delArticle,
  putArticle
} from '../'

let idCounter = 0

function buildArticle({
  title = 'default title',
  content = 'default content',
}) {
  idCounter++
  return ({
    _id: idCounter,
    title: `id:${idCounter} ${title} `,
    content: `id:${idCounter} ${content} `,
  })
}

function buildReq(parmas) {
  return {
    ...parmas,

  }
}

function buildRes() {
  return {
    json: jest.fn()
  }
}



jest.mock('../../db')

beforeEach(() => {
  jest.clearAllMocks()
})

test('createArticle()', async () => {
  // Arrange
  const parmas = {
    title: 'my title',
    content: 'my content'
  }
  const req = buildReq({
    body: parmas
  })
  const res = buildRes()
  const dummyItem = buildArticle(parmas)

  articleDB.add.mockResolvedValue(dummyItem)

  // Act
  await createArticle(req, res)

  // Assert
  expect(res.json).toHaveBeenCalledTimes(1)
  expect(res.json).toHaveBeenCalledWith(dummyItem)
});