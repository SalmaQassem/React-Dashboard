import styles from "../../styles/_ImagesGallery.module.scss";
//import ImgsViewer from "react-images-viewer";
import { useState, useCallback } from "react";
import image from "../../assets/images/room.png";

const ImagesGallery = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const images = [
    { src: image, main: true },
    { src: image },
    { src: image },
    { src: image },
    { src: image },
    { src: image },
  ];

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  return (
    <div className={styles.gallery}>
      <div className={styles.imgsContainer}>
        {images.length > 1 && (
          <div className={styles.sideImages}>
            {images.map((img, index) => {
              return (
                index > 0 && (
                  <img
                    key={index}
                    src={img.src}
                    alt=""
                    onClick={() => openImageViewer(index)}
                  />
                )
              );
            })}
          </div>
        )}
        <img
          src={images[0].src}
          alt=""
          className={images.length > 1 ? styles.mainImg : styles.singleImg}
          onClick={() => openImageViewer(0)}
        />
      </div>
      {/*isViewerOpen && (
        <ImgsViewer
          imgs={images}
          className={styles.viewer}
          currImg={currentImage}
          isOpen={isViewerOpen}
          onClickPrev={() => setCurrentImage(currentImage - 1)}
          onClickNext={() => setCurrentImage(currentImage + 1)}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
        />
      )*/}
    </div>
  );
};

export default ImagesGallery;
