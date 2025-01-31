const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { adAnalysisAgent } = require('../agents/adAnalysisAgent');
const { parseCSV } = require('../utils/fileParser');
const { v1: uuid } = require('uuid');

const router = express.Router();
router.use(cors());

const sessions = new Map();

router.post('/', async (req, res) => {
    try {
        const { filePath } = req.body;
        if (!filePath || typeof filePath !== 'string' || !fs.existsSync(filePath) || path.extname(filePath).toLowerCase() !== '.csv') {
            return res.status(400).json({ error: 'Invalid or missing CSV file' });
        }

        const sessionId = uuid();
        const adData = await parseCSV(filePath);
        
        sessions.set(sessionId, {
            analysisQueue: adData,
            stream: null,
            completed: false
        });

        res.json({ sessionId }); 
    } catch (error) {
        console.error("Error processing ad data:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/stream/:sessionId', async (req, res) => {
    const { sessionId } = req.params;
    if (!sessions.has(sessionId)) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.write('data: {"error": "Invalid session or session expired"}\n\n');
        return res.end(); // Ensure the stream closes properly
    }

    const session = sessions.get(sessionId);
    res.setHeader('Content-Type', 'text/event-stream');  // ✅ Set this header properly
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    try {
        await adAnalysisAgent(session.analysisQueue, async (chunk) => {
            if (!session.completed && chunk && typeof chunk === 'string') {
                res.write(`data: ${JSON.stringify({ summary: chunk })}\n\n`);
            }
        });

        res.write('data: {"done": true}\n\n');
        session.completed = true;
    } catch (error) {
        res.write('data: {"error": "Analysis failed"}\n\n');
    } finally {
        res.end(); // 🚀 **Ensure the stream properly closes**
        sessions.delete(sessionId); // Optional: Remove session to prevent memory leaks
    }
});

module.exports = router;
