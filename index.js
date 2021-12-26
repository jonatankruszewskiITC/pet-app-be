const express = require('express');
const cors = require('cors');
const { MongoClient } = require("mongodb");

require('dotenv').config()
const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    res.send({ hello: "world" })
})

app.get('/getpets', async (req, res) => {
    try {
        const pet = await petsCollection.findOne();
        return res.send(pet)
    } catch (error) {
        res.send(err.message || 'An error occured')
    }
})

let petsCollection;

const client = new MongoClient(process.env.MONGO_URI);
async function run() {
    try {
        await client.connect();
        const database = client.db('pets');
        petsCollection = database.collection('petsData');
        app.listen(PORT, () => {
            if (process.env.NODE_ENV !== "production") {
                console.log(`listening on http://localhost:${PORT}`)
            }
        })
    } catch (err) {
        console.log('An error occured')
        process.exit(1);
    }
}

run();

