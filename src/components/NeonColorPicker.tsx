import React from "react";
import neonColors from "../config/neon.json"; // Импорт цветов неона

interface NeonColorPickerProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

const NeonColorPicker: React.FC<NeonColorPickerProps> = ({
  selectedColor,
  onColorSelect,
}) => {
  return (
    <div className="flex flex-wrap gap-4 py-4">
      {neonColors.map((color) => (
        <div
          key={color.name}
          onClick={() => onColorSelect(color.value)}
          className="relative flex cursor-pointer flex-col items-center"
          style={{ width: "60px" }} // Ограничиваем ширину элемента, чтобы они могли "переломиться" на следующую строку
        >
          <div
            className="h-[8px] w-[60px] rounded-full"
            style={{
              backgroundColor: color.value,
              boxShadow: `0 0 10px ${color.value}`, // Эффект свечения
              border: selectedColor === color.value ? "2px solid #fff" : "none", // Белая обводка
            }}
          />
          <span className="mt-2 text-center text-sm text-white">
            {color.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default NeonColorPicker;
