import React from "react";
import { Rect } from "react-konva";

const SquareSubstrate: React.FC<{
  textX: number;
  textY: number;
  textSize: { width: number; height: number };
  substrateColor: string;
  neonColor: string;
}> = ({ textX, textY, textSize, substrateColor, neonColor }) => {
  return (
    <>
      {substrateColor === "transparent" ? (
        <Rect
          x={textX - textSize.width / 2 - 55}
          y={textY - 55}
          width={textSize.width + 100}
          height={textSize.height + 80}
          stroke={neonColor}
          strokeWidth={6}
          cornerRadius={10}
          opacity={0.7}
          draggable={true}
        />
      ) : (
        <Rect
          draggable={true}
          x={textX - textSize.width / 2 - 55}
          y={textY - 55}
          width={textSize.width + 100}
          height={textSize.height + 80}
          fill={substrateColor}
          cornerRadius={10}
          opacity={0.2}
        />
      )}
    </>
  );
};

export default SquareSubstrate;
