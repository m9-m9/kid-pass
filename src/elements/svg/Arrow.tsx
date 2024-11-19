const ArrowIcon = ({ direction = "right", color = "#A9A9A9", size = 24 }) => {
    // direction에 따라 회전 각도를 설정
    const rotation = {
        up: -90,
        down: 90,
        left: 180,
        right: 0,
    }[direction];

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transform: `rotate(${rotation}deg)` }}
        >
            <path d="M8 4l8 8-8 8" />
        </svg>
    );
};

export default ArrowIcon;
