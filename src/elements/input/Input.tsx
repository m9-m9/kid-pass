import React from "react";
import styles from "./input.module.css";

export interface InputProps {
  type?: string;
  placeholder?: string;
  className: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  required?: boolean;
  errorMessage?: string; // 에러 메시지 추가
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  className,
  value,
  onChange,
  required,
  errorMessage,
}) => {
  // 유효성 검사 중 커스텀 메시지를 설정
  const handleInvalid = (e: React.InvalidEvent<HTMLInputElement>) => {
    if (errorMessage) {
      e.target.setCustomValidity(errorMessage);
    }
  };

  // 입력 중 커스텀 메시지를 초기화
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.setCustomValidity("");
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <input
      className={styles[className]}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleInput}
      required={required}
      onInvalid={handleInvalid} // 유효하지 않을 때 호출
    />
  );
};

export default Input;
