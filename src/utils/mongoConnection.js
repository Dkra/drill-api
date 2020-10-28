// const MongoClient = require('mongodb').MongoClient

// const startMongoConnection = () => {
//   const dbName = 'drill'
//   const passwd = 'asdfasdf' // password for the admin user
//   const uri = `mongodb+srv://admin:${passwd}@cluster0.qrebf.mongodb.net/${dbName}?retryWrites=true&w=majority`
//   const client = new MongoClient(uri, { useNewUrlParser: true })
//   client.connect((err) => {
//     const collection = client.db(`${dbName}`).collection('users')
//     // perform actions on the collection object
//     client.close()
//   })
// }

const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

const startMongoConnection = () => {
  const uri = process.env['MONGO_ATLAS_URI']

  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', function () {
    console.log('Mongo Atlas connected!')
  })

  // Test action
  mongoose.connect(`${uri}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  const Cat = mongoose.model('Cat', { name: String })

  const kitty = new Cat({ name: 'Roger' })
  kitty.save().then(() => console.log('meow'))
}
export default startMongoConnection
