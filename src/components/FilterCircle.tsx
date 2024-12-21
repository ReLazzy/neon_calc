import React, { useEffect, useRef } from "react";
import { Circle } from "react-konva";
import Konva from "konva";

interface FilterCircleProps {
  x: number; // Координата X центра круга
  y: number; // Координата Y центра круга
  radius: number; // Радиус круга
  fill: string; // Цвет круга
  blurRadius: number; // Радиус размытия
}

const FilterCircle: React.FC<FilterCircleProps> = ({
  x,
  y,
  radius,
  fill,
  blurRadius,
}) => {
  const circleRef = useRef<Konva.Circle>(null);

  useEffect(() => {
    if (circleRef.current) {
      // Кэшируем круг для применения фильтра размытия
      circleRef.current.cache();
    }
  }, []);

  return (
    <Circle
      ref={circleRef}
      x={x}
      y={y}
      radius={radius}
      fill={fill}
      filters={[Konva.Filters.Blur]} // Добавляем фильтр размытия
      blurRadius={blurRadius} // Радиус размытия
      opacity={0.1}
      // Прозрачность круга
    />
  );
};

export default FilterCircle;
