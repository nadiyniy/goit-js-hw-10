const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_dwpQ9u5yU8WQMhfcUWbEZosGBPvEyd6BQtsyJ4jTm6pc55cg0QpcrU8mPB07KZm3';

const options = {
  headers: {
    'x-api-key': API_KEY,
  },
};

export function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds`, options)
  .then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(`${BASE_URL}/images/search?breed_ids=${breedId}`, options)
  .then(
    res => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    }
  );
}
