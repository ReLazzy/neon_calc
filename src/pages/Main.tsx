import React from "react";
import NeonCanvas from "../components/NeonCanvas";
import NeonSignCalculator from "../components/NeonSignCalculator";

export default function Main() {
  return (
    <div className="flex h-screen items-center justify-center gap-8 bg-gray-900 p-4">
      {/* Левая часть: Полотно */}
      <div className="flex-1 rounded-lg bg-gray-800 p-4 shadow-lg">
        <NeonCanvas />
      </div>

      {/* Правая часть: Форма */}

      <NeonSignCalculator />
    </div>
  );
}
