import React from "react";
import { Group, Rect } from "react-konva";

const OldSquareSubstrate: React.FC<{
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
        offsetX={textSize.width / 2 + height / 2}
        y={textY - 0.8 * height}
        width={textSize.width + height}
        height={textSize.height + height}
        stroke={neonColor}
        strokeWidth={substrateColor === "transparent" ? 6 : 0}
        fill={
          substrateColor !== "transparent" ? substrateColor : "rgba(0,0,0,0.5)"
        }
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

export default OldSquareSubstrate;
