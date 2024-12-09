import React from "react";
import substrateColors from "../config/substrate.json"; // Импорт цветов подложки

interface SubstrateColorSelectorProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

const SubstrateColorSelector: React.FC<SubstrateColorSelectorProps> = ({
  selectedColor,
  onColorSelect,
}) => {
  return (
    <div className="flex space-x-4 overflow-x-auto py-4">
      {substrateColors.map((color) => (
        <div
          key={color.name}
          onClick={() => onColorSelect(color.value)}
          className="flex cursor-pointer flex-col items-center"
        >
          <div
            className={`h-[40px] w-[60px] rounded-lg`}
            style={{
              backgroundColor: color.value,
              boxShadow:
                selectedColor === color.value
                  ? "0 0 12px 4px rgba(0, 191, 255, 0.7)" // Более яркая голубая подсветка
                  : "none",
              border: "1px solid #333", // Темная обводка
            }}
          />
          <span className="mt-2 text-center text-sm text-white">
            {color.code + " " + color.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SubstrateColorSelector;
