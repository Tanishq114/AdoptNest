const express = require("express");
const router = express.Router();
const { AdoptionRequest, Pet } = require("../schema");
const { body, validationResult } = require("express-validator");

// Create adoption request
router.post(
    "/",
    [body("pet").notEmpty(), body("owner").notEmpty(), body("adopter").notEmpty()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        try {
            const request = await AdoptionRequest.create(req.body);
            res.json(request);
        } catch (e) {
            res.status(500).json({ error: "Failed to create request", details: e.message });
        }
    }
);

// List requests for an owner or adopter
router.get("/", async (req, res) => {
    try {
        const { owner, adopter, pet } = req.query;
        const filter = {};
        if (owner) filter.owner = owner;
        if (adopter) filter.adopter = adopter;
        if (pet) filter.pet = pet;
        const requests = await AdoptionRequest.find(filter).populate("pet").lean();
        res.json(requests);
    } catch (e) {
        res.status(500).json({ error: "Failed to fetch requests" });
    }
});

// Owner updates status (accept/reject)
router.patch("/:id/status", async (req, res) => {
    try {
        const { status } = req.body;
        if (!["pending", "accepted", "rejected"].includes(status)) return res.status(400).json({ error: "Invalid status" });
        const request = await AdoptionRequest.findByIdAndUpdate(req.params.id, { status }, { new: true });
        // If accepted, mark pet pending or adopted
        if (status === "accepted") {
            await Pet.findByIdAndUpdate(request.pet, { status: "pending" });
        }
        res.json(request);
    } catch (e) {
        res.status(500).json({ error: "Failed to update request" });
    }
});

module.exports = router;

