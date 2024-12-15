import { Label } from "@/elements/label/Label";
import styles from "./form.module.css";
import Input from "@/elements/input/Input";
import { memo, useCallback, useMemo, useState, type ChangeEvent } from "react";

interface InputFormProps {
  labelText: string;
  labelCss: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  errorMessage?: string;
  type?: "text" | "password" | "email" | "number";
  showPasswordToggle?: boolean;
}

const PasswordToggleButton = memo(({ showPassword, onClick }: { showPassword: boolean; onClick: () => void }) => (
  <button onClick={onClick} className={styles.eyeBtn} type="button">
    <div style={{ display: "flex" }}>
      <i className={`ri-${showPassword ? "eye-off-line" : "eye-line"}`} />
      <p>비밀번호 가리기</p>
    </div>
  </button>
));

PasswordToggleButton.displayName = "PasswordToggleButton";

const InputForm = memo(
  ({
    labelText,
    labelCss,
    value,
    onChange,
    placeholder,
    required,
    errorMessage,
    type = "text",
    showPasswordToggle = false,
  }: InputFormProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = useCallback(() => {
      setShowPassword((prev) => !prev);
    }, []);

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
      },
      [onChange]
    );

    const inputType = useMemo(() => {
      if (type === "password" && showPassword) {
        return "text";
      }
      return type;
    }, [type, showPassword]);

    const passwordToggleButton = useMemo(() => {
      if (showPasswordToggle && type === "password") {
        return <PasswordToggleButton showPassword={showPassword} onClick={togglePasswordVisibility} />;
      }
      return null;
    }, [showPasswordToggle, type, showPassword, togglePasswordVisibility]);

    return (
      <div className={styles.inputForm}>
        <Label text={labelText} css={labelCss} />
        <div className={styles.inputContainer}>
          <Input
            type={inputType}
            className="inputForm"
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            required={required}
            errorMessage={errorMessage}
          />
          {passwordToggleButton}
        </div>
        {errorMessage && <span>{errorMessage}</span>}
      </div>
    );
  }
);

InputForm.displayName = "InputForm";

export default InputForm;
