import React, { ButtonHTMLAttributes, CSSProperties } from "react";
import styles from "./button.module.css"; // CSS 모듈 가져오기

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick?: () => void;
  css?: string;
  size?: "S" | "L";
  style?: CSSProperties;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, css, style, size = "L", ...props }) => {
  return (
    <button
      className={`${css && styles[css]} ${styles.button} ${size === "L" ? styles.buttonLarge : styles.buttonSmall} `}
      onClick={onClick && onClick}
      style={{
        ...style,
      }}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
