import React from "react";
import styles from "./button.module.css"; // CSS 모듈 가져오기

interface ButtonProps {
    label: string;
    onClick?: () => void;
    css?: string;
    backgroundColor?: string;
    color?: string;
    type?: "button" | "submit" | "reset"; 
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    css = "button",
    backgroundColor,
    color,
    type
}) => {
    return (
        <button
            className={styles[css]}
            onClick={onClick}
            style={{ backgroundColor, color }}
            type={type}
        >
            {label}
        </button>
    );
};

export default Button;
