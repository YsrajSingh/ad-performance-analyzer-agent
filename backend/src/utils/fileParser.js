const csv = require('csv-parser');
const fs = require('fs');

// Function to parse the CSV and check for required columns
const parseCSV = (filePath) => {
    return new Promise((resolve, reject) => {
        const keywords = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => keywords.push(row))
            .on('end', () => {
                resolve(keywords);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};

module.exports = { parseCSV };
