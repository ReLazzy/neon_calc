interface CalculateParams {
  text: string;
  height: number;
  font: string;
  neonThickness: string;
  usage: string;
}

interface WidthResult {
  width: number;
}

interface PriceResult {
  price: number;
}

/**
 * Функция для расчета ширины вывески
 */
export function calculateWidth({
  text,
  height,
  font,
  neonThickness,
}: CalculateParams): WidthResult {
  const abris = 6.2; // Толщина неона
  const u_d = 18.1 + abris / 2; // Отступ сверху/снизу
  const miniSpace = 4 + abris; // Расстояние между буквами

  // Расчет ширины текста
  const baseWidth = text.split("").reduce((total, char) => {
    // Примерная ширина буквы (можно связать с шрифтом)
    const charWidth = font === "bold" ? 0.6 : 0.5;
    return total + charWidth * height;
  }, 0);

  // Итоговая ширина
  const width = baseWidth + text.length * miniSpace + u_d * 2;

  return { width: Math.round(width) };
}

/**
 * Функция для расчета стоимости вывески
 */
export function calculatePrice({
  width,
  height,
  usage,
}: CalculateParams & WidthResult): PriceResult {
  const basePrice = 1000; // Базовая цена
  const adjustmentFactor = usage === "indoor" ? 1 : 1.2; // Коэффициент для улицы

  const price = basePrice + width * adjustmentFactor;

  return { price: Math.round(price) };
}
