import React, { useState, useEffect } from "react";
import styles from "./ImageCarousel.module.css";

type ImageCarouselProps = {
  images?: string[];
};

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(true);

  // Function to check window width and set showArrows
  const checkScreenSize = () => {
    if (window.innerWidth <= 1024) {
      setShowArrows(false);
    } else {
      setShowArrows(true);
    }
  };

  // Add event listener to handle screen size changes
  useEffect(() => {
    checkScreenSize(); // Initial check
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  if (!images.length) {
    return <p>No images available</p>;
  }

  return (
    <div className={styles.carousel}>
      <div className={styles.imagesContainer}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className={`${styles.image} ${
              index === currentIndex ? styles.active : ""
            }`}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          />
        ))}
      </div>
      {showArrows && (
        <>
          <button onClick={goToPrev} className={styles.navButton}>
            &#10094;
          </button>
          <button onClick={goToNext} className={styles.navButton}>
            &#10095;
          </button>
        </>
      )}
      <div className={styles.dotsContainer}>
        {images.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${
              index === currentIndex ? styles.activeDot : ""
            }`}
            onClick={() => goToIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
