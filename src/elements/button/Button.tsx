import React from "react";
import styles from "./button.module.css"; // CSS 모듈 가져오기

interface ButtonProps {
    label: string;
    onClick: () => void;
    css?: string;
    backgroundColor?: string;
    color?: string;
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    css = "button",
    backgroundColor,
    color,
}) => {
    return (
        <button
            className={styles[css]}
            onClick={onClick}
            style={{ backgroundColor, color }}
        >
            {label}
        </button>
    );
};

export default Button;
