const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const { User } = require("../schema");

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

// Generate JWT
function generateToken(user) {
    return jwt.sign({ id: user.id, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: "7d" });
}

// Signup
router.post(
    "/signup",
    [
        body("name").notEmpty(),
        body("email").isEmail(),
        body("password").isLength({ min: 6 }),
        body("phone").optional().isString(),
        body("address").optional().isObject(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        const { name, email, password, role, phone, address } = req.body;
        try {
            const existing = await User.findOne({ email });
            if (existing) return res.status(400).json({ error: "Email already in use" });
            const passwordHash = await bcrypt.hash(password, 10);
            const user = await User.create({ name, email, passwordHash, phone, address, role: role || "adopter" });
            const token = generateToken(user.toJSON());
            res.json({ token, user });
        } catch (e) {
            res.status(500).json({ error: "Signup failed", details: e.message });
        }
    }
);

// Login
router.post(
    "/login",
    [body("email").isEmail(), body("password").isString()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user || !user.passwordHash) return res.status(400).json({ error: "Invalid credentials" });
            const ok = await bcrypt.compare(password, user.passwordHash);
            if (!ok) return res.status(400).json({ error: "Invalid credentials" });
            const token = generateToken(user.toJSON());
            res.json({ token, user });
        } catch (e) {
            res.status(500).json({ error: "Login failed", details: e.message });
        }
    }
);

// Me
router.get("/me", async (req, res) => {
    try {
        const auth = req.headers.authorization || "";
        const token = auth.startsWith("Bearer ") ? auth.substring(7) : null;
        if (!token) return res.status(401).json({ error: "No token" });
        const payload = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(payload.id).lean();
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json({ user });
    } catch (e) {
        res.status(401).json({ error: "Invalid token" });
    }
});

module.exports = router;