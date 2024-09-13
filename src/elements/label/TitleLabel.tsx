import Label from "./label";

const TitleLabel: React.FC<{ text: string }> = ({ text }) => {
    return (
        <Label
            text={text}
            fontSize="--font-size-24"
            weight="--font-weight-bold"
            color="#222222"
        />
    );
};

export default TitleLabel;
