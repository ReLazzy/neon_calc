import { makeAutoObservable } from "mobx";

class SignStore {
  text: string = "";
  neonColor: string = "";
  substrateColor: string = ""; // Теперь это будет rgba
  neonThickness: string = "6mm";
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
  }

  setNeonColor(value: string) {
    this.neonColor = value;
  }

  setSubstrateColor(value: string, opacity: number = 0.1) {
    this.substrateColor = this.hexToRGBA(value, opacity);
  }
  getFontSize(): number {
    return this.fontSize === "small" ? 110 : 140;
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
  }

  setSubstrateType(value: string) {
    this.substrateType = value;
  }

  setUsage(value: string) {
    this.usage = value;
  }

  setFontSize(value: string) {
    this.fontSize = value;
  }

  setFont(value: string) {
    this.font = value;
  }

  setHeight(value: number) {
    this.height = value;
  }

  calculatePrice() {
    this.price = 1000; // Пример расчёта
    console.log(this);
  }
}

export const signStore = new SignStore();
