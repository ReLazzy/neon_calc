import React from "react";
import { Group, Rect } from "react-konva";

const SquareSubstrate: React.FC<{
  textX: number;
  textY: number;
  textSize: { width: number; height: number };
  substrateColor: string;
  neonColor: string;
}> = ({ textX, textY, textSize, substrateColor, neonColor }) => {
  return (
    <Group draggable={false}>
      {substrateColor === "transparent" ? (
        <Rect
          x={textX - textSize.width / 2 - 55}
          y={textY - 55}
          width={textSize.width + 50}
          height={textSize.height + 50}
          stroke={neonColor}
          strokeWidth={6}
          cornerRadius={30}
          opacity={0.2}
        />
      ) : (
        <Rect
          x={textX - textSize.width / 2 - 55}
          y={textY - 55}
          width={textSize.width + 50}
          height={textSize.height + 50}
          fill={substrateColor}
          shadowBlur={200}
          shadowColor={neonColor}
          shadowOpacity={1}
          cornerRadius={30}
        />
      )}
    </Group>
  );
};

export default SquareSubstrate;
