import React, { useState } from "react";
import SubstrateColorSelector from "./SubstrateColorSelector";

interface BackgroundSelectorProps {
  onBackgroundChange: (background: string) => void;
  onBackgroundColorChange: (color: string) => void;
}

const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({
  onBackgroundChange,
  onBackgroundColorChange,
}) => {
  const [selectedBackground, setSelectedBackground] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  const backgroundOptions = [
    { name: "Background 1", image: "image/bg.png" },
    { name: "Background 2", image: "image/bg2.png" },
  ];

  const handleBackgroundSelect = (background: string) => {
    setSelectedBackground(background);
    onBackgroundChange(background);
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    onBackgroundColorChange(color);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex gap-4">
          {backgroundOptions.map(({ name, image }) => (
            <div
              key={name}
              onClick={() => handleBackgroundSelect(image)}
              className={`flex h-[120px] w-[30%] cursor-pointer select-none justify-center overflow-hidden rounded-md bg-white transition-all duration-200 ease-in-out ${
                selectedBackground === image
                  ? "border-2 border-blue-500"
                  : "border-2 border-transparent"
              }`}
            >
              <img
                src={image}
                alt={name}
                className="h-full w-full rounded-md object-contain" // Заменено на w-full, h-full и object-contain для лучшего отображения
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block font-semibold text-white">
          Выберите цвет подложки
        </label>
        <SubstrateColorSelector
          selectedColor={selectedColor}
          onColorSelect={handleColorSelect}
        />
      </div>
    </div>
  );
};

export default BackgroundSelector;
