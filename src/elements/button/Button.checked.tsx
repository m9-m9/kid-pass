import { ReactNode } from "react";
import styles from "./button.module.css";

interface ButtonCheckedProps {
  v: string; // 버튼에 표시될 텍스트/값
  i: number; // 키 값으로 사용되는 인덱스
  state: string; // 현재 선택된 상태 값
  setState: (value: string) => void; // 상태를 업데이트하는 함수
  children?: ReactNode;
}

const ButtonChecked = ({
  v,
  i,
  state,
  setState,
  children,
}: ButtonCheckedProps) => {
  return (
    <button
      key={i}
      className={`${styles.kindButton} ${state === v ? styles.selected : ""}`}
      onClick={() => setState(v)}
      type="button"
    >
      {children ?? v}
    </button>
  );
};

export default ButtonChecked;
