import ImageCard from '../ImageCard/ImageCard';
import styles from './ImageGallery.module.css';
import { ImageData } from '../../api'; // Приклад шляху до api.ts і імпорту типу ImageData

interface ImageGalleryProps {
  images: ImageData[];
  onImageClick: (image: ImageData) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onImageClick }) => {
  return (
    <ul className={styles.gallery}>
      {images.map((image) => (
        <li key={image.id} className={styles.galleryItem}>
          <ImageCard image={image} onImageClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;