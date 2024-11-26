import styles from "./input.module.css";

interface InputProps {
    type: string;
    placeholder?: string;
    className: string;
}

const Input: React.FC<InputProps> = ({ type, placeholder, className }) => {
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

export default Input;
