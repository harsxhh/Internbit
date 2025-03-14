import React from "react";
import "./Gallery.css";

interface Image {
  id: number;
  src: { medium: string; large: string; original: string };
  photographer: string;
}

interface GalleryProps {
  images: Image[];
  onImageClick: (index: number) => void;
}

const Gallery: React.FC<GalleryProps> = ({ images, onImageClick }) => {
  return (
    <div className="gallery-grid">
      {images.map((img, index) => (
        <img
          key={img.id}
          src={img.src.medium}
          alt={img.photographer}
          onClick={() => onImageClick(index)}
        />
      ))}
    </div>
  );
};

export default Gallery;