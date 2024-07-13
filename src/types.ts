// Інтерфейс для окремого зображення
export interface Image {
  id: string; // Унікальний ідентифікатор зображення
  urls: {
    small: string; // URL для маленького розміру зображення
    regular: string; // URL для звичайного розміру зображення
  };
  alt_description: string; // Опис зображення для атрибута alt
  description?: string; // Опис зображення (опціонально)
  user: {
    name: string; // Ім'я користувача, який завантажив зображення
  };
  likes: number; // Кількість лайків зображення
}

// Інтерфейс для відповіді від API, що містить масив зображень
export interface FetchImagesResponse {
  results: Image[]; // Масив зображень, повернутих API
  // Додайте інші властивості, які повертає ваш API, якщо є
}