const express = require("express");
const router = express.Router();
const { Pet } = require("../schema");
const { body, validationResult } = require("express-validator");

// Create pet listing (owner)
router.post(
    "/",
    [
        body("name").notEmpty(),
        body("type").isIn(["dog", "cat", "bird", "rabbit", "other"]),
        body("vaccinated").optional().isBoolean(),
        body("color").optional().isString(),
        body("nature").optional().isString(),
        body("likes").optional().isArray(),
        body("dislikes").optional().isArray()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        try {
            const owner = req.body.owner || req.user?.id; // placeholder if auth middleware later
            const pet = await Pet.create({ ...req.body, owner });
            res.json(pet);
        } catch (e) {
            res.status(500).json({ error: "Failed to create pet", details: e.message });
        }
    }
);

// Search/filter pets for adopters and marketplace
router.get("/", async (req, res) => {
    try {
        const { type, breed, minAge, maxAge, size, location, vaccinated, spayedNeutered, q, color, nature, isForSale, minPrice, maxPrice, sort } = req.query;
        const filter = { status: "available" };
        if (type) filter.type = type;
        if (breed) filter.breed = new RegExp(breed, "i");
        if (size) filter.size = size;
        if (location) filter.location = new RegExp(location, "i");
        if (color) filter.color = new RegExp(color, "i");
        if (nature) filter.nature = new RegExp(nature, "i");
        if (vaccinated !== undefined) filter.vaccinated = vaccinated === "true";
        if (spayedNeutered !== undefined) filter.spayedNeutered = spayedNeutered === "true";
        if (isForSale !== undefined) filter.isForSale = isForSale === "true";
        if (minAge || maxAge) filter.age = {};
        if (minAge) filter.age.$gte = Number(minAge);
        if (maxAge) filter.age.$lte = Number(maxAge);
        if (minPrice || maxPrice) filter.price = {};
        if (minPrice) filter.price.$gte = Number(minPrice);
        if (maxPrice) filter.price.$lte = Number(maxPrice);
        if (q) filter.$or = [{ name: new RegExp(q, "i") }, { breed: new RegExp(q, "i") }];
        
        let query = Pet.find(filter).lean();
        
        // Apply sorting
        if (sort) {
            switch (sort) {
                case 'newest':
                    query = query.sort({ createdAt: -1 });
                    break;
                case 'oldest':
                    query = query.sort({ createdAt: 1 });
                    break;
                case 'price-low':
                    query = query.sort({ price: 1 });
                    break;
                case 'price-high':
                    query = query.sort({ price: -1 });
                    break;
                case 'name':
                    query = query.sort({ name: 1 });
                    break;
                default:
                    query = query.sort({ createdAt: -1 });
            }
        } else {
            query = query.sort({ createdAt: -1 });
        }
        
        const pets = await query;
        res.json(pets);
    } catch (e) {
        res.status(500).json({ error: "Failed to fetch pets" });
    }
});

// Owner updates their pet
router.put("/:id", async (req, res) => {
    try {
        const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(pet);
    } catch (e) {
        res.status(500).json({ error: "Failed to update pet" });
    }
});

// Get single pet by ID
router.get("/:id", async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id).populate('owner', 'name email');
        if (!pet) return res.status(404).json({ error: "Pet not found" });
        res.json(pet);
    } catch (e) {
        res.status(500).json({ error: "Failed to fetch pet" });
    }
});

// Get pets by user ID
router.get("/user/:userId", async (req, res) => {
    try {
        const pets = await Pet.find({ owner: req.params.userId }).sort({ createdAt: -1 });
        res.json(pets);
    } catch (e) {
        res.status(500).json({ error: "Failed to fetch user pets" });
    }
});

// Delete pet
router.delete("/:id", async (req, res) => {
    try {
        await Pet.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (e) {
        res.status(500).json({ error: "Failed to delete pet" });
    }
});

module.exports = router;
