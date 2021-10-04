const {MongoClient} = require('mongodb')


const uri = 'mongodb://127.0.0.1:27017'

const client = new MongoClient(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

client.connect()
let db = client.db("product-listing")
module.exports = {

    getCategories: () => {
        let categories = db.collection("categories")
        let categoriesData = categories.find();
        let data = categoriesData.toArray()
        return data
    },
    createCategory:(categoryName)=>{
        db.collection("categories").insertOne({name: categoryName})
    },
    getProducts: (categoryName)=>{
       return db.collection('categories').find({name: categoryName}).toArray()
    },
}
