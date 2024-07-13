// Імпортуємо необхідні бібліотеки та компоненти
import React, { useState, useEffect } from 'react'; // React та хуки useState і useEffect
import './App.css'; // Файл зі стилями для додатку
import SearchBar from '../SearchBar/SearchBar'; // Компонент для пошукового рядка
import { fetchImages } from '../../api'; // Функція для отримання зображень з API
import ImageGallery from '../ImageGallery/ImageGallery'; // Компонент для галереї зображень
import Loader from '../Loader/Loader'; // Компонент для індикатора завантаження
import ErrorMessage from '../ErrorMessage/ErrorMessage'; // Компонент для відображення помилок
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn'; // Компонент для кнопки "Завантажити більше"
import ImageModal from '../ImageModal/ImageModal'; // Компонент для модального вікна зображень
import { Toaster } from 'react-hot-toast'; // Компонент для сповіщень
import { Image, FetchImagesResponse } from '../../types'; // Тип для зображення

// Основний компонент додатку
const App: React.FC = () => {
  // Встановлюємо стан для зображень
  const [images, setImages] = useState<Image[]>([]);
  // Встановлюємо стан для пошукового запиту
  const [query, setQuery] = useState<string>('');
  // Встановлюємо стан для номера сторінки
  const [page, setPage] = useState<number>(1);
  // Встановлюємо стан для індикатора завантаження
  const [loading, setLoading] = useState<boolean>(false);
  // Встановлюємо стан для повідомлень про помилки
  const [error, setError] = useState<string | null>(null);
  // Встановлюємо стан для обраного зображення
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  // Використовуємо useEffect для отримання даних з API при зміні запиту або номера сторінки
  useEffect(() => {
    if (!query) return; // Якщо запит порожній, нічого не робимо

    async function getData() {
      try {
        setLoading(true); // Встановлюємо стан завантаження
        setError(null); // Скидаємо помилки
        const data: FetchImagesResponse = await fetchImages(query, page); // Отримуємо дані від API і типізуємо відповідь
        setImages(prevImages => [...prevImages, ...data.results]); // Додаємо нові зображення до попередніх
      } catch (error) {
        setError('Something went wrong. Please try again later.'); // Встановлюємо повідомлення про помилку
      } finally {
        setLoading(false); // Скидаємо стан завантаження
      }
    }

    getData(); // Викликаємо функцію отримання даних
  }, [query, page]); // Виконуємо при зміні запиту або номера сторінки

  // Обробка події відправлення пошукового запиту
  const handleSearchSubmit = (searchQuery: string) => {
    setQuery(searchQuery); // Встановлюємо новий пошуковий запит
    setImages([]); // Очищуємо попередні зображення
    setPage(1); // Скидаємо номер сторінки до 1
  };

  // Обробка події натискання на кнопку "Завантажити більше"
  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1); // Збільшуємо номер сторінки на 1
  };

  // Обробка події натискання на зображення
  const handleImageClick = (image: Image) => {
    setSelectedImage(image); // Встановлюємо обране зображення
  };

  // Обробка події закриття модального вікна
  const handleModalClose = () => {
    setSelectedImage(null); // Очищуємо обране зображення
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} /> {/* Компонент пошукового рядка */}
      {error && <ErrorMessage message={error} />} {/* Відображення повідомлення про помилку, якщо є */}
      <ImageGallery images={images} onImageClick={handleImageClick} /> {/* Галерея зображень */}
      {loading && <Loader />} {/* Індикатор завантаження */}
      {images.length > 0 && !loading && <LoadMoreBtn onClick={handleLoadMore} />} {/* Кнопка "Завантажити більше" */}
      <ImageModal isOpen={!!selectedImage} onRequestClose={handleModalClose} image={selectedImage} /> {/* Модальне вікно для обраного зображення */}
      <Toaster position="top-right" reverseOrder={false} /> {/* Компонент для сповіщень */}
    </div>
  );
};

export default App; // Експортуємо компонент App за замовчуванням