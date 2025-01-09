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
        offsetX={textSize.width / 2 + 40}
        y={textY - height / 2 + 10}
        width={textSize.width + 50}
        height={textSize.height}
        stroke={neonColor}
        strokeWidth={substrateColor === "transparent" ? 6 : 0}
        fill={substrateColor !== "transparent" ? substrateColor : 'hsla(0, 83.30%, 4.70%, 0.00)'}
        shadowBlur={200}
        opacity={1}

        shadowColor={neonColor}
        shadowOpacity={0.7}
        cornerRadius={20}
      />
    </Group>
  );
};

export default SquareSubstrate;
