import React, { FC, useMemo, useEffect } from 'react';
import { Group, Path } from 'react-konva';
import { FontMap } from '../fonts/types';

interface KonvaLetterTextProps {
    font: FontMap;
    text: string;

    /** Желаемая общая высота текста (в px). Если не передали — не масштабируем. */
    height?: number;

    letterSpacing?: number;
    lineHeight?: number;
    textAlign?: 'left' | 'center' | 'right';

    stroke?: string;
    strokeWidth?: number;

    shadowBlur?: number;
    shadowColor?: string;
    shadowOpacity?: number;

    x?: number;
    y?: number;
    draggable?: boolean;
    offsetX?: number;
    offsetY?: number;

    /**
     * Коллбэк, в который вернём **итоговые** размеры блока (после масштабирования).
     * Например, (width, height) => { ... }
     */
    onMeasure?: (width: number, height: number) => void;
}

/**
 * Рисует "текст" посимвольно через Path, с учётом переносов строк.
 * Если передан проп `height`, то масштабируем текст, чтобы итоговая высота = height.
 * По завершении (или при каждом рендере) вызываем onMeasure(width, height) - итоговые размеры.
 */
export const KonvaLetterText: FC<KonvaLetterTextProps> = ({
    font,
    text,
    height,
    letterSpacing = 2,
    lineHeight = 30,
    textAlign = 'left',
    stroke = 'black',
    strokeWidth = 1,
    shadowBlur = 0,
    shadowColor = 'black',
    shadowOpacity = 1,
    x = 0,
    y = 0,
    draggable = false,
    offsetX = 0,
    offsetY = 0,
    onMeasure,
}) => {
    // 1. Разбиваем на строки (кешируем, чтобы не пересчитывать лишний раз)
    const lines = useMemo(() => text.split('\n'), [text]);

    // 2. Считаем «сырой» размер
    const { totalWidth, totalHeight, lineWidths } = useMemo(() => {
        let lineWidths: number[] = [];
        let maxWidth = 0;

        const splitted = text.split('\n');
        splitted.forEach((line) => {
            let lw = 0;
            for (const char of line) {
                const glyph = font[char];
                if (glyph) {
                    lw += glyph.width + letterSpacing;
                } else {
                    // неизвестный символ, хотя бы spacing
                    lw += letterSpacing;
                }
            }
            lw -= letterSpacing;
            if (lw < 0) lw = 0;
            lineWidths.push(lw);
            if (lw > maxWidth) maxWidth = lw;
        });

        const totalHeight = splitted.length * lineHeight;
        return {
            totalWidth: maxWidth, // ширина самой широкой строки
            totalHeight,
            lineWidths,
        };
    }, [text, font, letterSpacing, lineHeight]);

    // 3. Если указали желаемую высоту, вычисляем масштаб
    let scaleFactor = 1;
    if (height && totalHeight > 0) {
        scaleFactor = height / totalHeight;
    }

    // 4. Генерируем Path-элементы
    const paths: React.ReactNode[] = useMemo(() => {
        let currentY = 0;
        const items: React.ReactNode[] = [];

        lines.forEach((line, lineIndex) => {
            const lineWidthVal = lineWidths[lineIndex];

            // смещение X для выравнивания
            let offsetLineX = 0;
            if (textAlign === 'center') {
                offsetLineX = (totalWidth - lineWidthVal) / 2;
            } else if (textAlign === 'right') {
                offsetLineX = totalWidth - lineWidthVal;
            }

            let currentX = 0;
            for (let i = 0; i < line.length; i++) {
                const char = line[i];
                const glyph = font[char];
                if (!glyph) {
                    currentX += letterSpacing;
                    continue;
                }
                const { path, width } = glyph;
                const xPos = offsetLineX + currentX;
                const yPos = currentY;

                currentX += width + letterSpacing;

                if (!path) {
                    continue;
                }

                items.push(
                    <Path
                        key={`l${lineIndex}-c${i}`}
                        data={path}
                        x={xPos}
                        y={yPos}
                        stroke={stroke}
                        strokeWidth={strokeWidth}
                        lineCap="round"
                        lineJoin="round"
                        shadowBlur={shadowBlur / scaleFactor}
                        shadowColor={shadowColor}
                        shadowOpacity={shadowOpacity}
                        strokeScaleEnabled={false}

                    />
                );
            }

            currentY += lineHeight;
        });

        return items;
    }, [
        lines, lineWidths, textAlign, totalWidth, letterSpacing,
        stroke, strokeWidth,
        shadowBlur, shadowColor, shadowOpacity,
        lineHeight, font,
    ]);

    // 5. Финальная (итоговая) ширина/высота с учётом масштабирования
    const finalWidth = totalWidth * scaleFactor;
    const finalHeight = totalHeight * scaleFactor;

    // 6. Вызываем onMeasure (если задан), чтобы вернуть итоговый размер
    useEffect(() => {
        if (onMeasure) {
            onMeasure(finalWidth, finalHeight);
        }
    }, [finalWidth, finalHeight, onMeasure]);

    return (
        <Group x={x} y={y} offsetX={offsetX} offsetY={offsetY} draggable={draggable}>
            {/* Масштабируем всё содержимое */}
            <Group scaleX={scaleFactor} scaleY={scaleFactor}>
                {paths}
            </Group>
        </Group>
    );
};
