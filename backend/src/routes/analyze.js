const express = require('express');
const fs = require('fs');
const path = require('path');
const { adAnalysisAgent } = require('../agents/adAnalysisAgent');
const { parseCSV } = require('../utils/fileParser');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { filePath } = req.body;

        if (!filePath || typeof filePath !== 'string') {
            return res.status(400).json({ error: 'Invalid file path' });
        }

        if (!fs.existsSync(filePath)) {
            return res.status(400).json({ error: 'File does not exist' });
        }

        if (path.extname(filePath).toLowerCase() !== '.csv') {
            return res.status(400).json({ error: 'Only CSV files are supported' });
        }

        // Parse and process CSV
        const adData = await parseCSV(filePath);
        if (!adData.length) {
            return res.status(400).json({ error: 'CSV is empty or incorrectly formatted' });
        }

        // Generate analysis
        const summary = await adAnalysisAgent(adData);
        res.status(200).json({ summary });

    } catch (error) {
        console.error("Error processing ad data:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
