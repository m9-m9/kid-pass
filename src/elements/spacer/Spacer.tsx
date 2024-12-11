interface Props {
  height?: number;
  width?: number;
}

const Spacer = ({ height, width }: Props) => {
  if (height) return <div style={{ width: "100%", height }} />;
  if (width) return <div style={{ width, height: "100%" }} />;
};

export default Spacer;
