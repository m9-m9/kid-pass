import { ReactNode } from "react";
import styles from "./style.module.css";

interface FloatingButtonProps {
  onClick: () => void;
  children?: ReactNode;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}

const FloatingBtn = ({
  onClick,
  children,
  position = "bottom-right",
}: FloatingButtonProps) => {
  return (
    <button
      className={`${styles.floatingButton} ${styles[position]}`}
      onClick={onClick}
    >
      {children ?? "+"}
    </button>
  );
};

export default FloatingBtn;
