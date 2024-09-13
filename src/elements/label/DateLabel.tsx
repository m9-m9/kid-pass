import Label from "./label";

const DateLabel: React.FC<{ test: string }> = ({ test }) => {
    return (
        <Label
            text={test}
            fontSize="--font-size-12"
            weight="--font-weight-regular"
            color="#646464"
        />
    );
};

export default DateLabel;
