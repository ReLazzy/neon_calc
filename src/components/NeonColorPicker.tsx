import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useSignStore } from "../stores/SignStoreContext";
import neonColors from "../config/neon.json"; // Импорт цветов неона

const NeonColorPicker: React.FC = observer(() => {
  const store = useSignStore();
  useEffect(() => {
    if (!store.neonColor) {
      store.setNeonColor(neonColors[0].value); // Берем первый шрифт из конфига
    }
  }, [store]);
  return (
    <div className="flex flex-wrap gap-8 py-4">
      {neonColors.map((color) => (
        <div
          key={color.name}
          onClick={() => store.setNeonColor(color.value)} // Используем стор напрямую
          className="relative flex cursor-pointer flex-col items-center"
          style={{ width: "60px" }} // Ограничиваем ширину элемента
        >
          <div
            className="h-[8px] w-[60px] rounded-full"
            style={{
              backgroundColor: color.value,
              boxShadow: `0 0 10px ${color.value}`, // Эффект свечения
              border:
                store.neonColor === color.value ? "2px solid #fff" : "none", // Белая обводка активного цвета
            }}
          />
          <span className="mt-2 text-center text-sm text-white">
            {color.name}
          </span>
        </div>
      ))}
    </div>
  );
});

export default NeonColorPicker;
