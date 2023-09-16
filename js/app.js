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

const endPoints = [
  {
    method: 'GET',
    endPoint: 'characters',
    description: 'Fetches lists of characters.',
  },
  {
    method: 'GET',
    endPoint: 'characters/{characterId}',
    description: 'Fetches a single character by id.',
  },
  {
    method: 'GET',
    endPoint: 'characters/{characterId}/comics',
    description: 'Fetches lists of comics filtered by a character id.',
  },
  {
    method: 'GET',
    endPoint: 'characters/{characterId}/events',
    description: 'Fetches lists of events filtered by a character id.',
  },
  {
    method: 'GET',
    endPoint: 'characters/{characterId}/series',
    description: 'Fetches lists of series filtered by a character id.',
  },
  {
    method: 'GET',
    endPoint: 'characters/{characterId}/stories',
    description: 'Fetches lists of stories filtered by a character id.',
  },
  {
    method: 'GET',
    endPoint: 'comics',
    description: 'Fetches lists of comics.',
  },
  {
    method: 'GET',
    endPoint: 'comics/{comicId}',
    description: 'Fetches a single comic by id.',
  },
  {
    method: 'GET',
    endPoint: 'comics/{comicId}/characters',
    description: 'Fetches lists of characters filtered by a comic id.',
  },
  {
    method: 'GET',
    endPoint: 'comics/{comicId}/creators',
    description: 'Fetches lists of creators filtered by a comic id.',
  },
  {
    method: 'GET',
    endPoint: 'comics/{comicId}/events',
    description: 'Fetches lists of events filtered by a comic id.',
  },
  {
    method: 'GET',
    endPoint: 'comics/{comicId}/stories',
    description: 'Fetches lists of stories filtered by a comic id.',
  },
  {
    method: 'GET',
    endPoint: 'creators',
    description: 'Fetches lists of creators.',
  },
  {
    method: 'GET',
    endPoint: 'creators/{creatorId}',
    description: 'Fetches a single creator by id.',
  },
  {
    method: 'GET',
    endPoint: 'creators/{creatorId}/comics',
    description: 'Fetches lists of comics filtered by a creator id.',
  },
  {
    method: 'GET',
    endPoint: 'creators/{creatorId}/events',
    description: 'Fetches lists of events filtered by a creator id.',
  },
  {
    method: 'GET',
    endPoint: 'creators/{creatorId}/series',
    description: 'Fetches lists of series filtered by a creator id.',
  },
  {
    method: 'GET',
    endPoint: 'events',
    description: 'Fetches lists of events.',
  },
  {
    method: 'GET',
    endPoint: 'events/{eventId}',
    description: 'Fetches a single event by id.',
  },
  {
    method: 'GET',
    endPoint: 'events/{eventId}/characters',
    description: 'Fetches lists of characters filtered by an event id.',
  },
  {
    method: 'GET',
    endPoint: 'events/{eventId}/comics',
    description: 'Fetches lists of comics filtered by an event id.',
  },
  {
    method: 'GET',
    endPoint: 'events/{eventId}/creators',
    description: 'Fetches lists of creators filtered by an event id.',
  },
  {
    method: 'GET',
    endPoint: 'events/{eventId}/series',
    description: 'Fetches lists of series filtered by an event id.',
  },
  {
    method: 'GET',
    endPoint: 'events/{eventId}/stories',
    description: 'Fetches lists of stories filtered by an event id.',
  },
  {
    method: 'GET',
    endPoint: 'series',
    description: 'Fetches lists of series.',
  },
  {
    method: 'GET',
    endPoint: 'series/{seriesId}',
    description: 'Fetches a single comic series by id.',
  },
  {
    method: 'GET',
    endPoint: 'series/{seriesId}/characters',
    description: 'Fetches lists of characters filtered by a series id.',
  },
  {
    method: 'GET',
    endPoint: 'series/{seriesId}/comics',
    description: 'Fetches lists of comics filtered by a series id.',
  },
  {
    method: 'GET',
    endPoint: 'series/{seriesId}/creators',
    description: 'Fetches lists of creators filtered by a series id.',
  },
  {
    method: 'GET',
    endPoint: 'series/{seriesId}/events',
    description: 'Fetches lists of events filtered by a series id.',
  },
  {
    method: 'GET',
    endPoint: 'series/{seriesId}/stories',
    description: 'Fetches lists of stories filtered by a series id',
  },
  {
    method: 'GET',
    endPoint: 'stories',
    description: 'Fetches lists of stories filtered by a series id.',
  },
  {
    method: 'GET',
    endPoint: 'stories/{storyId}',
    description: 'Fetches a single comic story by id.',
  },
  {
    method: 'GET',
    endPoint: 'stories/{storyId}/characters',
    description: 'Fetches lists of characters filtered by a story id.',
  },
  {
    method: 'GET',
    endPoint: 'stories/{storyId}/comics',
    description: 'Fetches lists of comics filtered by a story id.',
  },
  {
    method: 'GET',
    endPoint: 'stories/{storyId}/creators',
    description: 'Fetches lists of creators filtered by a story id.',
  },
  {
    method: 'GET',
    endPoint: 'stories/{storyId}/events',
    description: 'Fetches lists of events filtered by a story id.',
  },
  {
    method: 'GET',
    endPoint: 'stories/{storyId}/series',
    description: 'Fetches lists of series filtered by a story id.',
  },
];

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
