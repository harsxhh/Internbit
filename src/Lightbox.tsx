import React from "react";
import Modal from "react-modal";
import "./Lightbox.css";

interface LightboxProps {
  images: string[];
  selectedIndex: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

Modal.setAppElement("#root");

const Lightbox: React.FC<LightboxProps> = ({ images, selectedIndex, onClose, onNext, onPrev }) => {
  const isFirstImage = selectedIndex === 0;
  const isLastImage = selectedIndex === images.length - 1;

  return (
    <Modal isOpen={selectedIndex !== null} onRequestClose={onClose} className="modal">
      <button onClick={onClose} className="close-btn">X</button>
      <button
        onClick={onPrev}
        className="prev-btn"
        disabled={isFirstImage} // Disable if it's the first image
        style={{ opacity: isFirstImage ? 0.5 : 1, cursor: isFirstImage ? "not-allowed" : "pointer" }}
      >
        &#9665;
      </button>
      {selectedIndex !== null && <img src={images[selectedIndex]} alt="Selected" className="modal-image" />}
      <button
        onClick={onNext}
        className="next-btn"
        disabled={isLastImage} // Disable if it's the last image
        style={{ opacity: isLastImage ? 0.5 : 1, cursor: isLastImage ? "not-allowed" : "pointer" }}
      >
        &#9655;
      </button>
    </Modal>
  );
};

export default Lightbox;