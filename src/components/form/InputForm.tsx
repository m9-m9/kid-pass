import { Label } from "@/elements/label/Label";
import styles from "./form.module.css";
import Input from "@/elements/input/Input";

interface InputFormProps {
    labelText: string;
    labelCss: string;
}

const InputForm: React.FC<InputFormProps> = ({ labelText, labelCss }) => {
    return (
        <>
            <div className={styles.inputForm}>
                <Label text={labelText} css={labelCss} />
                <Input type="text" className="inputForm" />
            </div>
        </>
    );
};

export default InputForm;
