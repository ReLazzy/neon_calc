import paper from 'paper';
import { FontMap } from '../fonts/types';
import { PaperOffset } from 'paperjs-offset';

/**
 * Создаёт контур текста с помощью увеличения strokeWidth и объединения путей.
 * Возвращает d="..." общего контура.
 */
export function createContour(
    text: string,
    font: FontMap,
    letterSpacing = 2,
    strokeWidth = 10
): string {
    // 1. Инициализируем Paper.js, если нужно
    if (!paper.project) {
        const canvas = document.createElement('canvas'); // Виртуальный canvas
        paper.setup(canvas);
    }

    // 2. Создаём общий контур
    let unionShape = new paper.CompoundPath('');
    let currentX = 0;

    for (const char of text) {
        const glyph = font[char];
        if (!glyph) {
            currentX += letterSpacing; // Пропускаем неизвестные символы
            continue;
        }

        const { path, width } = glyph;
        if (!path) {
            currentX += width + letterSpacing; // Пробелы
            continue;
        }

        // Создаём Path для буквы
        const letterPath = new paper.Path(path);

        const strokePath = PaperOffset.offsetStroke(
            letterPath,
            0,

        );

        strokePath.strokeWidth = 1;
        strokePath.strokeColor = paper.Color.random();

        const svg = strokePath.exportSVG()
        if (typeof svg === "string") {
            continue
        }
        console.log(svg.getAttribute('d'));
    }

    // Если текст пустой, возвращаем пустую строку
    if (unionShape.isEmpty()) {
        return '';
    }

    // Возвращаем общий контур в формате d="..."
    const finalPathData = unionShape.pathData;
    unionShape.remove(); // Очищаем память

    return finalPathData;
}
