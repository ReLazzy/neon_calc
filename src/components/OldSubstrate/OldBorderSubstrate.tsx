import { observer } from "mobx-react-lite";
import React from "react";
import { Group, Rect, Text } from "react-konva";
import { useSignStore } from "../../stores/SignStoreContext";

interface OldBorderSubstrateProps {
  textX: number;
  textY: number;
  textSize: { width: number; height: number };
}

const OldBorderSubstrate: React.FC<OldBorderSubstrateProps> = observer(
  ({ textX, textY, textSize }) => {
    const store = useSignStore();

    const isTransparent: boolean =
      store.substrateColor?.value === "transparent";

    return (
      <Group draggable={false}>
        <Rect
          x={textX}
          offsetX={textSize.width / 2 - store.height / 3}
          y={textY + store.height / 2}
          width={textSize.width - store.height / 2}
          height={textSize.height - store.height}
          fill={isTransparent ? "#FFF" : store.substrateColor?.value}
          shadowBlur={200}
          opacity={1}
          shadowForStrokeEnabled
          shadowColor={store.neonColor}
          shadowOpacity={0.7}
          cornerRadius={20}
        />

        {isTransparent && (
          <Text
            text={store.text || "Ваш текст"}
            x={textX}
            y={textY}
            lineJoin="round"
            lineCap="round"
            fontSize={store.getFontSize()}
            fontStyle={store.neonThickness === "8mm" ? "normal" : "bold"}
            align={store.textAlign}
            fontFamily={store.font?.fontFamily || "Arial"}
            stroke={store.neonColor}
            strokeWidth={60} // Толщина контура
            offsetX={textSize.width / 2}
            opacity={0.2}
          />
        )}
        {isTransparent && (
          <Rect
            x={textX}
            offsetX={textSize.width / 2 - store.height / 3}
            y={textY + store.height / 2}
            width={textSize.width - store.height / 2}
            height={textSize.height - store.height}
            fill={"#000"}
            opacity={1}
            cornerRadius={20}
          />
        )}
        <Text
          text={store.text || "Ваш текст"}
          x={textX}
          y={textY}
          lineJoin="round"
          lineCap="round"
          fontSize={store.getFontSize()}
          fontStyle={store.neonThickness === "8mm" ? "normal" : "bold"}
          align={store.textAlign}
          fontFamily={store.font?.fontFamily || "Arial"}
          stroke={isTransparent ? "#000" : store.substrateColor?.value}
          strokeWidth={50}
          offsetX={textSize.width / 2}
        />
      </Group>
    );
  },
);

export default OldBorderSubstrate;
