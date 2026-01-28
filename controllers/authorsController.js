const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAllAuthors = async (req, res, next) => {
  try {
    const authors = await mongodb.getDb().db().collection("authors").find();
    const authorsList = await authors.toArray();
    res.status(200).json(authorsList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAuthorById = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid author ID" });
    }
    const authorId = new ObjectId(req.params.id);
    const author = await mongodb
      .getDb()
      .db()
      .collection("authors")
      .findOne({ _id: authorId });
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.status(200).json(author);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createAuthor = async (req, res, next) => {
  try {
    const newAuthor = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      biography: req.body.biography,
      birthDate: req.body.birthDate,
      nationality: req.body.nationality,
      email: req.body.email,
      website: req.body.website,
    };

    const result = await mongodb
      .getDb()
      .db()
      .collection("authors")
      .insertOne(newAuthor);
    if (result.acknowledged) {
      res
        .status(201)
        .json({ message: "Author created", authorId: result.insertedId });
    } else {
      res.status(500).json({ message: "Failed to create author" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateAuthor = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid author ID" });
    }
    const authorId = new ObjectId(req.params.id);
    const updatedAuthor = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      biography: req.body.biography,
      birthDate: req.body.birthDate,
      nationality: req.body.nationality,
      email: req.body.email,
      website: req.body.website,
    };
    const result = await mongodb
      .getDb()
      .db()
      .collection("authors")
      .updateOne({ _id: authorId }, { $set: updatedAuthor });
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: "Author updated" });
    } else if (result.matchedCount === 0) {
      res.status(404).json({ message: "Author not found" });
    } else {
      res.status(200).json({ message: "Author data unchanged" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteAuthor = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid author ID" });
    }
    const authorId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("authors")
      .deleteOne({ _id: authorId });
    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Author deleted" });
    } else {
      res.status(404).json({ message: "Author not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
