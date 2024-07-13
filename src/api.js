import axios from 'axios';
const BASE_URL = 'https://api.unsplash.com/search/photos';
const API_KEY = 'rpElGEJiM1diG-ZBgj2Ap4jD7oscLZ7fagH2g9O1l20'; 

async function fetchImages(query, page) {
  const response = await axios.get(BASE_URL, {
    params: {
      query,
      page,
      per_page: 12,
      client_id: API_KEY,
    },

  });
  console.log(response);
  return response.data;
}

export { fetchImages };