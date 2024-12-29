import styles from "./progressBar.module.css";

interface ProgressBarProps {
    completed: number;
    total: number;
}

const ProgressBar = ({ completed, total }: ProgressBarProps) => {
    const percentage = (completed / (completed + total)) * 100;

    return (
        <div className={styles.progressContainer}>
            <div
                className={styles.progressBar}
                style={{ width: `${percentage}%` }}
            />
        </div>
    );
};

export default ProgressBar;
