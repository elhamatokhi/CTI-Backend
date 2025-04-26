import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import router from "./routes/index.js";

// Initializing express app
const app = express();
const PORT = 3000;

// Directory setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(morgan("dev"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Router
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
