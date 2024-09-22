import React from "react";
import styles from "./button.module.css"; // CSS 모듈 가져오기

interface ButtonProps {
  label: string;
  onClick: () => void;
  css?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, css = "button" }) => {
  return (
    <button className={styles[css]} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
