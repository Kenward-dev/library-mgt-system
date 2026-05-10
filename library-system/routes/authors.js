const express = require("express");
const router = express.Router();
const {
  createAuthor,
  getAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/authorController");
const protect = require("../middleware/auth");
const { validateObjectId, validateRequiredFields } = require("../middleware/validate");

/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: Author management
 */

/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Create a new author
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Chinua Achebe
 *               bio:
 *                 type: string
 *                 example: Nigerian novelist and poet
 *     responses:
 *       201:
 *         description: Author created
 *       401:
 *         description: Unauthorized
 *
 *   get:
 *     summary: Get all authors (paginated)
 *     tags: [Authors]
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
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of authors
 */
router
  .route("/")
  .post(protect, validateRequiredFields(["name"]), createAuthor)
  .get(getAuthors);

/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Get a single author
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Author details
 *       404:
 *         description: Author not found
 *
 *   put:
 *     summary: Update an author
 *     tags: [Authors]
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
 *               name:
 *                 type: string
 *               bio:
 *                 type: string
 *     responses:
 *       200:
 *         description: Author updated
 *       404:
 *         description: Author not found
 *
 *   delete:
 *     summary: Delete an author
 *     tags: [Authors]
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
 *         description: Author deleted
 *       404:
 *         description: Author not found
 */
router
  .route("/:id")
  .get(validateObjectId("id"), getAuthorById)
  .put(protect, validateObjectId("id"), updateAuthor)
  .delete(protect, validateObjectId("id"), deleteAuthor);

module.exports = router;
