require("dotenv").config(); // Load environment variables
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const entityRoutes = require("./routes/entityRoutes");
const authRoutes = require("./routes/authRoutes");
const petRoutes = require("./routes/petRoutes");
const adoptionRoutes = require("./routes/adoptionRoutes");
const { connectMongoDB } = require("./schema");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true
}));

// ✅ Debugging Log (Ensure server is receiving requests)
app.use((req, res, next) => {
    console.log(`📢 [${req.method}] ${req.path}`);
    next();
});

// ✅ Routes
app.use("/api/users", userRoutes);  // Fetch all users for dropdown
app.use("/api/entities", entityRoutes);  // Fetch entities by user ID
app.use("/api/auth", authRoutes);  // Authentication routes
app.use("/api/pets", petRoutes);   // Pet listings
app.use("/api/adoptions", adoptionRoutes); // Adoption requests

// ✅ Connect to MongoDB only
connectMongoDB();

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
