// import constants endpointLists file
import { endPoints } from '../constants/endPointLists.js';
const allApiEndPoints = document.getElementById('allApiEndPoints');

const EndPointText = document.getElementById('apiEndPoint');

const fetchDataBtn = document.getElementById('fetchDataBtn');

// AlertMessage which is one div for adding alert and removing as well
const AlertMessage = document.getElementById('liveAlertMessage');

// Function to append alert when response will come from server
const appendAlert = (primaryMsg, message, type) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `<div><strong>${primaryMsg}</strong>${message}</div>`,
    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>',
  ].join('');

  AlertMessage.append(wrapper);
};

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



// Function which will run on input,for sending api calls
let currentEndPoint;
const onEndPointTextInput = (e) => {
  const text = e.target.value;
  currentEndPoint = text;
  if (currentEndPoint.length) {
    fetchDataBtn.removeAttribute('disabled');
  } else {
    fetchDataBtn.setAttribute('disabled', true);
  }
};

// Function which will run on click of fetchData Button
const handleOnFetchDataBtnClick = async () => {
  // add disable property to input and button tag
  console.log('Yes data is coming...');
  fetchDataBtn.innerText = 'Fetching Data...';
  fetchDataBtn.setAttribute('disabled', true);
  EndPointText.setAttribute('disabled', true);
  const data = await getDataFromServer(currentEndPoint);
  EndPointText.removeAttribute('disabled');
  fetchDataBtn.removeAttribute('disabled');
  fetchDataBtn.innerText = 'Fetch Data';

  // Alert message
  AlertMessage.innerHTML = null;
  if (data?.code === 200) {
    console.log('API Response', data);
    appendAlert('SUCCESSFUL : ', ' Please check console for data!', 'success');
  } else {
    // show the error
    console.log(data);
    const { code, status } = data;
    if (code === 404) {
      appendAlert(
        'FAILED : ',
        ` ${status}, Please refer below END POINT Lists!`,
        'warning'
      );
    } else {
      appendAlert(
        `INVALID : ${status}, `,
        '  Please refer below END POINT Lists!',
        'danger'
      );
    }
  }
};

// function to fetch data from server
const getDataFromServer = async (endPoint) => {
  // await getData('characters/1011334');
  try {
    const finalURL = `${BASE_URL}/${endPoint}?ts=1&apikey=${API_KEY}&hash=${HASH}`;
    const response = await fetch(finalURL);
    const data = await response.json();
    console.log('DATA', data);
    return data;
  } catch (error) {
    // console.log(error);
    console.log('Error calling API end point:', error.message);
    return { success: false, status: error.message };
  }
};

// Iterate all endPoint lists
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

//  Eventlistener targeted tags
EndPointText.addEventListener('input', onEndPointTextInput);

fetchDataBtn.addEventListener('click', handleOnFetchDataBtnClick);
