interface Props {
    height?: number;
    width?: number;
    backgroundColor?: string;
}

const Spacer = ({ height, width, backgroundColor }: Props) => {
    if (height)
        return <div style={{ width: '100%', height, backgroundColor }} />;
    if (width)
        return <div style={{ width, height: '100%', backgroundColor }} />;
};

export default Spacer;
