import { openai } from "@ai-sdk/openai";
import { generateText, GenerateTextResult, CoreTool } from "ai";
import ServerError from "../common/errors/serverError";
import { articlePrompt } from "../common/ai/prompts";
import logger from "../common/logger";

export interface IAIService {
  sendTxtFileContentToAI(fileContent: string): Promise<string>;
}

class AIService implements IAIService {
  async sendTxtFileContentToAI(fileContent: string): Promise<string> {
    try {
      logger.info("Sending file content to AI service...");
      const result: GenerateTextResult<Record<string, CoreTool<any, any>>> =
        await generateText({
          model: openai("gpt-4-turbo"),
          system: articlePrompt,
          prompt: fileContent,
        });

      logger.info("AI service response received.");
      return result.text;
    } catch (err) {
      logger.error("AI Service Error:", err);
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
