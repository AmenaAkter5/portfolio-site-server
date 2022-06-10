// require express, cors, mongodb, jwt and dotenv to secure database pass
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();



// declare app and port
const app = express();
const port = process.env.PORT || 5000;



// use middleware
app.use(cors());
app.use(express.json());



// connect with mongo database

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4p9mr.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



// set connection function

async function run() {
    try {
        await client.connect();

        // projects collection
        const projectsCollection = client.db("portfolio").collection("projects");



        // projects collection API 


        // Make API : get all project data from server
        app.get('/projects', async (req, res) => {
            const query = {};
            const cursor = projectsCollection.find(query);
            const projects = await cursor.toArray();
            res.send(projects);
        })



        // get data : get a specific project data by id
        app.get('/project/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const project = await projectsCollection.findOne(query);
            res.send(project);
        })

    }

    finally {
        // client.close();
    }
}


run().catch(console.dir);




// Make API : check server root
app.get('/', (req, res) => {
    res.send('Portfolio is running');
})


// listening port
app.listen(port, () => {
    console.log('listening port', port);
})