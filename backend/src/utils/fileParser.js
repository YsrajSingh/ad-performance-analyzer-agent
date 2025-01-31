const csv = require('csv-parser');
const fs = require('fs');

const parseCSV = (filePath) => {
    return new Promise((resolve, reject) => {
        const data = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                data.push({
                    product_target: row["Product targets"] || "",
                    impressions: parseInt(row["Impressions"] || 0, 10),
                    clicks: parseInt(row["Clicks"] || 0, 10),
                    conversion_rate: parseFloat(row["Conversion rate"] || 0),
                    roas: parseFloat(row["ROAS"] || 0),
                    acos: parseFloat(row["ACOS"] || 0),
                    ctr: parseFloat(row["CTR"] || 0)
                });
            })
            .on('end', () => resolve(data))
            .on('error', reject);
    });
};

module.exports = { parseCSV };
