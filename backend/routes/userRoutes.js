const express = require("express");
const router = express.Router();
const { User, Entity } = require("../schema");

// ✅ Fetch all users (Fixes "404 Not Found" error)
router.get("/", async (req, res) => {
    try {
        const users = await User.find({}, "name email").lean();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users.", details: error.message });
    }
});

// ✅ Fetch entities by user ID
router.get("/user/:userId", async (req, res) => {
    try {
        const entities = await Entity.find({ created_by: req.params.userId }).lean();
        res.json(entities);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch entities.", details: error.message });
    }
});

module.exports = router;
