const express = require('express');
const router = express.Router();
const { getCurrencyData } = require('./CurrApi');

router.get('/currency-data', async (req, res) => {
    const countryCode = req.query.country;

    // Validate country code is provided
    if (!countryCode) {
        return res.status(400).send('Country code is required');
    }

    try {
        // Use getCurrencyData to dynamically fetch currency data
        const data = await getCurrencyData(countryCode);
        if (data) {
            res.json(data);
        } else {
            res.status(404).send('Country not found');
        }
    } catch (error) {
        console.error(`Error fetching currency data for ${countryCode}: ${error}`);
        res.status(500).send('Error processing request');
    }
});

module.exports = router;