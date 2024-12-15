import React from "react";
import styles from "./LoadingFullScreen.module.css";

interface LoadingFullScreenProps {
  isVisible?: boolean;
  text?: string;
  backgroundColor?: string;
  spinnerColor?: string;
}

const LoadingFullScreen: React.FC<LoadingFullScreenProps> = ({
  isVisible = false,
  text,
  backgroundColor = "rgba(255, 255, 255, 0.9)",
  spinnerColor = "#3498db",
}) => {
  return (
    <div className={`${styles.loadingWrapper} ${isVisible ? styles.visible : ""}`} style={{ backgroundColor }}>
      <div className={styles.spinner} style={{ borderTopColor: spinnerColor }} />
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
};

export default LoadingFullScreen;
