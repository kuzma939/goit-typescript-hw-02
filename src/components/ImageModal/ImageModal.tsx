import ReactModal from 'react-modal';
import styles from './ImageModal.module.css';
import { ImageData } from '../../api'; // Переконайтеся, що шлях правильний до вашого api.ts

interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  image: ImageData | null; // Оновлено: image може бути типу ImageData або null
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onRequestClose, image }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      {image && ( // Перевіряємо, чи існує image перед використанням
        <div>
          <img src={image.urls.regular} alt={image.alt_description} className={styles.image} />
          <p>{image.description || image.alt_description}</p>
          <p>Author: {image.user.name}</p>
          <p>Likes: {image.likes}</p>
        </div>
      )}
    </ReactModal>
  );
};

export default ImageModal;