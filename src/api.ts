import axios, { AxiosResponse } from 'axios';


const BASE_URL = 'https://api.unsplash.com/search/photos';
const API_KEY = 'rpElGEJiM1diG-ZBgj2Ap4jD7oscLZ7fagH2g9O1l20';

 
export interface ImageData {
    id: string;
    urls: {
      regular: string;
      small: string;
    };
    alt_description: string;
    description?: string;
    user: {
      name: string;
    };
    likes: number;
  }
async function fetchImages(query: string, page: number): Promise<ImageData[]> {
  try {
    const response: AxiosResponse<{ results: ImageData[] }> = await axios.get(BASE_URL, {
      params: {
        query,
        page,
        per_page: 12,
        client_id: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    throw new Error('Failed to fetch images from Unsplash API');
  }
}

export { fetchImages };