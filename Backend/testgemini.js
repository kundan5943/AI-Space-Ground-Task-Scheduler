import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testGemini() {
  try {
    const model = genAI.getGenerativeModel({
      model: "models/gemini-2.5-flash"
    });

    const result = await model.generateContent(
      "Reply with: Gemini connected successfully"
    );

    console.log("Gemini Response:");
    console.log(result.response.text());
  } catch (error) {
    console.error("Gemini Error:", error.message);
  }
}

testGemini();
