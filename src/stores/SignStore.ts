import { makeAutoObservable } from "mobx";

import { calculateWidth, calculatePrice } from "../utils/priceCalculator";

class SignStore {
  text: string = "";
  neonColor: string = "";
  substrateColor: string = ""; // Теперь это будет rgba
  neonThickness: string = "6mm";
  width: number = 0;
  neonType: string = "regular";
  substrateCoating: string = "glossy";
  substrateType: string = "border";
  usage: string = "indoor";
  fontSize: string = "small";
  font: string = "";
  height: number = 12;
  price: number = 0;
  textAlign: "left" | "center" | "right" = "left";

  constructor() {
    makeAutoObservable(this);
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
  getFontSize(): number {
    return this.fontSize === "small" ? 160 : 200;
  }
  setSubstrateCoating(value: string) {
    this.substrateCoating = value;
  }
  getFontWeight(): "normal" | "bold" {
    return this.neonThickness === "8mm" ? "bold" : "normal";
  }
  setNeonThickness(value: string) {
    this.neonThickness = value;
    this.calculate();
  }

  setNeonType(value: string) {
    this.neonType = value;
  }

  setSubstrateType(value: string) {
    this.substrateType = value;
  }

  setUsage(value: string) {
    this.usage = value;
    this.calculate();
  }

  setFontSize(value: string) {
    this.fontSize = value;
    this.calculate();
  }

  setFont(value: string) {
    this.font = value;
    this.calculate();
  }

  setHeight(value: number) {
    this.height = value;
    this.calculate();
  }

  calculate() {
    console.log("Recalculating...");
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
    this.price = price;
  }
}

export const signStore = new SignStore();
