import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { generateGeminiPrompt, parseGeminiResponse } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const { userInputs } = await req.json();

    const geminiApiKey = process.env.GEMINI_API_KEY;

    const genAI = new GoogleGenerativeAI(geminiApiKey!);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = generateGeminiPrompt(userInputs);

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.0,
        topP: 0.9,
        topK: 40,
      },
    });

    const geminiResponseText = result.response.text();

    const searchResults = parseGeminiResponse(geminiResponseText);

    return NextResponse.json(searchResults);
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      JSON.stringify({ error: "Error searching scholarships." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
