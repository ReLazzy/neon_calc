import React, { FC } from 'react';
import { FontMap } from '../fonts/types';

interface SvgTextProps {
    font: FontMap;
    text: string;
    height: number;
    letterSpacing?: number;
    lineHeight?: number;
    textAlign?: 'left' | 'center' | 'right';
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
}

export const SvgText: FC<SvgTextProps> = ({
    font,
    text,
    height,
    letterSpacing = 2,
    lineHeight = 30,
    textAlign = 'left',
    fill = 'none',
    stroke = 'black',
    strokeWidth = 1,
}) => {
    const lines = text.split('\n');

    const lineWidths = lines.map((line) => {
        let lw = 0;
        for (const char of line) {
            const glyph = font[char];
            if (glyph) {
                lw += glyph.width + letterSpacing;
            } else {

                lw += letterSpacing;
            }
        }
        lw -= letterSpacing;
        return Math.max(lw, 0);
    });

    const maxLineWidth = Math.max(...lineWidths, 0);

    const totalHeight = lines.length * lineHeight;

    const margin = 5;

    const viewBoxWidth = maxLineWidth > 0 ? maxLineWidth + margin * 2 : margin * 2;
    const viewBoxHeight = totalHeight > 0 ? totalHeight + margin * 2 : margin * 2;


    let svgWidth = 0;
    if (viewBoxHeight > 0) {
        svgWidth = (viewBoxWidth / viewBoxHeight) * height;
    }

    const blockOffsetY = margin + (viewBoxHeight - margin * 2 - totalHeight) / 2;

    return (
        <svg
            width={svgWidth}
            height={height}
            viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
            xmlns="http://www.w3.org/2000/svg"
        >
            {lines.map((line, lineIndex) => {
                const lineWidthVal = lineWidths[lineIndex];

                let lineOffsetX = margin; // left
                if (textAlign === 'center') {
                    lineOffsetX = margin + (maxLineWidth - lineWidthVal) / 2;
                } else if (textAlign === 'right') {
                    lineOffsetX = margin + (maxLineWidth - lineWidthVal);
                }

                const lineOffsetY = blockOffsetY + lineIndex * lineHeight;

                let currentX = 0;

                return (
                    <g key={lineIndex} transform={`translate(${lineOffsetX}, ${lineOffsetY})`}>
                        {line.split('').map((char, charIndex) => {
                            const glyph = font[char];
                            if (!glyph) {
                                currentX += letterSpacing;
                                return null;
                            }

                            const { path, width } = glyph;
                            const x = currentX;
                            currentX += width + letterSpacing;

                            if (!path) {
                                return null;
                            }

                            return (
                                <path
                                    key={charIndex}
                                    d={path}
                                    transform={`translate(${x}, 0)`}

                                    stroke={stroke}
                                    strokeWidth={strokeWidth}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            );
                        })}
                    </g>
                );
            })}
        </svg>
    );
};
