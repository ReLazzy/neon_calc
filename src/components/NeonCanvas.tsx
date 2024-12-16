import React, { useRef, useEffect, useState } from "react";
import { Stage, Layer, Text, Rect, Image, Path } from "react-konva";
import { useSignStore } from "../stores/SignStoreContext";
import { observer } from "mobx-react-lite";
import fontsConfig from "../config/fonts.json";
import opentype from "opentype.js";
import { FaAlignLeft, FaAlignCenter, FaAlignRight } from "react-icons/fa";
import Konva from "konva";

const NeonCanvas: React.FC = observer(() => {
  const store = useSignStore();
  const stageRef = useRef<any>();
  const [textSize, setTextSize] = useState({ width: 0, height: 0 });
  const [backgroundImage, setBackgroundImage] =
    useState<HTMLImageElement | null>(null);
  const [scale, setScale] = useState(1);
  const [textPath, setTextPath] = useState("");

  const canvasWidth = 2099;
  const canvasHeight = 2616;

  const selectedFont = fontsConfig.find((font) => font.name === store.font);

  // Генерация Path для текста
  const generateTextPath = (
    text: string,
    fontUrl: string,
    fontSize: number,
  ) => {
    opentype.load(fontUrl, (error: any, font?: opentypejs.Font) => {
      if (error || !font) return;
      const lines = text.split("\n");
      let pathData = "";
      let yOffset = 0;
      lines.forEach((line) => {
        const path = font.getPath(line, 0, yOffset, fontSize);
        pathData += path.toPathData(2);
        yOffset += fontSize * 1.2;
      });
      setTextPath(pathData);
    });
  };

  // Загрузка фонового изображения
  useEffect(() => {
    const img = new window.Image();
    img.src = "/image/backgroungfull.png";
    img.onload = () => setBackgroundImage(img);
  }, []);

  // Рассчитываем размеры текста и Path
  useEffect(() => {
    const tempText = new Konva.Text({
      text: store.text || "Ваш текст",
      fontSize: store.getFontSize(),
      fontFamily: selectedFont?.fontFamily || "Arial",
      fontStyle: store.getFontWeight(),
    });
    setTextSize({ width: tempText.width(), height: tempText.height() });

    if (selectedFont?.file) {
      generateTextPath(store.text, selectedFont.file, store.getFontSize());
    }
  }, [store.text, store.fontSize, selectedFont]);

  // Масштабируем полотно под 100% высоты экрана
  useEffect(() => {
    const maxHeight = window.innerHeight * 0.9; // 90% высоты экрана
    const newScale = maxHeight / canvasHeight;
    setScale(newScale);
  }, []);

  const exportImage = () => {
    const uri = stageRef.current.toDataURL({ pixelRatio: 2 });
    const link = document.createElement("a");
    link.href = uri;
    link.download = "neon-sign.png";
    link.click();
  };

  const textX = canvasWidth / 2 + 50;
  const textY = canvasHeight / 2;

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

          {/* Светящийся круг по центру */}
          {store.substrateType === "square" && (
            <Rect
              x={textX - textSize.width / 2 - 55}
              y={textY - textSize.height / 2 - 40}
              width={textSize.width + 100}
              height={textSize.height + 80}
              fill={store.substrateColor || "rgba(255,255,255,0.2)"} // Светлый фон
              cornerRadius={10}
              shadowBlur={50}
              shadowColor={store.neonColor || "rgba(255, 255, 0, 0.7)"} // Мягкая тень для свечения
              shadowOpacity={0.7}
            />
          )}

          {/* Прозрачный контур для square */}
          {store.substrateType === "square" &&
            store.substrateColor === "transparent" && (
              <Rect
                x={textX - textSize.width / 2 - 55}
                y={textY - textSize.height / 2 - 45}
                width={textSize.width + 100}
                height={textSize.height + 80}
                stroke={store.hexToRGBA(store.neonColor, 0.7)}
                strokeWidth={6} // Более толстый контур
                cornerRadius={10}
                shadowBlur={30}
                shadowColor={store.neonColor || "yellow"} // Тень для подсветки
                shadowOpacity={0.8}
              />
            )}

          {/* Подложка border */}
          {store.substrateType === "border" && textPath && (
            <Path
              data={textPath}
              x={textX - textSize.width / 2}
              y={textY - textSize.height / 2}
              stroke={store.substrateColor || "yellow"}
              strokeWidth={12}
              fill="transparent"
            />
          )}

          {/* Основной текст */}
          <Text
            text={store.text || "Ваш текст"}
            x={textX}
            y={textY - textSize.height / 2}
            fontSize={store.getFontSize()}
            fontStyle={store.getFontWeight()}
            align={store.textAlign}
            fontFamily={selectedFont?.fontFamily || "Arial"}
            fill={store.neonColor}
            shadowBlur={30}
            shadowOpacity={0.8}
            offsetX={textSize.width / 2}
          />
        </Layer>
      </Stage>
    </div>
  );
});

export default NeonCanvas;
