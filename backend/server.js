const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const multer = require("multer");
const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const letterRoutes = require("./routes/letterRoutes");

dotenv.config();
const app = express();

// 🔹 Fix CORS for Local & Deployed URLs
const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:4000"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.json());

// 🔹 Session & Authentication
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// 🔹 Google OAuth2 Client for Google Drive
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const drive = google.drive({ version: "v3", auth: oauth2Client });

// 🔹 Multer for File Uploads
const upload = multer({ dest: "uploads/" });

/* ===========================
✅ Save Text Content to Google Drive
=========================== */
app.post("/api/save", async (req, res) => {
  try {
    const { content, userEmail } = req.body;

    if (!content || !userEmail) {
      return res.status(400).json({ error: "Missing content or user email" });
    }

    // Create a temporary file to save content
    const filePath = path.join(__dirname, "temp_letter.txt");
    fs.writeFileSync(filePath, content);

    const fileMetadata = {
      name: "My_Letter.txt",
      mimeType: "text/plain",
      parents: [process.env.GOOGLE_DRIVE_FOLDER_ID], // Use folder ID from .env
    };

    const media = {
      mimeType: "text/plain",
      body: fs.createReadStream(filePath),
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: "id",
    });

    // Cleanup: Remove temp file after upload
    fs.unlinkSync(filePath);

    res.json({ message: "Saved successfully!", fileId: response.data.id });
  } catch (error) {
    console.error("Error saving to Google Drive:", error);
    res.status(500).json({ error: "Error saving to Google Drive" });
  }
});

/* ===========================
✅ Upload File to Google Drive
=========================== */
app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    const fileMetadata = { name: req.file.originalname };
    const media = {
      mimeType: req.file.mimetype,
      body: fs.createReadStream(req.file.path),
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: "id",
    });

    fs.unlinkSync(req.file.path); // Delete file after upload
    res.json({
      fileId: response.data.id,
      message: "File uploaded to Google Drive!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "File upload failed" });
  }
});

/* ===========================
✅ Letter Routes (with `/api`)
=========================== */
app.use("/api/letter", letterRoutes);

// 🔹 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
