import { openai } from "@ai-sdk/openai";
import { generateText, GenerateTextResult, CoreTool } from "ai";
import ServerError from "../serverError";
import { articlePrompt } from "../ai/prompts";

export interface IAIService {
  sendTxtFileContentToAI(fileContent: string): Promise<string>;
}

class AIService implements IAIService {
  async sendTxtFileContentToAI(fileContent: string): Promise<string> {
    try {
      const result: GenerateTextResult<Record<string, CoreTool<any, any>>> =
        await generateText({
          model: openai("gpt-4-turbo"),
          system: articlePrompt,
          prompt: fileContent,
        });
      return result.text;
    } catch (err) {
      console.error("AI Service Error:", err);
      throw new ServerError({
        name: "AI Error",
        message: "Error while generating text",
        code: 500,
        stack: err.stack,
      });
    }
  }
}

const aiService = new AIService();
export default aiService;
