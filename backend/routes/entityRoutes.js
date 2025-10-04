const express = require("express");
const router = express.Router();
const { User, Entity, Pet } = require("../schema");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// Fetch entities (optionally by user)
router.get("/", async (req, res) => {
    try {
        const { user } = req.query;
        const filter = user ? { created_by: user } : {};
        const entities = await Entity.find(filter).lean();
        res.json(entities);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch entities." });
    }
});

// Fetch entities by user id (legacy path)
router.get("/:userId", async (req, res) => {
    try {
        const entities = await Entity.find({ created_by: req.params.userId }).lean();
        res.json(entities);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch entities by user." });
    }
});

// Delete entity by id
router.delete("/:id", async (req, res) => {
    try {
        await Entity.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete entity." });
    }
});

module.exports = router;
