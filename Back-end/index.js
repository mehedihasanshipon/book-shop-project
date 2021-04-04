const express = require("express");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const cors = require("cors");
const ObjectId = require('mongodb').ObjectId;
const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
console.log(process.env.DB_NAME);
// MongoDB URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dzoti.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const bookCollection = client.db("shops").collection("product");
  const orderCollection = client.db("shops").collection("orders");
  const categoryCollection = client.db("shops").collection("category");

  console.log(err);

  // Receive Post data from UI and insert into MongoDB
  app.post("/addBooks", (req, res) => {
    const books = req.body;
    bookCollection.insertOne(books).then((result) => {
      res.send(result.insertedCount > 0);
      console.log("Data inserted successfully");
    }).catch(err =>{
      console.log(err);
    });
  });

  // Send data to ui from mongodb
  app.get("/books", (req, res) => {
    bookCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  // Load checkout data to ui
  app.get('/checkout/:id',(req,res)=>{
    bookCollection.find({_id:ObjectId(req.params.id)})
    .toArray((err,documents)=>{
      res.send(documents[0]);
    })
  })

  // Add order collection to Database
  app.post('/addOrder',(req,res)=>{
    const orders = req.body;
    orderCollection.insertOne(orders)
    .then(result=>{
      res.send(result.insertedCount > 0);
      console.log("Order added Successfully");
    })
  })

  // Send Order lists data to UI
  app.get('/orderList',(req,res)=>{
    orderCollection.find({})
    .toArray((err,documents)=>{
      res.send(documents)
    })
  })

// Send data to ui using email query
  app.get('/mailData',(req,res)=>{
    orderCollection.find({email:req.query.email})
    .toArray((err,documents)=>{
      res.send(documents);
    })
  })
  
  // Delete books method
  app.delete('/deleteBook/:id',(req,res)=>{
    const id =ObjectId((req.params.id));
    bookCollection.findOneAndDelete({_id:id})
    .then(documents=> {
      res.send(!!documents.value);
      console.log("Book deleted successfully");
    })
  })
  // Category Create
  app.post('/addCategory',(req,res)=>{
    const category = req.body;
    categoryCollection.insertOne(category)
    .then((result)=>{
      console.log("category added");
    })
  })
  // Load Category
  app.get('/categories',(req,res)=>{
    categoryCollection.find()
    .toArray((err,documents)=>{
      res.send(documents)
    })
  })
  console.log("Database connected successfully");
});

// Listen port method
app.listen(port, () => {
  console.log(`Book app listening at http://localhost:${port}`);
});

