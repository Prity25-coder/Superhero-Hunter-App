let API_KEY = '';
let HASH = '';
let BASE_URL = '';

// function to get api key and hash and set as local variable
(async function fetchApiInfo() {
  try {
    const response = await fetch('api-key.json');
    const { PUBLIC_KEY, PRIVATE_KEY, API_BASE_URL } = await response.json();
    API_KEY = PUBLIC_KEY;
    HASH = PRIVATE_KEY;
    BASE_URL = API_BASE_URL;
  } catch (error) {
    console.log(error);
  }
})();

// function to get data from marvel server
async function getData(endPoint) {
  if (API_KEY && HASH && BASE_URL) {
    try {
      const response = await fetch(
        `${BASE_URL}/${endPoint}?ts=1&apikey=${API_KEY}&hash=${HASH}`
      );
      const data = await response.json();
      console.log('DATA', data);
    } catch (error) {
      console.log(error);
    }
  }
}

const getDataFromSever = async () => {
  await getData('characters/1011334');
};
