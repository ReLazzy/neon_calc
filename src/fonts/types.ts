export interface GlyphData {
  path: string;
  width: number;
  scale?: number;
  offsetY?: number;
  offsetX?: number;
}

export type FontMap = Record<string, GlyphData>;

export interface FontType {
  font: FontMap;
  lineHeight: number;
  letterSpacing: number;
  scale: number;
}
