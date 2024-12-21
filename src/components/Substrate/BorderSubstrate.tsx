import { observer } from "mobx-react-lite";
import React from "react";
import { Text } from "react-konva";
import { useSignStore } from "../../stores/SignStoreContext";

interface BorderSubstrateProps {
  textX: number;
  textY: number;
  textSize: { width: number; height: number };
}

const BorderSubstrate: React.FC<BorderSubstrateProps> = observer(
  ({ textX, textY, textSize }) => {
    const store = useSignStore();

    const isTransparent: boolean = store.substrateColor === "transparent";

    return (
      <>
        {isTransparent && (
          <Text
            draggable={true}
            text={store.text || "Ваш текст"}
            x={textX}
            y={textY}
            fontSize={store.getFontSize()}
            fontStyle={store.getFontWeight()}
            align={store.textAlign}
            fontFamily={store.font || "Arial"}
            stroke={store.neonColor}
            strokeWidth={60} // Толщина контура
            offsetX={textSize.width / 2}
            opacity={0.8}
          />
        )}

        <Text
          draggable={true}
          text={store.text || "Ваш текст"}
          x={textX}
          y={textY}
          fontSize={store.getFontSize()}
          fontStyle={store.getFontWeight()}
          align={store.textAlign}
          fontFamily={store.font || "Arial"}
          stroke={isTransparent ? "#000" : store.substrateColor}
          strokeWidth={50}
          opacity={isTransparent ? 1 : 0.3}
          offsetX={textSize.width / 2}
        />
      </>
    );
  },
);

export default BorderSubstrate;
