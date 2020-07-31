const axios = require('axios');
const math = require('mathjs');

const API_URL = "https://qrng.anu.edu.au/API/jsonI.php?type=hex16&length=1"

async function getQuantumRandom(numClasses) {
  if (numClasses == 2) {
    const size = 1
    const fullUrl = API_URL + '&size=' + size;
    console.log(fullUrl);
    const response = await axios.get(fullUrl);
    const data = response.data;
    console.log(data);
    if (data.success === true && data.type === 'string' && data.length === 1 && data.size === size) {
      const resultInt = parseInt(data.data, 16);
      console.log(resultInt);
      const ret = Math.floor(resultInt / 128);
      console.log(ret);
      return ret;
    } else {
      throw Error('API returned invalid response');
    }
  } else {
    throw Error('Expected 2 classes');
  }
}

module.exports = {
  getQuantumRandom: getQuantumRandom
};
