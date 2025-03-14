import React, { useEffect, useState } from "react";
import axios from "axios";
import Gallery from "./Gallery";
import Lightbox from "./Lightbox";
import "./App.css";

interface Image {
  id: number;
  src: { medium: string; large: string; original: string };
  photographer: string;
}

const API_KEY = "nna1gZAjGjWSOHzJD9sWzHXU7rk11e0bvKfuVXue13RdnVaOnIXinj3X"; // Replace with your Pexels API key
const API_URL = "https://api.pexels.com/v1/curated?per_page=21"; // Fetch only 12 images

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get<{ photos: Image[] }>(API_URL, {
          headers: { Authorization: API_KEY },
        });
        setImages(response.data.photos);
      } catch (error) {
        console.error("Error fetching images", error);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="gallery-container">
      <h1>Responsive Image Gallery</h1>
      <Gallery
        images={images}
        onImageClick={(index) => setSelectedIndex(index)}
      />
      {selectedIndex !== null && (
        <Lightbox
          images={images.map((img) => img.src.original)}
          selectedIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onNext={() =>
            setSelectedIndex((prev) =>
              prev !== null && prev < images.length - 1 ? prev + 1 : prev
            )
          }
          onPrev={() =>
            setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev))
          }
        />
      )}
    </div>
  );
};

export default App;