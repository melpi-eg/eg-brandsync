"use server";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    return NextResponse.json({ msg: "hello" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: error });
  }
}
