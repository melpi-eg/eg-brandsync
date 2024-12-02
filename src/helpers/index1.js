import TextToSVG from "text-to-svg";
import fs from "fs/promises";

export const textToSvgConvertor = (text) => {
  const textToSVG = TextToSVG.loadSync();
  const svg = textToSVG.getSVG("hello");
  console.log(svg);
};
