test.todo('test')


const createArticle = () => (
  id: 123,
  content: 'test'
)

test('test createArticle()', async () => {
  expect(res.json).toBeCalledWith({
    article
  });
});