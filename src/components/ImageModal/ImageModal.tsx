import ReactModal from 'react-modal';
import styles from './ImageModal.module.css';
import { Image } from '../../types';

interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  image?: Image | null; // image can be undefined (not loaded yet) or null (no image selected)
}

ReactModal.setAppElement('#root');

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onRequestClose, image }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      {image && (
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