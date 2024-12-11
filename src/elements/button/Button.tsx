import React, { ButtonHTMLAttributes } from "react";
import styles from "./button.module.css"; // CSS 모듈 가져오기

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick?: () => void;
  css?: string;
  backgroundColor?: string;
  color?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, css = "button", backgroundColor, color, ...props }) => {
  return (
    <button className={styles[css]} onClick={onClick && onClick} style={{ backgroundColor, color }} {...props}>
      {label}
    </button>
  );
};

export default Button;
