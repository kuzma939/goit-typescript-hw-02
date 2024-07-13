import styles from './ImageCard.module.css';
import { ImageData } from '../../api'; // Переконайтеся, що шлях правильний до вашого api.ts

interface ImageCardProps {
  image: ImageData;
  onImageClick: (image: ImageData) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onImageClick }) => {
  const handleClick = () => {
    onImageClick(image);
  };

  return (
    <div className={styles.card}>
      <img src={image.urls.small} alt={image.alt_description} onClick={handleClick} className={styles.image} />
    </div>
  );
};

export default ImageCard;
