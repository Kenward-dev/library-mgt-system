const express = require("express");
const router = express.Router();
const {
  createStudent,
  getStudents,
  getStudentById,
} = require("../controllers/studentController");
const { validateObjectId, validateRequiredFields } = require("../middleware/validate");

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Student management
 */

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Register a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, studentId]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Amaka Obi
 *               email:
 *                 type: string
 *                 example: amaka@school.edu.ng
 *               studentId:
 *                 type: string
 *                 example: STU-2024-001
 *     responses:
 *       201:
 *         description: Student registered
 *       409:
 *         description: Duplicate email or studentId
 *
 *   get:
 *     summary: Get all students (paginated)
 *     tags: [Students]
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
 *         description: List of students
 */
router
  .route("/")
  .post(validateRequiredFields(["name", "email", "studentId"]), createStudent)
  .get(getStudents);

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Get a student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student details
 *       404:
 *         description: Student not found
 */
router.get("/:id", validateObjectId("id"), getStudentById);

module.exports = router;
