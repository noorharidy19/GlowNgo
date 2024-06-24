const express = require('express');
const router = express.Router();
const { getCurrencyData } = require('./CurrApi');
const { fetchProducts } = require('./ProductService'); // Assuming you have this function

// CurrApi.js Modifications
const axios = require('axios');

const getCurrencyData = async (toCountryCode) => {
  try {
    const response = await axios.get(`https://api.fastforex.io/fetch-one?from=USD&to=${toCountryCode}&api_key=ede12ea352-07d4e323ca-sfjmvn`);
//     console.log(response.data);`);
    console.log(response.data);
    // Assuming the API response structure: { data: { rate: { EUR: 0.85 } } }
     return response.data.rates; // Return the conversion rate directly
  } catch (error) {
    console.error('Error fetching data from FastForex:', error);
    return null; // Return null in case of error
  }
};

module.exports = { getCurrencyData };