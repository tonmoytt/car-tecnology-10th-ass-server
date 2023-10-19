
const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000


// middelware
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.Db}:${process.env.Pb}@cluster0.jfgqsm5.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);

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

        const database = client.db("userDB").collection("user");

        app.get('/user', async (req, res) => {
            const cursor = database.find();
            const result = await cursor.toArray()
            res.send(result)
        })

        app.get('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await database.findOne(query);
            res.send(result)
        })

        app.post('/user', async (req, res) => {
            const data = req.body;
            console.log(data)
            const result = await database.insertOne(data);
            res.send(result)
        })






        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);






app.get('/', (req, res) => {
    res.send('ami running vai')
})
app.get('/wow', (req, res) => {
    res.send('wow!!!! ami o to running mamu!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})