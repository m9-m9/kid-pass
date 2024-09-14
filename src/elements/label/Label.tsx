import React from "react";
import styles from "./label.module.css"; // CSS 모듈 가져오기

interface LabelProps {
    text: string;
    css: string;
}

const Label: React.FC<LabelProps> = ({ text, css }) => {
    return <p className={styles[css]}>{text}</p>; // props로 받은 css 클래스를 동적으로 사용
};

export default Label;
