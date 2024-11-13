import "dotenv";
import { openai } from "@ai-sdk/openai";
import { CoreMessage, streamText, tool } from "ai";
import { readFile } from "fs/promises";
import ServerError from "./serverErrot";
import path from "path";

interface MainAbstract {
  execute(): Promise<void>;
}

class Main implements MainAbstract {
  async execute(): Promise<void> {
    this.readTxtFile();
  }

  private async readTxtFile(): Promise<void> {
    const filePath = path.join(__dirname, "../artykul-content.txt");

    try {
      const fileText = await readFile(filePath, {
        encoding: "utf-8",
      });

      console.log(fileText);
    } catch (err) {
      console.error(err);
      throw new ServerError({
        name: "File System Error",
        message: "Error while reading file",
        code: 500,
        stack: err.stack,
      });
    }
  }
}

const main = new Main();
main.execute();
