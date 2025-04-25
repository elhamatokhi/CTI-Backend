import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";
import routes from "./routes/index.js";

//  Initializing express app
const app = express();
const PORT = 3000;

// __dirname Setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
// app.use(morgan("dev"));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// Routes
app.use("/", routes);

// Sever
app.listen(PORT, () => {
  console.log(`The Server is listening on port ${PORT}`);
});
