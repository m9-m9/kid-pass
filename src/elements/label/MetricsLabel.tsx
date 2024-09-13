import Label from "./label";

const Metrics: React.FC<{ text: string }> = ({ text }) => {
    return (
        <>
            <Label
                text={text}
                fontSize="--font-size-18"
                weight="--font-weight-bold"
                color="#000000"
            />
        </>
    );
};

const MetricsType: React.FC<{ text: string }> = ({ text }) => {
    return (
        <>
            <Label
                text={text}
                fontSize="--font-size-14"
                weight="--font-weight-regular"
                color="#222222"
            />
        </>
    );
};

const MetricsValue: React.FC<{ text: string }> = ({ text }) => {
    return (
        <>
            <Label
                text={text}
                fontSize="--font-size-20"
                weight="--font-weight-semiBold"
                color="#222222"
            />
        </>
    );
};

export { Metrics, MetricsType, MetricsValue };
