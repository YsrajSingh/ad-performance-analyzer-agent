const express = require('express');
const uploadRoute = require('./routes/upload');
const analyzeRoute = require('./routes/analyze');
const dotenv = require('dotenv');
const cors = require('cors')

const app = express();
app.use(express.json());

const corsOptions = {
    origin: [process.env.FRONTEND_URL],  // Change this to your frontend URL/port
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));  // Apply CORS with specified options


dotenv.config();

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
    });
});
app.use('/upload', uploadRoute);
app.use('/analyze', analyzeRoute);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
