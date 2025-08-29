const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
    res.send("BFHL API is running...");
});

// Temporary POST /bfhl for testing
app.post("/bfhl", (req, res) => {
    res.json({ is_success: true, message: "Endpoint working" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
