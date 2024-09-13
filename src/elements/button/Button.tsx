import React from "react";
import styles from "./button.module.css"; // CSS 모듈 가져오기

interface ButtonProps {
    label: string;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
    return (
        <button className={styles.button} onClick={onClick}>
            {label}
        </button>
    );
};

export default Button;
