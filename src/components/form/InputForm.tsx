import { Label } from "@/elements/label/Label";
import styles from "./form.module.css";
import Input from "@/elements/input/Input";

interface InputFormProps {
    labelText: string;
    labelCss: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    errorMessage?: string;
}

const InputForm: React.FC<InputFormProps> = ({
    labelText,
    labelCss,
    value,
    onChange,
    placeholder,
    required,
    errorMessage,
}) => {
    return (
        <>
            <div className={styles.inputForm}>
                <Label text={labelText} css={labelCss} />
                <Input
                    type="text"
                    className="inputForm"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    required={required}
                    errorMessage={errorMessage}
                />
            </div>
        </>
    );
};

export default InputForm;
