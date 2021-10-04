const express = require("express");
const cors = require("cors");
const db = require("./db")
// - App config
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// - Middlewares
app.use(cors({ origin: true }));

// - API routes
app.get('/', (req,res)=>{
    console.log("HEllo");
})
app.get("/categories",async(req,res)=>{
    let data = await db.getCategories()
    res.send(data)
})

app.post("/create_category",async(req,res)=>{
    let categoryName = await req.body.name
    db.createCategory(categoryName)
})
app.get("/get_products",async(req,res)=>{
    let categoryName = await req.query.category
    let products = await db.getProducts(categoryName)
    res.send(products)
})
app.post("/add_product",async(req,res)=>{
    let productDetails = await req.body
    db.addProduct(productDetails)
})
app.listen( 8000, () => console.log( `The application is listening on port 8000!` ) );
