import { Label } from "@/elements/label/Label";
import styles from "./textAreaForm.module.css";
import { memo, useCallback, useMemo, useState, type ChangeEvent } from "react";

interface TextAreaFormProps {
  labelText: string;
  labelCss: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  errorMessage?: string;
  maxLength?: number;
  rows?: number;
}

const TextAreaForm = memo(
  ({
    labelText,
    labelCss,
    value,
    onChange,
    placeholder,
    required,
    errorMessage,
    maxLength,
    rows = 4,
  }: TextAreaFormProps) => {
    const handleChange = useCallback(
      (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        if (maxLength && newValue.length > maxLength) return;
        onChange(newValue);
      },
      [onChange, maxLength]
    );

    const characterCount = useMemo(() => {
      if (!maxLength) return null;
      return (
        <span className={styles.characterCount}>
          {value.length}/{maxLength}
        </span>
      );
    }, [value.length, maxLength]);

    return (
      <div className={styles.textAreaForm}>
        <Label text={labelText} css={labelCss} />
        <div className={styles.textAreaContainer}>
          <textarea
            className={styles.textArea}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            required={required}
            rows={rows}
          />
          {characterCount}
        </div>
        {errorMessage && (
          <span className={styles.errorMessage}>{errorMessage}</span>
        )}
      </div>
    );
  }
);

TextAreaForm.displayName = "TextAreaForm";

export default TextAreaForm;
