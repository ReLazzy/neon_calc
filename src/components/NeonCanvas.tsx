import React, { useRef, useEffect, useState } from "react";
import { Stage, Layer, Text, Image, Rect, Group, Line } from "react-konva";
import { useSignStore } from "../stores/SignStoreContext";
import { observer } from "mobx-react-lite";

import { FaAlignLeft, FaAlignCenter, FaAlignRight } from "react-icons/fa";
import { BorderSubstrate, SquareSubstrate } from "./Substrate";
import Konva from "konva";

const NeonCanvas: React.FC = observer(() => {
  const store = useSignStore();
  const stageRef = useRef<any>();
  const textRef = useRef<any>(null);
  const [textSize, setTextSize] = useState({ width: 0, height: 0 });
  const [backgroundImage, setBackgroundImage] = useState<HTMLImageElement>();
  const [blurImage, setBlurImage] = useState<HTMLImageElement | null>(null);
  const [tinkoffImage, setTinkoffImage] = useState<HTMLImageElement | null>(
    null,
  );
  const [neonImage, setNeonImage] = useState<HTMLImageElement | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [scale, setScale] = useState(1);
  const canvasWidth = 2099;
  const canvasHeight = 2616;
  const fullPriceX = 420;
  const fullPriceY = 270;


  useEffect(() => {
    // Извлекаем данные из Local Storage
    const name = localStorage.getItem("name") || "Default Name";
    setUserName(name);
  }, []); 

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

  useEffect(() => {
    const img = new window.Image();
    const neonImg = new window.Image();
    img.src = "/image/tinkoff.png";
    neonImg.src = "/image/neon.png";
    img.onload = () => {
      console.log("Изображение загружено:", img);
      setTinkoffImage(img);
    };
    neonImg.onload = () => {
      setNeonImage(neonImg);
    };
    neonImg.onerror = (error) => {
      console.error("Ошибка загрузки изображения:", error);
      setNeonImage(null);
    };
    img.onerror = (error) => {
      console.error("Ошибка загрузки изображения:", error);
      setTinkoffImage(null);
    };
  }, []);

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
                substrateColor={store.substrateColor?.value || "#FFFFFF"}
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
            <Group draggable>
              <Text
                text={store.text || "Ваш текст"}
                x={signX}
                y={signY}
                fontSize={store.getFontSize()}
                fontStyle={store.getFontWeight()}
                align={store.textAlign}
                fontFamily={store.font?.fontFamily || "Arial"}
                shadowBlur={200}
                shadowColor={"#00000"}
                shadowOpacity={1}
                offsetX={textSize.width / 2}
              />
              <Text
                text={store.text || "Ваш текст"}
                x={signX}
                y={signY}
                fontSize={store.getFontSize()}
                fontStyle={store.getFontWeight()}
                align={store.textAlign}
                fontFamily={store.font?.fontFamily || "Arial"}
                fill={store.neonColor}
                shadowBlur={100}
                shadowColor={store.neonColor}
                shadowOpacity={1}
                offsetX={textSize.width / 2}
              />
            </Group>

            <Text
              draggable
              text={`${Math.round(store.height)} см`} // Разделяем буквы на строки
              x={signX - textSize.width / 2 - 120}
              y={signY + textSize.height / 2 + 30}
              fontSize={60}
              fontFamily="Comfortaa"
              rotation={-90}
              fill="white"
            />

            <Text
              draggable
              text={`${Math.round(store.width)} см`}
              x={signX - 50}
              y={signY - 150}
              fontSize={60}
              fontFamily="Comfortaa"
              fill="white"
            />
          </Group>

          <Group draggable={true}>
            <Text
              draggable={false}
              text={`Материалы премиум-класса:\n - гибкий неон из 100% ПВХ молщиной 6 мм. 3,1 м \n - подложка из прозрачного органического стекла толщиной 5 мм. \n Цена за срок изготовления 5-7 дней`}
              x={50}
              y={1950}
              fontSize={50}
              fontFamily="Comfortaa"
              fill="white"
              lineHeight={1.5}
            />
            <Text
              draggable={false}
              text={`Сократить срок до 3-4 дней: ${store.rushPrice} руб`}
              x={50}
              y={2250}
              fontSize={50}
              fontFamily="Comfortaa"
              fill="#0fc3b1"
              lineHeight={1.5}
            />
            <Text
              draggable={false}
              text={`Рассрочка: -0% переплат, 3-6 месяцев`}
              x={50}
              y={2320}
              fontSize={50}
              fontFamily="Comfortaa"
              fill="#d3c418"
              lineHeight={1.5}
            />
            <Text
              draggable={false}
              text={`Монтажные работы и доставка в стоимость не включены\n *цвета, толщина, положение в макете может немного отличаться от\n реальной вывески`}
              x={50}
              y={2390}
              fontSize={50}
              fontFamily="Comfortaa"
              fill="white"
              lineHeight={1.5}
            />
          </Group>

          <Text
            draggable={true}
            text={`Уф печать\nАрикловые накладки\nПлёнка №${store.substrateColor?.code}\nКонтураж`}
            x={1550}
            y={1420}
            fontSize={42}
            fontFamily="Comfortaa"
            fill="white"
            lineHeight={1.5}
            opacity={0.3}
            align="right"
          />

          <Group draggable={true}>
            {tinkoffImage && <Image x={100} y={100} image={tinkoffImage} />}
            <Text
              draggable={false}
              text={`До 14.04.24 цена составляет\nизготовление 5-7 дней`}
              x={270}
              y={130}
              fontSize={42}
              fontFamily="Comfortaa"
              fill="white"
              lineHeight={1.5}
              align="center"
            />
            <Text
              draggable={false}
              text={`${store.fullPrice} руб`}
              x={fullPriceX}
              y={fullPriceY}
              fontSize={70}
              fontFamily="Comfortaa"
              fill="white"
              lineHeight={1.5}
              align="center"
            />
            <Line
              points={[420, 320, 780, 320]} // Начальная и конечная точки линии
              stroke="white" // Цвет линии
              strokeWidth={5} // Толщина линии
            />
            <Text
              draggable={false}
              text={`${store.discountPrice} руб`}
              x={380}
              y={350}
              fontSize={90}
              fontFamily="Comfortaa"
              fill="#0fc3b1"
              lineHeight={1.5}
              align="center"
            />
            <Text
              draggable={false}
              text={`Изготовление 3-4 дня:`}
              x={350}
              y={480}
              fontSize={42}
              fontFamily="Comfortaa"
              fill="white"
              lineHeight={1.5}
              align="center"
            />
            <Text
              draggable={false}
              text={`${store.rushPrice} руб`}
              x={430}
              y={530}
              fontSize={70}
              fontFamily="Comfortaa"
              fill="#0fc3b1"
              lineHeight={1.5}
              align="center"
            />
            <Text
              draggable={false}
              text={`Диммер +990 руб`}
              x={420}
              y={630}
              fontSize={42}
              fontFamily="Comfortaa"
              fill="white"
              lineHeight={1.5}
              align="center"
            />
          </Group>

          <Text
              draggable={true}
              text={`Design by Moscow Neon\n${userName}`}
              x={850}
              y={1850}
              fontSize={100}
              fontFamily="Updock"
              fill="white"
              lineHeight={1}
              opacity={0.3}
              align="center"
              rotation={-5}
            />

          <Group draggable={true}>
            {neonImage && <Image x={1100} y={50} image={neonImage} />}
          </Group>

          {/* Основной текст */}

          {/* Высота таблички */}
        </Layer>
      </Stage>
    </div>
  );
});

export default NeonCanvas;
