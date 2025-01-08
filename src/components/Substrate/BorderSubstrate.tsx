import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Group, Text } from "react-konva";
import { useSignStore } from "../../stores/SignStoreContext";

interface BorderSubstrateProps {
  textX: number;
  textY: number;
  textSize: { width: number; height: number };
}

const BorderSubstrate: React.FC<BorderSubstrateProps> = observer(
  ({ textX, textY, textSize }) => {
    const store = useSignStore();


    const isTransparent: boolean = store.substrateColor?.value === "transparent";

    return (
      <Group draggable={false}>
        {isTransparent && (
          <Text
            text={store.text || "Ваш текст"}
            x={textX}
            y={textY}
            fontSize={store.getFontSize()}
            align={store.textAlign}
            fontFamily={store.font?.fontFamily || "Arial"}
            stroke={store.neonColor}
            strokeWidth={60} // Толщина контура
            offsetX={textSize.width / 2}
            opacity={0.2}
          />
        )}

        <Text
          text={store.text || "Ваш текст"}
          x={textX}
          y={textY}
          fontSize={store.getFontSize()}
          align={store.textAlign}
          fontFamily={store.font?.fontFamily || "Arial"}
          stroke={isTransparent ? "#000" : store.substrateColor?.value || "#FFFFFF"}
          strokeWidth={50}

          offsetX={textSize.width / 2}
        />
      </Group>
    );
  },
);

export default BorderSubstrate;
