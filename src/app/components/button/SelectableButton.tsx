"use client";

import { ButtonHTMLAttributes } from "react";
import styles from "./selectable.module.css";

interface SelectableButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  isSelected: boolean;
  children: React.ReactNode;
}

const SelectableButton = ({
  isSelected,
  children,
  className,
  ...props
}: SelectableButtonProps) => {
  return (
    <button
      className={`${styles.button} ${isSelected ? styles.selected : ""} ${
        className || ""
      }`}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};

export default SelectableButton;
