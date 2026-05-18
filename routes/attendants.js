const express = require("express");
const router = express.Router();
const {
  createAttendant,
  getAttendants,
} = require("../controllers/attendantController");
const protect = require("../middleware/auth");
const { validateRequiredFields } = require("../middleware/validate");

/**
 * @swagger
 * tags:
 *   name: Attendants
 *   description: Library attendant management
 */

/**
 * @swagger
 * /attendants:
 *   post:
 *     summary: Register a new library attendant (protected)
 *     tags: [Attendants]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, staffId, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jane Doe
 *               staffId:
 *                 type: string
 *                 example: STAFF-001
 *               email:
 *                 type: string
 *                 example: jane@library.edu.ng
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       201:
 *         description: Attendant created
 *       401:
 *         description: Unauthorized
 *
 *   get:
 *     summary: Get all attendants
 *     tags: [Attendants]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of attendants
 */
router
  .route("/")
  .post(protect, validateRequiredFields(["name", "staffId", "email", "password"]), createAttendant)
  .get(protect, getAttendants);

module.exports = router;
