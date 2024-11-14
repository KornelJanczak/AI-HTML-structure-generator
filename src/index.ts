import dotenv from "dotenv";
import { IAIService } from "./services/AIService";
import { IFileService } from "./services/fileService";
import aiService from "./services/AIService";
import fileService from "./services/fileService";

dotenv.config();

interface IMain {
  execute(): Promise<void>;
}

class Main implements IMain {
  AIService: IAIService;
  fileService: IFileService;

  constructor(AIService: IAIService, fileService: IFileService) {
    this.AIService = AIService;
    this.fileService = fileService;
  }

  async execute(): Promise<void> {
    console.log("Executing...");

    const txtFileContent = await this.fileService.readTxtFile();
    const htmlContent = await this.AIService.sendTxtFileContentToAI(
      txtFileContent
    );
    await this.fileService.saveResultToFile(htmlContent);

    console.log("Result: ", htmlContent);
  }
}

const main = new Main(aiService, fileService);
main.execute();
