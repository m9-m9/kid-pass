import React from "react";
import styles from "./label.module.css";

interface LabelProps {
    text: string;
    css: string;
}

const Label: React.FC<LabelProps> = ({ text, css }) => {
    return <p className={styles[css]}>{text}</p>;
};

export { Label };
