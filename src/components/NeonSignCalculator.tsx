import React, { useState } from "react";
import SignCharacteristicsForm, {
  Characteristic,
} from "./SignCharacteristicsForm";
import BackgroundSelector from "./BackgroundSelector";
import NeonColorPicker from "./NeonColorPicker";
import FontSelector from "./FontSelector";

const NeonSignCalculator = () => {
  const [neonThickness, setNeonThickness] = useState("6mm");
  const [neonType, setNeonType] = useState("regular");
  const [substrateType, setSubstrateType] = useState("glossy");
  const [usage, setUsage] = useState("indoor");
  const [fontSize, setFontSize] = useState("small");
  const [text, setText] = useState("");
  const [font, setFont] = useState("");
  const [neonColor, setNeonColor] = useState("");
  const [substrateColor, setSubstrateColor] = useState("");

  const characteristics: { [key: string]: Characteristic } = {
    neonThickness: {
      name: "Толщина неона",
      type: "select",
      options: [
        { label: "6 мм", value: "6mm" },
        { label: "8 мм", value: "8mm" },
      ],
      value: neonThickness,
    },
    neonType: {
      name: "Тип неона",
      type: "select",
      options: [
        { label: "Обычный неон", value: "regular" },
        { label: "Смарт неон", value: "smart" },
        { label: "РГБ", value: "rgb" },
      ],
      value: neonType,
    },
    substrateType: {
      name: "Тип подложки",
      type: "select",
      options: [
        { label: "Гладкая", value: "glossy" },
        { label: "Матовая", value: "matte" },
      ],
      value: substrateType,
    },
    usage: {
      name: "Где будет использоваться",
      type: "select",
      options: [
        { label: "В помещении", value: "indoor" },
        { label: "На улице", value: "outdoor" },
      ],
      value: usage,
    },
    fontSize: {
      name: "Размер текста",
      type: "select",
      options: [
        { label: "Маленький", value: "small" },
        { label: "Большой", value: "big" },
      ],
      value: fontSize,
    },
  };

  const handleCharacteristicChange = (name: string, value: string) => {
    const updateStateMap: {
      [key: string]: React.Dispatch<React.SetStateAction<string>>;
    } = {
      "Толщина неона": setNeonThickness,
      "Тип неона": setNeonType,
      "Тип подложки": setSubstrateType,
      "Где будет использоваться": setUsage,
      "Размер текста": setFontSize,
    };

    if (updateStateMap[name]) {
      updateStateMap[name](value);
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl rounded-lg bg-gray-900 p-6 text-white">
      {/* Первая строка: Введите текст вывески и высота */}
      <div className="mt-6 flex flex-wrap gap-6">
        <div className="w-full sm:w-[48%]">
          <label className="mb-2 block font-semibold text-white">
            Введите текст
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 rounded-xl border-2 border-gray-300 bg-transparent px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ваш текст"
          />
        </div>
        <div className="w-full sm:w-[48%]">
          <label className="mb-2 block font-semibold text-white">
            Введите высоту вывески
          </label>
          <input
            type="number"
            min="12"
            className="flex-1 rounded-xl border-2 border-gray-300 bg-transparent px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Введите высоту (не менее 12)"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-6">
        <div className="w-full sm:w-[48%]">
          <label className="mb-2 block font-semibold text-white">
            Выберите цвет неона
          </label>
          <NeonColorPicker
            selectedColor={neonColor}
            onColorSelect={setNeonColor}
          />
        </div>
        <div className="w-full sm:w-[48%]">
          <label className="mb-2 block font-semibold text-white">
            Выберите подложку
          </label>
          <BackgroundSelector
            onBackgroundChange={() => {}}
            onBackgroundColorChange={setSubstrateColor}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-6">
        <div className="w-full sm:w-[48%]">
          <label className="mb-2 block font-semibold text-white">
            Выберите шрифт
          </label>
          <FontSelector value={font} onChange={setFont} />
        </div>
      </div>

      {/* Четвертая строка: Характеристики */}
      <div className="mt-6 flex flex-wrap items-start justify-start gap-6">
        <SignCharacteristicsForm
          key="Где будет использоваться"
          value={usage}
          characteristic={characteristics.usage}
          onChange={handleCharacteristicChange}
        />
        <SignCharacteristicsForm
          key="Тип неона"
          value={neonType}
          characteristic={characteristics.neonType}
          onChange={handleCharacteristicChange}
        />

        <SignCharacteristicsForm
          key="Тип подложки"
          value={substrateType}
          characteristic={characteristics.substrateType}
          onChange={handleCharacteristicChange}
        />
        <SignCharacteristicsForm
          key="Размер текста"
          value={fontSize}
          characteristic={characteristics.fontSize}
          onChange={handleCharacteristicChange}
        />
        <SignCharacteristicsForm
          key="Толщина неона"
          value={neonThickness}
          characteristic={characteristics.neonThickness}
          onChange={handleCharacteristicChange}
        />
      </div>

      <button
        className="mt-6 w-full rounded-md bg-blue-500 px-6 py-2 text-white"
        onClick={() => alert("Калькуляция завершена")}
      >
        Рассчитать
      </button>
    </div>
  );
};

export default NeonSignCalculator;
