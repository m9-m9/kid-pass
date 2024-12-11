import { ReactNode } from "react";

interface Props {
  items: ReactNode[];
  column: number;
}

const Grid = ({ items, column }: Props) => {
  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${column}, ${100 / column}%)`,
          gap: "8px",
          width: "100%",
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
