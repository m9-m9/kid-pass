import React, { ButtonHTMLAttributes, CSSProperties } from "react";
import styles from "./button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string | React.ReactNode;
  children?: React.ReactNode;
  onClick?: () => void;
  css?: string;
  size?: "S" | "L";
  style?: CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  label,
  children,
  onClick,
  css,
  style,
  size = "L",
  ...props
}) => {
  return (
    <button
      className={`${styles.button} ${
        size === "L" ? styles.buttonLarge : styles.buttonSmall
      } ${css ? styles[css] : ""}`}
      onClick={onClick}
      style={{
        ...style,
      }}
      {...props}
    >
      {children || label}
    </button>
  );
};

export default Button;
