import React, { useRef, useEffect, useState } from "react";
import { Stage, Layer, Text, Image, Rect, Group } from "react-konva";
import { useSignStore } from "../stores/SignStoreContext";
import { observer } from "mobx-react-lite";

import { FaAlignLeft, FaAlignCenter, FaAlignRight } from "react-icons/fa";
import { BorderSubstrate, SquareSubstrate } from "./Substrate";
import Konva from "konva";

const NeonCanvas: React.FC = observer(() => {
  const store = useSignStore();
  const stageRef = useRef<any>();
  const [textSize, setTextSize] = useState({ width: 0, height: 0 });
  const [backgroundImage, setBackgroundImage] = useState<HTMLImageElement>();
  const [blurImage, setBlurImage] = useState<HTMLImageElement | null>(null);
  const [scale, setScale] = useState(1);

  const canvasWidth = 2099;
  const canvasHeight = 2616;

  // Загрузка фонового изображения
  useEffect(() => {
    const bgImg = new window.Image();
    bgImg.src = "/image/backgroungfull.png";
    bgImg.onload = () => setBackgroundImage(bgImg);
    store.setText("");
  }, []);

  // Загрузка размытого изображения
  useEffect(() => {
    const neonColor = store.neonColor.slice(1); //#sadad sadad
    const blurImg = new window.Image();
    blurImg.src = `/image/${neonColor}.png`;

    blurImg.onload = () => setBlurImage(blurImg);
    blurImg.onerror = () => {
      setBlurImage(null);
      console.error(`Image not found: ${blurImg.src}`);
    };
  }, [store.neonColor]);

  // Рассчитываем размеры текста
  useEffect(() => {
    const tempText = new Konva.Text({
      text: store.text || "Ваш текст",
      fontSize: store.getFontSize(),
      fontFamily: store.font?.fontFamily || "Arial",
      fontStyle: store.getFontWeight(),
    });
    
    setTextSize({ width: tempText.width(), height: tempText.height() });
  }, [store.text, store.font, store.textAlign, store.height]);

  // Масштабируем полотно под 90% высоты экрана
  useEffect(() => {
    const maxHeight = window.innerHeight * 0.9; // 90% высоты экрана
    const newScale = maxHeight / canvasHeight;
    setScale(newScale);
  }, []);

  const exportImage = () => {
    const uri = stageRef.current.toDataURL({ pixelRatio: 2 });
    const link = document.createElement("a");
    link.href = uri;
    store.setFileName();
    link.download = store.fileName;
    link.click();
  };

  // Позиция вывески
  const signX = canvasWidth / 2 + 75;
  const signY = canvasHeight / 2 - 200;

  return (
    <div className="relative flex items-center justify-center">
      {/* Кнопка смены выравнивания */}
      <button
        onClick={store.switchAlign}
        className="absolute left-2 top-2 z-10 flex items-center gap-2 rounded-md bg-gray-700 px-4 py-2 text-white hover:bg-gray-600"
      >
        {store.textAlign === "center" && <FaAlignCenter />}
        {store.textAlign === "left" && <FaAlignLeft />}
        {store.textAlign === "right" && <FaAlignRight />}
      </button>

      {/* Кнопка сохранения */}
      <button
        onClick={exportImage}
        className="absolute right-2 top-2 z-10 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Сохранить изображение
      </button>

      {/* Полотно */}
      <Stage
        width={canvasWidth * scale}
        height={canvasHeight * scale}
        scaleX={scale}
        scaleY={scale}
        ref={stageRef}
        className="shadow-lg"
      >
        <Layer>
          {/* Фоновое изображение */}
          {backgroundImage && (
            <Image
              image={backgroundImage}
              width={canvasWidth}
              height={canvasHeight}
            />
          )}

          {/* Размытое изображение */}
         

          <Group draggable={true}>
            {/* Подложка square */}
            {store.substrateType === "square" && (
              <SquareSubstrate
                textX={signX}
                textY={signY}
                textSize={textSize}
                substrateColor={store.substrateColor}
                neonColor={store.neonColor}
              />
            )}

            {/* Подложка border */}
            {store.substrateType === "border" && (
              <BorderSubstrate
                textX={signX}
                textY={signY}
                textSize={textSize}
              />
            )}
 {blurImage && (
            <Image
              opacity={0.5}
              
              image={blurImage}
              width={canvasWidth}
              height={canvasHeight}
            />
          )}
            <Text
              draggable={true}
              text={store.text || "Ваш текст"}
              x={signX}
              y={signY}
              fontSize={store.getFontSize()}
              fontStyle={store.getFontWeight()}
              align={store.textAlign}
              fontFamily={store.font?.fontFamily || "Arial"}
              fill={store.neonColor}
              shadowBlur={200}
              shadowColor={store.neonColor}
              shadowOpacity={1}
              offsetX={textSize.width / 2}
            />

            <Text
              draggable
              text={`${Math.round(store.height)} см`} // Разделяем буквы на строки
              x={signX - textSize.width / 2 - 120}
              y={signY + textSize.height / 2 + 30}
              fontSize={40}
              fontStyle="bold"
              rotation={-90}
              fill="white"
            />

            <Text
              draggable
              text={`${Math.round(store.width)} см`}
              x={signX - 50}
              y={signY - 150}
              fontSize={40}
              fontStyle="bold"
              fill="white"
            />
          </Group>

          {/* Основной текст */}

          {/* Высота таблички */}
        </Layer>
      </Stage>
    </div>
  );
});

export default NeonCanvas;
