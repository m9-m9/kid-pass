import React from "react";
import styles from "./container.module.css";

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  backgroundColor?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className, backgroundColor }) => {
  // 클래스명 조합
  const classNames = className
    ?.split(" ")
    .map((cls) => styles[cls] || cls)
    .join(" ");

  return (
    <div className={classNames} style={{ backgroundColor }}>
      {children}
    </div>
  );
};

export default Container;
