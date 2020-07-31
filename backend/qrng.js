const axios = require('axios');

const API_URL = "https://qrng.anu.edu.au/API/jsonI.php?type=hex16&length=1"

/**
 * Returns an integer in the range [0, numClasses)
 */
async function getQuantumRandom(numClasses) {
  console.log('\nGetting random number x, such that 0 <= x < ' + numClasses);
  const numBits = Math.ceil(Math.log2(numClasses));
  const numBytes = Math.ceil(numBits / 8); // The QRNG API returns bytes
  const numExtraBits = numBytes * 8 - numBits;
  const fullUrl = API_URL + '&size=' + numBytes;

  let resultInt = numClasses;
  // Keep getting numbers until it's in the range we need. Credit to Henry Wisniewski for this idea.
  while (resultInt >= numClasses) {
    const response = await axios.get(fullUrl);
    const data = response.data;
    console.log(data);
    if (data.success === true && data.type === 'string' && data.length === 1 && data.size === numBytes) {
      resultInt = parseInt(data.data, 16);
      console.log(resultInt);
      resultInt = resultInt >>> numExtraBits;
      console.log(resultInt);
    } else {
      throw Error('API returned invalid response');
    }
  }
  return resultInt;
}

module.exports = {
  getQuantumRandom: getQuantumRandom
};
