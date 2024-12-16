import React from "react";
import { observer } from "mobx-react-lite";
import { useSignStore } from "../stores/SignStoreContext";
import SignCharacteristicsForm, {
  Characteristic,
} from "./SignCharacteristicsForm";
import BackgroundSelector from "./BackgroundSelector";
import NeonColorPicker from "./NeonColorPicker";
import FontSelector from "./FontSelector";

const NeonSignCalculator: React.FC = observer(() => {
  const store = useSignStore();

  interface CharacteristicConfig {
    key: string;
    characteristic: Characteristic;
    onChange: (value: string) => void;
  }

  const characteristics: CharacteristicConfig[] = [
    {
      key: "Толщина неона",
      characteristic: {
        name: "Толщина неона",
        type: "select",
        options: [
          { label: "6 мм", value: "6mm" },
          { label: "8 мм", value: "8mm" },
        ],
        value: store.neonThickness,
      },
      onChange: (value: string) => store.setNeonThickness(value),
    },
    {
      key: "Тип подложки",
      characteristic: {
        name: "Тип подложки",
        type: "select",
        options: [
          { label: "Гладкая", value: "glossy" },
          { label: "Матовая", value: "matte" },
        ],
        value: store.substrateCoating,
      },
      onChange: (value: string) => store.setSubstrateCoating(value),
    },
    {
      key: "Размер текста",
      characteristic: {
        name: "Размер текста",
        type: "select",
        options: [
          { label: "Маленький", value: "small" },
          { label: "Большой", value: "big" },
        ],
        value: store.fontSize,
      },
      onChange: (value: string) => store.setFontSize(value),
    },
    {
      key: "Где будет использоваться",
      characteristic: {
        name: "Где будет использоваться",
        type: "select",
        options: [
          { label: "В помещении", value: "indoor" },
          { label: "На улице", value: "outdoor" },
        ],
        value: store.usage,
      },
      onChange: (value: string) => store.setUsage(value),
    },
    {
      key: "Тип неона",
      characteristic: {
        name: "Тип неона",
        type: "select",
        options: [
          { label: "Обычный неон", value: "regular" },
          { label: "Смарт неон", value: "smart" },
          { label: "РГБ", value: "rgb" },
        ],
        value: store.neonType,
      },
      onChange: (value: string) => store.setNeonType(value),
    },
  ];

  return (
    <div className="mx-auto w-full max-w-xl rounded-lg bg-gray-900 p-4 text-white shadow-md">
      <h1 className="mb-4 text-center text-2xl font-bold text-blue-400">
        Калькулятор неоновых вывесок
      </h1>

      {/* Текст и размеры */}
      <div className="mb-4 flex flex-wrap gap-4">
        <div className="w-full">
          <label className="mb-1 block text-sm font-semibold">
            Введите текст
          </label>
          <textarea
            value={store.text}
            onChange={(e) => store.setText(e.target.value)}
            rows={1} // Высота одной строки
            className="w-full resize-none overflow-hidden rounded-md border border-gray-600 bg-gray-700 px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ваш текст"
          />
        </div>
        <div className="w-full sm:w-[48%]">
          <label className="mb-1 block text-sm font-semibold">
            Высота вывески (мм)
          </label>
          <input
            type="number"
            min={12}
            value={store.height}
            onChange={(e) => store.setHeight(parseFloat(e.target.value))}
            className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Введите высоту"
          />
        </div>
      </div>

      {/* Цвета */}
      <div className="mb-4">
        <label className="mb-1 block text-sm font-semibold">
          Выберите цвет неона
        </label>
        <NeonColorPicker />
      </div>
      <div className="mb-4">
        <BackgroundSelector />
      </div>

      {/* Шрифт */}
      <div className="mb-4">
        <label className="mb-1 block text-sm font-semibold">
          Выберите шрифт
        </label>
        <FontSelector />
      </div>

      {/* Характеристики */}
      <div className="flex flex-wrap gap-4">
        {characteristics.map(({ key, characteristic, onChange }) => (
          <div key={key} className="w-full sm:w-[48%]">
            <SignCharacteristicsForm
              value={characteristic.value}
              characteristic={characteristic}
              onChange={(_, value) => onChange(value)}
            />
          </div>
        ))}
      </div>

      {/* Кнопка */}
      <button
        className="mt-4 w-full rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => {
          store.calculatePrice();
          alert(`Стоимость вывески: ${store.price.toFixed(2)} ₽`);
        }}
      >
        Рассчитать стоимость
      </button>
    </div>
  );
});

export default NeonSignCalculator;
