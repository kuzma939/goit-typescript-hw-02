export interface Image {
    id: string;
    alt_description: string;
    urls: {
        small: string;
      regular: string;
    };
    description?: string;
    user: {
      name: string;
    };
    likes: number;
    // Додайте інші властивості вашого об'єкту зображення тут
  }
 