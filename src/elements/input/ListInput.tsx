import { InputProps } from "./Input";
import styles from "./input.module.css";

const ListInput: React.FC<InputProps> = ({
    type,
    placeholder,
    className,
    value,
    onChange,
    onKeyDown,
}) => {
    return (
        <>
            <input
                className={styles[className]}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
            />
        </>
    );
};

export default ListInput;
