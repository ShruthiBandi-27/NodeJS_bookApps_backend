import { client } from './index.js';

export async function getAllBooks(req) {
    return await client.db("shruthi").collection("books").find(req.query).toArray();
}
export async function getBookById(id) {
    return await client.db("shruthi").collection("books").findOne({ id: id });
}
export async function deleteBookById(id) {
    return await client.db("shruthi").collection("books").deleteOne({ id: id });
}
export async function updateBookById(id, updateBook) {
    return await client.
        db("shruthi").
        collection("books").
        updateOne({ id: id }, { $set: updateBook });
}
export async function addBooksToDB(newBook) {
    return await client.db("shruthi").collection("books").insertOne(newBook);
}
