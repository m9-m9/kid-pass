import React from "react";
import styles from "./container.module.css";

export interface ContainerProps {
    children: React.ReactNode;
    css: string;
}

const Container: React.FC<ContainerProps> = ({ children, css }) => {
    // 클래스명 조합
    const classNames = css
        .split(" ")
        .map((cls) => styles[cls] || cls) // 클래스가 없는 경우 기본 문자열 그대로 유지
        .join(" ");

    return <div className={classNames}>{children}</div>;
};

export default Container;
