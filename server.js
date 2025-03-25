import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import mongoose from "mongoose";
import dotenv from "dotenv";
import db from "./db.js";
// Load .env variables
dotenv.config();

const host = "localhost";
const port = 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/carRentalDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB error:", err));

// Define Car Schema
const carSchema = new mongoose.Schema({
    model: String,
    brand: String,
    available: Boolean,
    pricePerDay: Number,
});
const Car = mongoose.model("Car", carSchema);

// Main request handler
const requestListener = async (req, res) => {
    // -------------------------
    // Handle API Routes
    // -------------------------
    if (req.url === "/api/cars" && req.method === "GET") {
        const [rows] = await db.query("SELECT * FROM cars");
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(rows));
        return;
    }
    
    if (req.url === "/api/cars/available" && req.method === "GET") {
        const [rows] = await db.query("SELECT * FROM cars WHERE available = 1");
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(rows));
        return;
    }
    
    if (req.url.startsWith("/api/cars/") && req.url.endsWith("/availability") && req.method === "PUT") {
        const id = req.url.split("/")[3];
        let body = "";
        req.on("data", chunk => body += chunk);
        req.on("end", async () => {
            try {
                const { available } = JSON.parse(body);
                await db.query("UPDATE cars SET available = ? WHERE id = ?", [available, id]);
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ success: true }));
            } catch (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: "SQL error" }));
            }
        });
        return;
    }

        // Unknown API route
        res.writeHead(404);
        res.end(JSON.stringify({ error: "API route not found" }));
        return;
    }

    // -------------------------
    // Serve Static Files
    // -------------------------
    let filePath = path.join(__dirname, req.url);
    if (req.url === "/" || req.url === "/index.html") {
        filePath = path.join(__dirname, "index.html");
    }

    if (fs.existsSync(filePath)) {
        const ext = path.extname(filePath).toLowerCase();
        const contentTypes = {
            ".html": "text/html",
            ".css": "text/css",
            ".js": "text/javascript",
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".png": "image/png",
            ".webp": "image/webp",
            ".gif": "image/gif",
        };
        const contentType = contentTypes[ext] || "application/octet-stream";
        res.setHeader("Content-Type", contentType);
        res.writeHead(200);
        fs.createReadStream(filePath).pipe(res);
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
    }
};

// Create and start server
const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
});
