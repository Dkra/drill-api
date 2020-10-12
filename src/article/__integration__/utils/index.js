import {
  buildArticle
} from '../../../utils/testHelper'

export const addArticle = async (axiosInstance, server, id = 1) => {
  const body = {
    title: 'my title',
    content: 'my content',
  }
  const _id = id
  const expectedData = buildArticle(body)
  const {
    data: {
      article: CData
    },
  } = await axiosInstance.post(
    `http://localhost:${server.address().port}/articles/`,
    body,
  )

  return {
    CData,
    expectedData,
    _id,
  }
}