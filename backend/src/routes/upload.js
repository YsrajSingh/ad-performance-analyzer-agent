const express = require('express');
const multer = require('multer');
const path = require('path');

// Set up multer storage with custom file naming
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname); // Get file extension
        const fileName = Date.now() + fileExtension; // Use current timestamp to avoid filename conflicts
        cb(null, fileName); // Set the file name with extension
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post('/', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'File not uploaded' });
    }

    res.status(200).json({
        message: 'File uploaded successfully',
        filePath: path.resolve(req.file.path), // Send full file path
    });
});

module.exports = router;
