import React from "react";
import styles from "./container.module.css";

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  backgroundColor?: string;
  style?: React.CSSProperties;
  full?: boolean;
}

const Container: React.FC<ContainerProps> = ({
  style,
  children,
  className,
  backgroundColor,
  full,
}) => {
  // 클래스명 조합
  const classNames = className
    ?.split(" ")
    .map((cls) => styles[cls] || cls)
    .join(" ");

  return (
    <div
      className={classNames}
      style={{
        backgroundColor,
        ...style,
        ...(full && { height: "100vh" }),
      }}
    >
      {children}
    </div>
  );
};

export default Container;
