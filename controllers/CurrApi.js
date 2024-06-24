
// const axios = require('axios');

// const getCurrencyData = async (toCountryCode) => {
//   try {
//     const response = await axios.get(`https://api.fastforex.io/fetch-one?from=USD&to=${toCountryCode}&api_key=ede12ea352-07d4e323ca-sfjmvn`);
//     console.log(response.data);
//     // Assuming the API response structure: { data: { rate: { EUR: 0.85 } } }
//     const conversionRate = response.data.rate[toCountryCode];
//     return conversionRate; // Return the conversion rate directly
//   } catch (error) {
//     console.error('Error fetching data from FastForex:', error);
//     return null; // Return null in case of error
//   }
// };

// module.exports = { getCurrencyData };