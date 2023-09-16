import { endPoints } from '../constants/endPointLists.js';
const allApiEndPoints = document.getElementById('allApiEndPoints');

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

endPoints.forEach((ele) => {
  const { method, endPoint, description } = ele;

  const endPointDiv = document.createElement('div');
  endPointDiv.setAttribute(
    'class',
    'd-flex justify-content-between border  py-1 mb-2 endPoint'
  );

  const leftDiv = document.createElement('div');

  const spanForType = document.createElement('span');
  spanForType.textContent = method;
  leftDiv.appendChild(spanForType);
  spanForType.setAttribute('class', 'text-bg-primary py-1 px-2');

  const spanForText = document.createElement('span');
  spanForText.textContent = endPoint;
  spanForText.setAttribute('class', 'ms-2 fw-semibold');
  leftDiv.appendChild(spanForText);

  const spanForInfo = document.createElement('span');
  spanForInfo.textContent = description;
  spanForInfo.setAttribute('class', 'text-primary me-4');

  endPointDiv.append(leftDiv, spanForInfo);

  allApiEndPoints.appendChild(endPointDiv);
});
