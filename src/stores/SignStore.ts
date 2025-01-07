import { makeAutoObservable } from "mobx";

import { calculateWidth, calculatePrice } from "../utils/priceCalculator";
import $api from "../api/api";

export interface fontObject {
  name: string;
  fontFamily: string;
  file: string;
  text: string;
  id: Number;
}

export interface resultObject {
  discount_price: Number;
  full_price: Number;
  rush_price: Number;
  weight: number;
}

class SignStore {
  text: string = "";
  neonColor: string = "";
  substrateColor: string = ""; // Теперь это будет rgba
  neonThickness: string = "6mm";
  width: number = 50;
  neonType: string = "regular";
  substrateCoating: string = "glossy";
  substrateType: string = "border";
  usage: string = "indoor";
  font: fontObject | null = null;
  height: number = 50;
  price: number = 0;
  textAlign: "left" | "center" | "right" = "left";
  fileName: string = "";

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

  setSubstrateColor(value: string) {
    this.substrateColor = value;
  }
  getFontSize() {
    return this.height * 4;
  }
  setSubstrateCoating(value: string) {
    this.substrateCoating = value;
  }
  getFontWeight(): "normal" | "bold" {
    return this.neonThickness === "8mm" ? "bold" : "normal";
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

  setFileName() {
    let dateVariable: Date = new Date();
    const formattedDate = dateVariable
      .toLocaleDateString("ru-RU")
      .replace(/\./g, "");
    this.fileName =
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
        font_id: this.font?.id,
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

    const data = await this.fetchData()
    this.width = data?.weight || 50;

    /*console.log("Recalculating...");
    console.log("Current state:", {
      text: this.text,
      height: this.height,
      font: this.font,
      neonThickness: this.neonThickness,
      usage: this.usage,
    });

    const { width } = calculateWidth({
      text: this.text,
      height: this.height,
      font: this.font,
      neonThickness: this.neonThickness,
      usage: this.usage,
    });

    console.log("Calculated width:", width);
    this.width = width;

    const { price } = calculatePrice({
      text: this.text,
      height: this.height,
      font: this.font,
      neonThickness: this.neonThickness,
      usage: this.usage,
      width: this.width,
    });

    console.log("Calculated price:", price);
    this.price = price;*/
  }
}

export const signStore = new SignStore();
