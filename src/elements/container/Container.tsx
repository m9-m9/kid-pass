import React from "react";
import styles from "./container.module.css";

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  backgroundColor?: string;
  style?: React.CSSProperties;
  scroll?: boolean;
}

const Container: React.FC<ContainerProps> = ({
  style,
  children,
  className,
  backgroundColor,
  scroll,
}) => {
  // 클래스명 조합
  const classNames = className
    ?.split(" ")
    .map((cls) => styles[cls] || cls)
    .join(" ");

  return (
    <div
      className={classNames}
      style={{ backgroundColor, ...style, height: scroll ? "" : "100vh" }}
    >
      {children}
    </div>
  );
};

export default Container;
