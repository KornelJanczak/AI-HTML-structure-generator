import { readFile, writeFile } from "fs/promises";
import ServerError from "../serverError";
import path from "path";

export interface IFileService {
  readTxtFile(): Promise<string>;
  saveResultToFile(result: string): Promise<void>;
}

class FileService implements IFileService {
  async readTxtFile(): Promise<string> {
    const filePath = path.join(__dirname, process.env.ARTICLE_TXT_FILE_PATH!);

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

  async saveResultToFile(result: string): Promise<void> {
    const filePath = path.join(__dirname, process.env.ARTICLE_HTML_FILE_PATH!);

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

const fileService = new FileService();
export default fileService;
