import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import { fetchImages } from '../../api';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';
import { Toaster } from 'react-hot-toast';
import ReactModal from 'react-modal';

// Встановлюємо елемент кореня, якщо він не встановлений раніше
if (process.env.NODE_ENV !== 'test') {
  ReactModal.setAppElement('#root');
}
const App: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);

  useEffect(() => {
    if (!query) return;

    async function getData() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchImages(query, page);
        setImages(prevImages => [...prevImages, ...data]);
      } catch (error) {
        setError('Something went wrong. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [query, page]);

  const handleSearchSubmit = (searchQuery: string) => {
    setQuery(searchQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = (image: ImageData) => {
    setSelectedImage(image);
  };

  const handleModalClose = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {loading && <Loader />}
      {images.length > 0 && !loading && <LoadMoreBtn onClick={handleLoadMore} />}
      <ImageModal isOpen={!!selectedImage} onRequestClose={handleModalClose} image={selectedImage} />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default App;