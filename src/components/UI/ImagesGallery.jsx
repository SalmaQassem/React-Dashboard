import styles from "../../styles/_ImagesGallery.module.scss";
import ImageViewer from "react-simple-image-viewer";
import { useState, useCallback } from "react";
import { HiChevronDoubleRight, HiChevronDoubleLeft } from "react-icons/hi2";

const ImagesGallery = (props) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const images =
    props.images &&
    props.images.length > 0 &&
    props.images.map((img) => {
      return img.original_url;
    });

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  const leftArrow = (
    <button className={styles.leftArrow}>
      <HiChevronDoubleLeft />
    </button>
  );

  const rightArrow = (
    <button className={styles.rightArrow}>
      <HiChevronDoubleRight />
    </button>
  );

  return (
    <div className={styles.gallery}>
      {props.images && props.images.length > 0 && (
        <>
          <div className={styles.imgsContainer}>
            {props.images.length > 1 && (
              <div className={styles.sideImages}>
                {props.images.map((img, index) => {
                  return (
                    index > 0 && (
                      <div className={styles.img} key={index}>
                        <img
                          src={img.original_url}
                          alt={`img-${index}`}
                          onClick={() => openImageViewer(index)}
                        />
                      </div>
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
          {isViewerOpen && (
            <ImageViewer
              src={images}
              currentIndex={currentImage}
              onClose={closeImageViewer}
              disableScroll={true}
              closeOnClickOutside={true}
              leftArrowComponent={leftArrow}
              rightArrowComponent={rightArrow}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ImagesGallery;
