import React from "react";

interface PlusIconProps {
    color: string;
    size: number;
    strokeWidth: number;
}

const PlusIcon: React.FC<PlusIconProps> = ({ color, size, strokeWidth }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 4v16M4 12h16" />
        </svg>
    );
};

export default PlusIcon;
