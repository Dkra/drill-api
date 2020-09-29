let idCounter = 0
function buildArticle({
  title = 'default title',
  content = 'default content',
}) {
  idCounter++
  return {
    _id: idCounter,
    title: `id:${idCounter} ${title} `,
    content: `id:${idCounter} ${content} `,
  }
}

function buildReq(parmas) {
  return {
    body: {},
    ...parmas,
  }
}

function buildRes(overrides = {}) {
  const res = {
    json: jest.fn(() => res).mockName('json'),
    status: jest.fn(() => res).mockName('status'),
    ...overrides,
  }
  return res
}

function buildNext(impl) {
  return jest.fn(impl).mockName('next')
}

export { buildArticle, buildReq, buildRes }
