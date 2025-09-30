import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash", // ✅ or gemini-2.5-pro
});

const generationConfig = {
  temperature: 0.8,
  top_p: 0.95,
  top_k: 64,
  max_output_tokens: 8192,
  response_mime_type: "application/json",
};

// ✅ FIX: systemInstruction must be a Content object, not a string
const systemInstruction = {
  role: "system",
  parts: [
    {
      text: "You are an AI assistant powered by Gemini 2.5. Provide clear, concise, and helpful responses in JSON format when possible.",
    },
  ],
};

export const AIChatSession = model.startChat({
  generationConfig,
  systemInstruction, // ✅ this is now valid
  history: [],
});

// A second chat session configured for plain text / HTML output
const textGenerationConfig = {
  ...generationConfig,
  response_mime_type: "text/plain",
};

const textSystemInstruction = {
  role: "system",
  parts: [
    {
      text: "You are an AI assistant. Return clean HTML lists or plain text suitable for resume bullet points. Do not include JSON or arrays.",
    },
  ],
};

export const AITextChatSession = model.startChat({
  generationConfig: textGenerationConfig,
  systemInstruction: textSystemInstruction,
  history: [],
});
