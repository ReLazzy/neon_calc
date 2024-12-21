import React from "react";
import NeonCanvas from "../components/NeonCanvas";
import NeonSignCalculator from "../components/NeonSignCalculator";

export default function Main() {
  return (
    <div className="flex h-screen items-center justify-center gap-8 bg-gray-900 p-4">
      {/* Левый и правый блоки */}
      <div className="flex h-full w-full flex-grow gap-8">
        {/* Левая часть: Полотно */}
        <div className="flex h-full max-h-screen flex-1 flex-col rounded-lg bg-gray-800 p-4 shadow-lg">
          <NeonCanvas />
        </div>

        {/* Правая часть: Калькулятор */}
        <div className="flex h-full max-h-screen flex-col overflow-y-auto rounded-lg bg-gray-800 p-4 shadow-lg">
          <NeonSignCalculator />
        </div>
      </div>
    </div>
  );
}
