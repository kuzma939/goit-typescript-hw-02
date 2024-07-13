
import { FetchImagesResponse } from './types';
import axios, { AxiosResponse } from 'axios';

const BASE_URL: string = 'https://api.unsplash.com/search/photos';
const API_KEY: string = 'rpElGEJiM1diG-ZBgj2Ap4jD7oscLZ7fagH2g9O1l20'; 



async function fetchImages(query: string, page: number): Promise<FetchImagesResponse> {
  try {
    const response: AxiosResponse<FetchImagesResponse> = await axios.get(BASE_URL, {
      params: {
        query,
        page,
        per_page: 12,
        client_id: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch images'); // або обробляйте помилку в іншому способі
  }
}


export { fetchImages };
