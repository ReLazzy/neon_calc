import { observer } from "mobx-react-lite";
import React from "react";
import { Group, Rect, Text } from "react-konva";
import { useSignStore } from "../../stores/SignStoreContext";
import { KonvaLetterText } from "../KonvaLetterText";
import { KOSAN } from "../../fonts/Kosan";

interface BorderSubstrateProps {
  textX: number;
  textY: number;
  textSize: { width: number; height: number };
}

const BorderSubstrate: React.FC<BorderSubstrateProps> = observer(
  ({ textX, textY, textSize }) => {
    const store = useSignStore();

    const isTransparent: boolean =
      store.substrateColor?.value === "transparent";

    return (
      <Group draggable={false}>
        {/* Прямоугольник субстрата */}
        <Rect
          x={textX}
          offsetX={textSize.width / 2 - store.height / 3}
          y={textY + store.height / 3}
          width={textSize.width - store.height / 2}
          height={textSize.height - store.height}
          fill={isTransparent ? "#FFF" : store.substrateColor?.value}
          shadowBlur={200}
          opacity={1}
          stroke={isTransparent ? "#fff" : undefined}
          strokeWidth={isTransparent ? 20 : 0}
          shadowForStrokeEnabled
          shadowColor={store.neonColor}
          shadowOpacity={0.7}
          cornerRadius={20}
        />

        {/* Текст-контура для эффекта прозрачного субстрата */}
        {isTransparent && (
          <KonvaLetterText
            font={store.fontKonst.font}
            text={store.text || "Ваш текст"}
            x={textX}
            y={textY}
            height={store.height * 4}
            offsetX={textSize.width / 2}
            lineHeight={store.fontKonst.lineHeight}
            letterSpacing={store.fontKonst.letterSpacing}
            textAlign={store.textAlign}
            stroke={store.neonColor}
            strokeWidth={40} // Толщина контура
            shadowBlur={40}
            shadowColor={store.neonColor}
            shadowOpacity={0.2}
          />
        )}
        {isTransparent && (
          <Rect
            x={textX}
            offsetX={textSize.width / 2 - store.height / 3}
            y={textY + store.height / 3}
            width={textSize.width - store.height / 2}
            height={textSize.height - store.height}
            fill={"#000"}
            opacity={1}
            cornerRadius={20}
          />
        )}
        {/* Основной текст */}
        <KonvaLetterText
          font={store.fontKonst.font}
          text={store.text || "Ваш текст"}
          x={textX}
          y={textY}
          height={store.height * 4}
          offsetX={textSize.width / 2}
          lineHeight={store.fontKonst.lineHeight}
          letterSpacing={store.fontKonst.letterSpacing}
          textAlign={store.textAlign}
          stroke={
            isTransparent ? "#000" : store.substrateColor?.value || "#fff"
          }
          strokeWidth={35}
        />
      </Group>
    );
  },
);

export default BorderSubstrate;
