import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useSignStore } from "../stores/SignStoreContext";
import SubstrateColorSelector from "./SubstrateColorSelector";

const BackgroundSelector: React.FC = observer(() => {
  const store = useSignStore();

  const backgroundOptions = [
    { name: "border", image: "image/bg.png" },
    { name: "square", image: "image/bg2.png" },
  ];

  useEffect(() => {
    if (!store.substrateType) {
      store.setSubstrateType("square"); // Берем первый шрифт из конфига
    }
  }, [store]);

  return (
    <div className="space-y-6">
      {/* Выбор фона */}
      <div>
        <label className="mb-2 block font-semibold text-white">
          Выберите подложку
        </label>
        <div className="flex gap-4">
          {backgroundOptions.map(({ name, image }) => (
            <div
              key={name}
              onClick={() => store.setSubstrateType(name)} // Выбор фона через стор
              className={`flex h-[50px] w-[30%] cursor-pointer select-none justify-center overflow-hidden rounded-md bg-white transition-all duration-200 ease-in-out ${
                store.substrateType === name
                  ? "border-2 border-blue-500"
                  : "border-2 border-transparent"
              }`}
            >
              <img
                src={image}
                alt={name}
                className="h-full w-full rounded-md object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Выбор цвета подложки */}
      <div>
        <label className="mb-2 block font-semibold text-white">
          Выберите цвет подложки
        </label>
        <SubstrateColorSelector />
      </div>
    </div>
  );
});

export default BackgroundSelector;
