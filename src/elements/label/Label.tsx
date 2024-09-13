import React from "react";

interface LabelProps {
    text: string;
    fontSize: string;
    weight: string;
    color: string;
}

const Label: React.FC<LabelProps> = ({ text, fontSize, weight, color }) => {
    return (
        <p
            style={{
                fontSize: fontSize,
                fontWeight: weight,
                color: color,
            }}
        >
            {text}
        </p>
    );
};

export default Label;

// ex <Label text="사용볍" fontSize="16px" weight="bold" color="red" />
