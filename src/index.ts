import dotenv from "dotenv";
import { IAIService } from "./services/AIService";
import { IFileService } from "./services/fileService";
import aiService from "./services/AIService";
import fileService from "./services/fileService";
import logger from "./common/logger";

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
    logger.info("Starting the process...");

    const txtFileContent = await this.fileService.readTxtFile();
    const htmlContent = await this.AIService.sendTxtFileContentToAI(
      txtFileContent
    );
    await this.fileService.saveResultToFile(htmlContent);

    logger.info("Success! Article with HTML code has been saved.");
  }
}

const main = new Main(aiService, fileService);
main.execute();
