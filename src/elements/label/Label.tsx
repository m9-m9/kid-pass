import React from "react";
import styles from "./label.module.css";

interface LabelProps {
    text: string | number;
    css: string;
}

const Label: React.FC<LabelProps> = ({ text, css }) => {
    return (
        <p className={styles[css]} dangerouslySetInnerHTML={{ __html: text }} />
    );
};

export { Label };
