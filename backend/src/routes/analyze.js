const express = require('express');
const fs = require('fs');
const path = require('path');
const { adAnalysisAgent } = require('../agents/adAnalysisAgent');
const { parseCSV } = require('../utils/fileParser');

const router = express.Router();

router.post('/', async (req, res) => {
    const { filePath } = req.body;

    // Validate file path
    if (!filePath || typeof filePath !== 'string') {
        return res.status(400).json({ error: 'Invalid file path provided' });
    }

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
        return res.status(400).json({ error: 'File does not exist at the provided path' });
    }

    // Check if the file is a CSV
    if (path.extname(filePath).toLowerCase() !== '.csv') {
        return res.status(400).json({ error: 'File must be a CSV' });
    }

    try {
        // Parse and analyze the CSV file
        const adData = await parseCSV(filePath);

        // Perform ad analysis and generate summary
        const summary = await adAnalysisAgent(adData);

        res.status(200).json({ summary });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error processing ad data' });
    }
});

module.exports = router;
