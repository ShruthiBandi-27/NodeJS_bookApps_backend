//const express = require('express');
//const { MongoClient } = require('mongodb');

import express from 'express';
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv' ;
dotenv.config();
import { booksRouter } from './routes/books.js';

const app = express();
const PORT = 7000;
//const MONGO_URL = 'mongodb://127.0.0.1:27017';
const MONGO_URL = process.env.MONGO_URL;

//create connection
async function createConnection() {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Connected to mongodb");
    return client;
}

export const client = await createConnection();
app.use(express.json());

app.get("/", (req, res) => {
    //res.send("Hello, Shruthi. Welcom to Node.js");
    res.send("<h1>Hello, Shruthi😊<br> Welcom to Node.js💕</h1>");
})

app.use("/books", booksRouter);

app.listen(PORT, () => {
    console.log(`The server is listing on port ${PORT}`);
})

console.log("end of index.js");



