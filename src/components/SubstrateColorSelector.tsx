import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useSignStore } from "../stores/SignStoreContext";
import substrateColors from "../config/substrate.json"; // Импорт цветов подложки

const SubstrateColorSelector: React.FC = observer(() => {
  const store = useSignStore();

  useEffect(() => {
    if (!store.substrateColor) {
      store.setSubstrateColor(substrateColors[0].value); // Берем первый шрифт из конфига
    }
  }, [store]);
  return (
    <div className="flex space-x-4 overflow-x-auto py-4">
      {substrateColors.map((color) => (
        <div
          key={color.name}
          onClick={() => store.setSubstrateColor(color.value)} // Используем стор напрямую
          className="flex cursor-pointer flex-col items-center"
        >
          <div
            className={`h-[40px] w-[60px] rounded-lg`}
            style={{
              backgroundColor: color.value,
              boxShadow:
                store.substrateColor === color.value
                  ? "0 0 12px 4px rgba(0, 191, 255, 0.7)" // Подсветка активного цвета
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
});

export default SubstrateColorSelector;
