import { InputProps } from "./Input";
import styles from "./input.module.css";

const ListInput: React.FC<InputProps> = ({ type, placeholder, className }) => {
    return (
        <>
            <input
                className={styles[className]}
                type={type}
                placeholder={placeholder}
            ></input>
        </>
    );
};

export default ListInput;
