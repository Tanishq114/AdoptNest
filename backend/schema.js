const mongoose = require("mongoose");
require("dotenv").config();

// MongoDB Connection Only
const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1);
    }
};

// User Schema (Mongo)
const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        passwordHash: { type: String, required: false },
        role: { type: String, enum: ["adopter", "owner", "admin"], default: "adopter" },
        age: { type: Number, required: false, min: 0 },
        phone: { type: String, required: false },
        address: {
            line1: { type: String, required: false },
            city: { type: String, required: false },
            state: { type: String, required: false },
            zip: { type: String, required: false }
        }
    },
    { timestamps: true }
);

// Ensure id virtual mirrors _id for frontend compatibility
userSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
    }
});

const User = mongoose.model("User", userSchema);

// Entity Schema (Mongo)
const entitySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        price: { type: Number },
        created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
    },
    { timestamps: true }
);

entitySchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
    }
});

const Entity = mongoose.model("Entity", entitySchema);

// Pet Schema for adoption listings and marketplace
const petSchema = new mongoose.Schema(
    {
        owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        name: { type: String, required: true },
        type: { type: String, enum: ["dog", "cat", "bird", "rabbit", "other"], required: true },
        breed: { type: String },
        age: { type: Number, min: 0 },
        size: { type: String, enum: ["small", "medium", "large"], default: "medium" },
        location: { type: String },
        vaccinated: { type: Boolean, default: false },
        spayedNeutered: { type: Boolean, default: false },
        healthNotes: { type: String },
        color: { type: String },
        nature: { type: String },
        likes: [{ type: String }],
        dislikes: [{ type: String }],
        images: [{ type: String }],
        status: { type: String, enum: ["available", "pending", "adopted", "sold"], default: "available" },
        // Marketplace features
        price: { type: Number, min: 0 },
        isForSale: { type: Boolean, default: false },
        description: { type: String },
        contactInfo: { type: String },
        featured: { type: Boolean, default: false }
    },
    { timestamps: true }
);

petSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
    }
});

const Pet = mongoose.model("Pet", petSchema);

// Adoption Request Schema
const adoptionRequestSchema = new mongoose.Schema(
    {
        pet: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
        owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        adopter: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        message: { type: String },
        status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" }
    },
    { timestamps: true }
);

adoptionRequestSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
    }
});

const AdoptionRequest = mongoose.model("AdoptionRequest", adoptionRequestSchema);

module.exports = { connectMongoDB, User, Entity, Pet, AdoptionRequest };
