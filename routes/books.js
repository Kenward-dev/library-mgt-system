const express = require("express");
const router = express.Router();
const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,
} = require("../controllers/bookController");
const protect = require("../middleware/auth");
const { validateObjectId, validateRequiredFields } = require("../middleware/validate");

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management and borrowing
 */

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, isbn]
 *             properties:
 *               title:
 *                 type: string
 *                 example: Things Fall Apart
 *               isbn:
 *                 type: string
 *                 example: 978-0385474542
 *               authors:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["64a7f2c3e12a4b5c6d7e8f90"]
 *     responses:
 *       201:
 *         description: Book created
 *
 *   get:
 *     summary: Get all books with filters
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Search by title
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: Search by author name
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [IN, OUT]
 *         description: Filter by availability
 *     responses:
 *       200:
 *         description: Paginated list of books
 */
router
  .route("/")
  .post(protect, validateRequiredFields(["title", "isbn"]), createBook)
  .get(getBooks);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID (includes borrow details if OUT)
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book details with optional active transaction
 *       404:
 *         description: Book not found
 *
 *   put:
 *     summary: Update a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               isbn:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book updated
 *
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted
 */
router
  .route("/:id")
  .get(validateObjectId("id"), getBookById)
  .put(protect, validateObjectId("id"), updateBook)
  .delete(protect, validateObjectId("id"), deleteBook);

/**
 * @swagger
 * /books/{id}/borrow:
 *   post:
 *     summary: Borrow a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [studentId, attendantId, returnDate]
 *             properties:
 *               studentId:
 *                 type: string
 *                 example: 64a7f2c3e12a4b5c6d7e8f91
 *               attendantId:
 *                 type: string
 *                 example: 64a7f2c3e12a4b5c6d7e8f92
 *               returnDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-06-01
 *     responses:
 *       201:
 *         description: Book borrowed successfully
 *       400:
 *         description: Book already borrowed
 *       404:
 *         description: Book not found
 */
router.post(
  "/:id/borrow",
  protect,
  validateObjectId("id"),
  validateRequiredFields(["studentId", "attendantId", "returnDate"]),
  borrowBook
);

/**
 * @swagger
 * /books/{id}/return:
 *   post:
 *     summary: Return a borrowed book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book returned successfully
 *       400:
 *         description: Book is not currently borrowed
 *       404:
 *         description: Book not found
 */
router.post("/:id/return", protect, validateObjectId("id"), returnBook);

module.exports = router;
