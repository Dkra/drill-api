let articleDB = {
  article: [],
  count: 0
};

const addArticle = (count =1) => {  
  for (let i = 1; i <=count; i++) {
    articleDB["article"].push({
      title: `title ${i + articleDB.count}`,
      content: `content ${i + articleDB.count}`,
    }) 
    articleDB.count++;
  }

  return new Promise((res,rej) => {
    res(articleDB)
  })
}

const readArticle = (id) => new Promise((res, rej) => res({
  article: articleDB.article[id-1],
  count: 1
}));

const readAllArticle = (id) => new Promise((res, rej) => res(articleDB));

const deleteArticle = (id) => new Promise((res, rej) => {
  try{
    if (articleDB.count === 0) throw new Error('No articles!')
    articleDB.article = articleDB.article.filter((a,idx) => idx !== id-1),
    articleDB.count = articleDB.article.length
    console.log('articleDB', articleDB)
    res(articleDB)
  } catch (err) {
    rej(`${err}`)
  }
});


// C
async function createArticle(req, res, next) {
  const createdArticle = await addArticle()  
  res.json(createdArticle)
}

// R-all
async function getArticles(req, res, next) {
  const getAllArticle = await readAllArticle()
  res.json(getAllArticle)
}

// R
async function getArticle(req, res, next) {
  console.log('req.params.id', req.params.id)
  const getArticle = await readArticle(req.params.id)
  res.json(getArticle)
}

// U

// D
async function delArticle(req, res, next) {
  try {
    const {id} = req.params
    const data = await deleteArticle(id)
    res.json(data)    
  } catch (err) {
    res.status(400).json({message: err})
  }
}


export {
  createArticle,
  getArticles,
  getArticle,
  delArticle
}