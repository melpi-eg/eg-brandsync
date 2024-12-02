"use server";
import { NextResponse } from "next/server";
import { getSVG, loadFont } from "string-to-svg";

export async function GET(req) {
  try {
    const font = loadFont("fonts/GeistVF.woff");
    const attributes = { fill: "red", stroke: "black" };
    const options = {
      font,
      x: 0,
      y: 0,
      fontSize: 72,
      anchor: "top",
      attributes,
    };

    const svg = getSVG("hello", options);

    console.log(svg);
    return NextResponse.json({ msg: "hello" });
  } catch (error) {
    console.log(error);
    
    return NextResponse.json({ msg: error });
  }
}
