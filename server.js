const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// Mount routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);
// const bookRoutes = require("./routes/bookRoutes");
// app.use("/api/products", bookRoutes);
// const productRoutes = require("./routes/profileRoutes");
// app.use("/api/products", productRoutes);

// Health
app.get("/api/status", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() })
});

// 404
app.use((req, res) => res.status(404).json({ error: "Route inconnue" }));

// Error handler
app.use((err, req, res, next) => {
    console.error("Erreur serveur:", err.message);
    res.status(500).json({ error: "Erreur interne serveur" });
});

app.listen(PORT, () => console.log(`API prête sur http://localhost:${PORT}`));