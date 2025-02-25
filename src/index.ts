import express from "express";
import referRouter from "./routes/referRouter";
import cors from "cors";

const app = express();
const port = process.env.PORT || 4000;

// Enable CORS for all requests
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Use the referRouter for handling referral-related routes
app.use("/api", referRouter); // Prefixing routes with "/api" for better structure

// Root route
app.get("/", (req, res) => {
  res.send("Hello, refer-backend!");
});

// Start server
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
