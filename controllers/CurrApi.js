const axios = require('axios');

const getCurrencyData = async (fromCountryCode, toCountryCode) => {
  try {
    const response = await axios.get(`https://api.fastforex.io/fetch-one?from=${fromCountryCode}&to=${toCountryCode}&api_key=ede12ea352-07d4e323ca-sfjmvn`);
    console.log(response.data);
    // Process the data as needed
  } catch (error) {
    console.error('Error fetching data from FastForex:', error);
  }
};

// Example usage: converting from USD to EUR
getCurrencyData('USD', 'EUR');



module.exports = { getCurrencyData };
