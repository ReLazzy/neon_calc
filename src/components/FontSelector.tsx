import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi"; // Иконки для стрелки

interface FontSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const FontSelector: React.FC<FontSelectorProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const fontOptions = [
    { name: "Photogenic", fontFamily: "Photogenic", text: "Photogenic" },
    { name: "Elegant", fontFamily: "Elegant", text: "Elegant" },
    { name: "Cursive", fontFamily: "Cursive", text: "Cursive" },
  ];

  const handleSelectFont = (font: string) => {
    onChange(font);
  };

  // Находим выбранный шрифт
  const selectedFont = fontOptions.find((option) => option.name === value);

  return (
    <div className="relative w-full">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="ml-[5px] flex cursor-pointer select-none items-center justify-between rounded-md border bg-gray-100 p-2"
        style={{
          width: "40%", // Увеличена ширина кнопки
          height: "50px",
          backgroundColor: "#f0f0f0",
          fontFamily: selectedFont
            ? selectedFont.fontFamily
            : fontOptions[0].fontFamily, // По умолчанию первый шрифт
          textAlign: "center",
          lineHeight: "50px",
          fontSize: "16px",
          color: "black", // Текст черного цвета
          overflow: "hidden", // Обрезать текст, если он не влезает
          textOverflow: "ellipsis", // Показать троеточие, если текст обрезается
          whiteSpace: "nowrap", // Не разрывать текст на несколько строк
        }}
      >
        <span>{selectedFont ? selectedFont.text : fontOptions[0].text}</span>
        <div className="ml-2">
          {isOpen ? <FiChevronUp /> : <FiChevronDown />}
        </div>
      </div>

      {isOpen && (
        <div className="mt-2 w-full">
          <div className="flex flex-wrap justify-center gap-5">
            {fontOptions.map(({ name, fontFamily, text }) => (
              <div
                key={name}
                onClick={() => handleSelectFont(name)}
                className="flex cursor-pointer select-none items-center justify-center rounded-md border border-gray-300 hover:bg-blue-100"
                style={{
                  width: "30%", // Сделаны одинаковыми по ширине
                  height: "50px",
                  backgroundColor: "#f0f0f0",
                  fontFamily: fontFamily, // Применяем шрифт как в активной кнопке
                  textAlign: "center",
                  lineHeight: "50px",
                  fontSize: "16px",
                  color: "black", // Текст черного цвета
                  overflow: "hidden",
                  textOverflow: "ellipsis", // Обрезать текст, если не влезает
                  whiteSpace: "nowrap", // Не разрывать текст
                }}
              >
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FontSelector;
