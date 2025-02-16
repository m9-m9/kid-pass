import React from "react";
import styles from "./Header.module.css";

interface HeaderProps {
  title: string;
  onBack?: () => void;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ title, onBack, className = "" }) => {
  return (
    <header className={`${styles.header} ${className}`}>
      {onBack && (
        <button
          type="button"
          className={styles.backButton}
          onClick={onBack}
          aria-label="뒤로 가기"
        >
          <i className="ri-arrow-left-s-line" style={{ fontSize: "24px" }} />
        </button>
      )}
      <span className={styles.title}>{title}</span>
    </header>
  );
};

export default Header;
