import styles from "../../styles/_ImagesGallery.module.scss";
//import ImgsViewer from "react-images-viewer";
import { useState, useCallback } from "react";
import image from "../../assets/images/room.png";

const ImagesGallery = (props) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  return (
    props.images.length > 0 && (
      <div className={styles.gallery}>
        <div className={styles.imgsContainer}>
          {props.images.length > 1 && (
            <div className={styles.sideImages}>
              {props.images.map((img, index) => {
                return (
                  index > 0 && (
                    <img
                      key={index}
                      src={img.original_url}
                      alt={`img-${index}`}
                      onClick={() => openImageViewer(index)}
                    />
                  )
                );
              })}
            </div>
          )}
          <div
            className={
              props.images.length > 1
                ? `${styles.largeImg} ${styles.mainImg}`
                : `${styles.largeImg} ${styles.singleImg}`
            }
          >
            <img
              src={props.images[0].original_url}
              alt="img-0"
              onClick={() => openImageViewer(0)}
            />
          </div>
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
    )
  );
};

export default ImagesGallery;
