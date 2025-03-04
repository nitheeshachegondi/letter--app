const express = require("express");
const { google } = require("googleapis");

const router = express.Router();

router.post("/save", async (req, res) => {
  const { accessToken, content } = req.body;
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  const drive = google.drive({ version: "v3", auth });
  const fileMetadata = {
    name: "Letter.doc",
    mimeType: "application/vnd.google-apps.document",
  };
  const media = { mimeType: "text/plain", body: content };

  try {
    const response = await drive.files.create({
      resource: fileMetadata,
      media,
      fields: "id",
    });
    res.json({ message: "Letter saved!", fileId: response.data.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
