import React from "react";
import { Group, Rect } from "react-konva";

const SquareSubstrate: React.FC<{
  textX: number;
  textY: number;
  textSize: { width: number; height: number };
  substrateColor: string;
  neonColor: string;
  height: number;
}> = ({ textX, textY, textSize, substrateColor, neonColor, height }) => {
  return (
    <Group>
      <Rect
        x={textX}
        offsetX={textSize.width / 2 + 25}
        y={textY - height / 2}
        width={textSize.width + 50}
        height={textSize.height + 10}
        stroke={neonColor}
        strokeWidth={substrateColor === "transparent" ? 6 : 0}
        fill={substrateColor !== "transparent" ? substrateColor : "rgba(0,0,0,0.5)"}
        shadowBlur={200}
        opacity={substrateColor === "transparent" ? 0.2 : 1}
        shadowForStrokeEnabled
        shadowColor={neonColor}
        shadowOpacity={0.7}
        cornerRadius={20}
      />
    </Group>
  );
};

export default SquareSubstrate;
