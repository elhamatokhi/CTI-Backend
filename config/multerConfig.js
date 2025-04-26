import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Derive __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer configuration for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Path for uploads directory
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Keep the original file name
  },
});

// File filter to accept only image files
const fileFilter = function (req, file, cb) {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // Accept image files
  } else {
    cb(new Error("Only image files are allowed!"), false); // Reject non-image files
  }
};

// Create multer instance with storage and file filter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default upload;
