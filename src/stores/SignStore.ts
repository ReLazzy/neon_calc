import { makeAutoObservable } from "mobx";

import $api from "../api/api";

export interface fontObject {
  name: string;
  fontFamily: string;
  file: string;
  text: string;
  id: Number;
}
export interface substrateColorObject {
  code: string;
  name: string;
  value: string;
}

export interface resultObject {
  discount_price: number;
  full_price: number;
  rush_price: number;
  weight: number;
}
export type textAlignType = "left" | "center" | "right";

class SignStore {
  text: string = "";
  neonColor: string = "#FFFFFF";
  substrateColor: substrateColorObject | null = null; // Теперь это будет rgba
  neonThickness: string = "6mm";
  width: number = 50;
  neonType: string = "regular";
  substrateCoating: string = "glossy";
  substrateType: string = "square";
  usage: string = "indoor";
  font: fontObject | null = null;
  height: number = 50;
  price: number = 0;
  textAlign: textAlignType = "left";
  fileName: string = "";
  priceDate: string = "";
  discountPrice: number = 0;
  fullPrice: number = 0;
  rushPrice: number = 0;
  nameAuthor: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  getNeonTypeParam(): Number {
    if (this.neonType === "rgb") {
      return 3;
    }
    if (this.neonType === "outdoor") {
      return 2;
    }
    return 1;
  }

  // Метод для преобразования HEX в RGBA
  hexToRGBA(hex: string, opacity: number): string {
    if (hex === "transparent") return "transparent";
    let r = 0,
      g = 0,
      b = 0;

    if (hex.startsWith("#")) {
      hex = hex.slice(1);
    }

    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
    }

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  setTextAlign(value: "left" | "center" | "right") {
    this.textAlign = value;
  }
  switchAlign = () => {
    const aligns = ["left", "center", "right"];
    const currentIndex = aligns.indexOf(this.textAlign);
    const nextIndex = (currentIndex + 1) % aligns.length;
    this.textAlign = aligns[nextIndex] as "left" | "center" | "right";
  };

  setText(value: string) {
    this.text = value;
    this.calculate();
  }

  setNeonColor(value: string) {
    this.neonColor = value;
  }
  setNameAuthor(value: string) {
    this.nameAuthor = value;
  }

  setSubstrateColor(value: substrateColorObject) {
    this.substrateColor = value;
  }
  getFontSize() {
    return this.height * 4;
  }

  setSubstrateCoating(value: string) {
    this.substrateCoating = value;
  }

  getFontWeight(): number {
    return this.neonThickness === "8mm" ? 3 : 2;
  }
  setNeonThickness(value: string) {
    this.neonThickness = value;
  }

  setNeonType(value: string) {
    this.neonType = value;
    this.calculate();
  }

  setSubstrateType(value: string) {
    this.substrateType = value;
  }

  setUsage(value: string) {
    this.usage = value;
    this.calculate();
  }

  setFont(value: fontObject) {
    this.font = value;
    this.calculate();
  }

  setHeight(value: number) {
    this.height = value;
    this.calculate();
  }

  setPriceDate(value: string) {
    this.priceDate = value;
  }

  updateToCurrentSunday() {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diff = (7 - dayOfWeek) % 7;
    const sunday = new Date(now);
    sunday.setDate(now.getDate() + diff);

    // Форматирование в формате "дд.мм.гг"
    const formattedDate = sunday.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });

    this.setPriceDate(formattedDate);
  }

  setFileName() {
    let dateVariable: Date = new Date();
    const formattedDate = dateVariable
      .toLocaleDateString("ru-RU")
      .replace(/\./g, "");
    this.fileName =
      this.nameAuthor +
      " " +
      this.text +
      " " +
      this.width +
      " " +
      this.height +
      " " +
      formattedDate +
      ".png";
  }

  fetchData = async (): Promise<resultObject | undefined> => {
    try {
      const response = await $api.post<resultObject>("", {
        font_id: this.font?.id || 0,
        text: this.text || "Ваш Текст",
        height: this.height * 10,
        neon_type: this.getNeonTypeParam(),
      });
      return response.data;
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  async calculate() {
    const data = await this.fetchData();
    if (!data) {
      return;
    }
    this.width = Math.trunc(data?.weight) || 50;
    this.discountPrice = Math.trunc(data?.discount_price) || 50;
    this.fullPrice = Math.trunc(data?.full_price) || 50;
    this.rushPrice = Math.trunc(data?.rush_price) || 50;
  }
}

export const signStore = new SignStore();
