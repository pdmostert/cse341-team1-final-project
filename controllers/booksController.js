const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAllBooks = async (req, res, next) => {
  try {
    const books = await mongodb.getDb().db().collection("books").find();
    const booksList = await books.toArray();
    res.status(200).json(booksList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getBookById = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }
    const bookId = new ObjectId(req.params.id);
    const book = await mongodb
      .getDb()
      .db()
      .collection("books")
      .findOne({ _id: bookId });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createBook = async (req, res, next) => {
  try {
    const newBook = {
      title: req.body.title,
      authorId: req.body.authorId,
      isbn: req.body.isbn,
      publishedDate: req.body.publishedDate,
      publisher: req.body.publisher,
      genre: req.body.genre,
      pageCount: req.body.pageCount,
      language: req.body.language,
      description: req.body.description,
      price: req.body.price,
      inStock: req.body.inStock,
    };
    const result = await mongodb
      .getDb()
      .db()
      .collection("books")
      .insertOne(newBook);
    if (result.acknowledged) {
      res
        .status(201)
        .json({ message: "Book created", bookId: result.insertedId });
    } else {
      res.status(500).json({ message: "Failed to create book" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateBook = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }
    const bookId = new ObjectId(req.params.id);
    const updatedBook = {
      title: req.body.title,
      authorId: req.body.authorId,
      isbn: req.body.isbn,
      publishedDate: req.body.publishedDate,
      publisher: req.body.publisher,
      genre: req.body.genre,
      pageCount: req.body.pageCount,
      language: req.body.language,
      description: req.body.description,
      price: req.body.price,
      inStock: req.body.inStock,
    };
    const result = await mongodb
      .getDb()
      .db()
      .collection("books")
      .updateOne({ _id: bookId }, { $set: updatedBook });
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: "Book updated" });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteBook = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }
    const bookId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("books")
      .deleteOne({ _id: bookId });
    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Book deleted" });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
