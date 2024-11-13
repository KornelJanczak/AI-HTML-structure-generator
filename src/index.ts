import dotenv from "dotenv";
// import openai from "./ai";
import { openai } from "@ai-sdk/openai";
import {
  CoreMessage,
  generateText,
  streamText,
  tool,
  GenerateTextResult,
  CoreTool,
} from "ai";
import { readFile, writeFile } from "fs/promises";
import ServerError from "./serverError";
import path from "path";
import { articlePrompt } from "./ai/prompts";

dotenv.config();

interface MainAbstract {
  execute(): Promise<void>;
}

class Main implements MainAbstract {
  async execute(): Promise<void> {
    const txtFileContent = await this.readTxtFile();
    const generatedResult = await this.sendTxtFileContentToAI(txtFileContent);
    console.log("Result", generatedResult);
    await this.saveResultToFile(generatedResult);
  }

  private async readTxtFile(): Promise<string> {
    const filePath = path.join(__dirname, "../artykul-content.txt");

    let fileText: string;

    try {
      fileText = await readFile(filePath, {
        encoding: "utf-8",
      });
    } catch (err) {
      console.error(err);
      throw new ServerError({
        name: "File System Error",
        message: "Error while reading file",
        code: 500,
        stack: err.stack,
      });
    }

    return fileText;
  }

  private async sendTxtFileContentToAI(fileContent: string): Promise<string> {
    let result: GenerateTextResult<Record<string, CoreTool<any, any>>>;

    try {
      result = await generateText({
        model: openai("gpt-4-turbo"),
        system: articlePrompt,
        prompt: fileContent,
      });
    } catch (err) {
      console.error(err);
      throw new ServerError({
        name: "AI Error",
        message: "Error while generating text",
        code: 500,
        stack: err.stack,
      });
    }

    return result.text;
  }

  private async saveResultToFile(result: string): Promise<void> {
    const filePath = path.join(__dirname, "../artykul.html");

    try {
      await writeFile(filePath, result, {
        encoding: "utf-8",
      });
      console.log("Result saved to file:", filePath);
    } catch (err) {
      console.error(err);
      throw new ServerError({
        name: "File System Error",
        message: "Error while writing to file",
        code: 500,
        stack: err.stack,
      });
    }
  }
}

const main = new Main();
main.execute();
