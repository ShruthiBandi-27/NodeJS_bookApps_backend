//const express = require('express');
//const { MongoClient } = require('mongodb');

import express from 'express';
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv' ;
dotenv.config();

const app = express();
const PORT = 7000;
//const MONGO_URL = 'mongodb://127.0.0.1:27017';
const MONGO_URL = process.env.MONGO_URL;
//console.log(process.env);

//create connection
async function createConnection() {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Connected to mongodb");
    return client;
}

const client = await createConnection();
app.use(express.json());

app.get("/", (req, res) => {
    //res.send("Hello, Shruthi. Welcom to Node.js");
    res.send("<h1>Hello, Shruthi😊<br> Welcom to Node.js💕</h1>");
})

//get all books
app.get("/books", async(req, res) => {
    // console.log(`req.query=${req.query}`);
    //const { language, rating } = req.query;
    // if (req.query.rating) {
    //     req.query.rating = +req.query.rating;
    //   }
    //   console.log(req.query, language);
    const books = await client.db("shruthi").collection("books").find(req.query).toArray();
    res.send(books);
})

//get books by id
app.get("/books/:id", async (req,res) => {
    const { id } = req.params;
    const book = await client.db("shruthi").collection("books").findOne({id: id});
    book ? res.send(book) : res.status(404).send({message: "Book not found"});
})

//delete book by id
app.delete("/books/:id", async (req,res) => {
    const { id } = req.params;
    const book = await client.db("shruthi").collection("books").deleteOne({id: id});
    book ? res.send(book) : res.status(404).send({message: "Book not found"});
})

//update book by id
app.put("/books/:id", async (req, res) => {
    const { id } = req.params;
    const updateBook= req.body;
    console.log(updateBook);
    const result = await client.db("shruthi").collection("books").updateOne({id: id},{$set: updateBook});
    res.send(result);
} )

//Add books
app.post("/books", async (req, res) => {
    const newBook = req.body;
    console.log(req.body);
    console.log(req.body);
    const result = await client.db("shruthi").collection("books").insertMany(newBook);
    res.send(result); 
})

app.listen(PORT, () => {
    console.log(`The server is listing on port ${PORT}`);
})

console.log("end of index.js");


//import these in index.js
// import jwt from "jsonwebtoken";
// import { auth } from "./middleware/auth.js";
// import nodemailer from "nodemailer";

//create custom middleware 
// middleware-> auth.js

//custom middleware

// import jwt from 'jsonwebtoken';

// export const auth = (req, res, next) => {
//     try{
//     const token = req.header("x-auth-token");
//     console.log(token);
//     jwt.verify(token, process.env.SECRET_KEY);
//     next();
//     }
//     catch(err){
//         res.send({message: err.message});
//     }
// }