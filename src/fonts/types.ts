export interface GlyphData {
  path: string;
  width: number;
  scale?: number;
  offsetY?: number;
}

export type FontMap = Record<string, GlyphData>;
