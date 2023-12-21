const express = require('express') ;
const  cors = require('cors');
const app = express();
require('dotenv').config();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT||10000

app.use(cors());
app.use(express.json());

console.log(process.env.Dbuser)

// const uri = "mongodb+srv://sumondash51583:VzGixaE5P0uIMcdW@cluster0.7xwf7mm.mongodb.net/?retryWrites=true&w=majority";


const uri = `mongodb+srv://${process.env.Dbuser}:${process.env.Dbpass}@cluster0.7xwf7mm.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection


const Coffee = client.db('coffeedb')
const coffeeColection=Coffee.collection('coffee');


app.get('/coffee',async(req,res)=>{

const cursor= coffeeColection.find();
const result = await cursor.toArray();
res.send(result);

})




app.get('/coffee/:id',async(req,res)=>{

  const id= req.params.id;
  const query={_id: new ObjectId(id)}
  const result = await coffeeColection.findOne(query)
  res.send(result)



})

app.post('/coffee',async(req,res)=>{
const newCoffee = req.body;
console.log(newCoffee);
const result=  await coffeeColection.insertOne(newCoffee)
res.send(result)
});


app.put('/coffee/:id',async(req,res)=>{

console.log('update sect')

  const   id  = req.params.id;

console.log(id);
  

  const filter =  {_id: new ObjectId(id)} 

  const options = {upsert:true} ;
  const updateCoffee = req.body;
  
  

  console.log(updateCoffee.name)
  
  const Coffee = {
    
    $set: {
      name: updateCoffee.name,
      quantity: updateCoffee.quantity,
      supplier: updateCoffee.supplier,
      taste: updateCoffee.taste,
      category: updateCoffee.category,
      details: updateCoffee.details,
      photo: updateCoffee.photo
},
  }

  const result = await coffeeColection.updateOne(filter,Coffee,options);




  res.send(result);




})



app.delete('/coffee/:id',async(req,res)=>{
  const id= req.params.id;
  const query ={_id:new ObjectId(id)}
  const result= await coffeeColection.deleteOne(query)
  res.send(result)



})



    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



















app.get('/',(req,res)=>{

res.send('Cofee maker is running')


});

app.listen(port,()=>{
console.log(`the port is runing:${port}`)



})