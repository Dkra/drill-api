import { buildArticle } from '../../../utils/testHelper'

export const addArticle = async (axiosInstance, server, id = 1) => {
  const body = {
    title: 'my title',
    content: 'my content',
  }
  const expectedData = buildArticle(body)
  const {
    data: { _id, title, content },
  } = await axiosInstance.post(
    `http://localhost:${server.address().port}/articles/`,
    body,
  )
  return {
    CData: {
      _id,
      title,
      content,
    },
    expectedData: { _id, ...body },
    _id,
  }
}
