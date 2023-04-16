import express from 'express';
import { getAllBooks, getBookById, deleteBookById, updateBookById, addBooksToDB } from '../helper.js';
const router = express.Router();

//get all books
router.get("/", async(req, res) => {
    const { language, rating } = req.query;
    if (req.query.rating) {
        req.query.rating = +req.query.rating;
      }
      console.log(req.query, language);
    const books = await getAllBooks(req);
    res.send(books);
})

//get books by id
router.get("/:id", async (req,res) => {
    const { id } = req.params;
    const book = await getBookById(id);
    book ? res.send(book) : res.status(404).send({message: "Book not found"});
})

//delete book by id
router.delete("/:id", async (req,res) => {
    const { id } = req.params;
    const book = await deleteBookById(id);
    book ? res.send(book) : res.status(404).send({message: "Book not found"});
})

//update book by id
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updateBook= req.body;
    console.log(updateBook);
    const result = await updateBookById(id, updateBook);
    res.send(result);
} )

//Add books
router.post("/", async (req, res) => {
    const newBook = req.body;
    console.log(req.body);
    console.log(req.body);
    const result = await addBooksToDB(newBook);
    res.send(result); 
})

export const booksRouter = router;








