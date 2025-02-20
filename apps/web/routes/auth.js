const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth/authController");
const logoutController = require("../controllers/auth/logoutController");
const registerController = require("../controllers/auth/registerController");
const refreshTokenController = require("../controllers/auth/refreshTokenController");
const { checkUserData } = require("../middleware/verifyModelData/User");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and authorization
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *               password:
 *                 type: string
 *                 description: The user's password
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: The JWT access token
 *       400:
 *         description: Email and password are required
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 */
router.route("/login").post(authController.handleLogin);

/**
 * @swagger
 * /api/auth/logout:
 *   get:
 *     summary: Logout a user
 *     tags: [Auth]
 *     responses:
 *       204:
 *         description: Successful logout, no content
 *       500:
 *         description: Internal server error
 */
router.route("/logout").get(logoutController.handleLogout);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *                 description: The user's first name
 *               email:
 *                 type: string
 *                 description: The user's email
 *               password:
 *                 type: string
 *                 description: The user's password
 *             required:
 *               - nickname
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: nickname, email, and password are required
 *       409:
 *         description: Email already in use
 *       500:
 *         description: Internal server error
 */
router.route("/register").post(checkUserData, registerController.handleNewUser);

/**
 * @swagger
 * /api/auth/refreshToken:
 *   get:
 *     summary: Refresh the access token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Access token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: The new JWT access token
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
router.route("/refreshToken").get(refreshTokenController.handleRefreshToken);

module.exports = router;
