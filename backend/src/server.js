const express = require('express');
const uploadRoute = require('./routes/upload');
const analyzeRoute = require('./routes/analyze');
const dotenv = require('dotenv');

const app = express();
app.use(express.json());

dotenv.config();

app.use('/upload', uploadRoute);
app.use('/analyze', analyzeRoute);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
