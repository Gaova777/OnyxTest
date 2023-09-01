const express = require("express");

const BooksService = require("../services/books.service.js");
const validatorHandler = require("../middlewares/validator.handler.js");

const {
  createBookSchema,
  updateBooktSchema,
  getBookSchema,
  queryBookSchema,
} = require("../schemas/books.schema.js");

const router = express.Router();
const service = new BooksService();

router.get(
  "/",
  async (req, res, next) => {
    try {
      const books = await service.find(req.query);
      res.json(books);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:title"
  ,validatorHandler(queryBookSchema,'query'),
  async (req, res, next) => {
    try {
      const books = await service.find(req.query);
      res.json(books);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  validatorHandler(getBookSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(createBookSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newBook = await service.create(body);
      res.status(201).json(newBook);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getBookSchema, "params"),
  validatorHandler(updateBooktSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const book = await service.update(id, body);
      res.json(book);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  validatorHandler(getBookSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json(id);
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router