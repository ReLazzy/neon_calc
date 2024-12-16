import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useSignStore } from "../stores/SignStoreContext";
import fontsConfig from "../config/fonts.json";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const FontSelector: React.FC = observer(() => {
  const store = useSignStore();
  const [isOpen, setIsOpen] = useState(false);

  // Установить базовый шрифт при первой загрузке компонента
  useEffect(() => {
    if (!store.font) {
      store.setFont(fontsConfig[0].name); // Берем первый шрифт из конфига
    }
  }, [store]);

  const handleSelectFont = (font: string) => {
    store.setFont(font);
    setIsOpen(false); // Закрыть выпадающий список после выбора
  };

  const selectedFont = fontsConfig.find((font) => font.name === store.font);

  return (
    <div className="relative w-full">
      {/* Кнопка выбора шрифта */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-pointer items-center justify-between rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white hover:bg-gray-600"
        style={{
          fontFamily: selectedFont?.fontFamily || fontsConfig[0].fontFamily,
        }}
      >
        <span>{selectedFont?.text || fontsConfig[0].text}</span>
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </div>

      {/* Выпадающий список */}
      {isOpen && (
        <div
          className="absolute z-10 mt-2 flex max-h-60 w-full flex-col gap-2 overflow-y-auto rounded-md bg-gray-800 p-2 shadow-lg"
          style={{ top: "100%" }}
        >
          {fontsConfig.map((font) => (
            <div
              key={font.name}
              onClick={() => handleSelectFont(font.name)}
              className={`cursor-pointer rounded-md px-3 py-2 text-center text-white transition ${
                store.font === font.name ? "bg-blue-500" : "bg-gray-700"
              } hover:bg-blue-500`}
              style={{
                fontFamily: font.fontFamily,
              }}
            >
              {font.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default FontSelector;
