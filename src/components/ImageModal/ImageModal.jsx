import ReactModal from 'react-modal';
import styles from './ImageModal.module.css';

ReactModal.setAppElement('#root');

const ImageModal = ({ isOpen, onRequestClose, image }) => {
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