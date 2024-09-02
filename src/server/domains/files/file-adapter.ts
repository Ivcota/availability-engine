import { FilePort } from "./file-port";
import fs from "fs";

export class FileService implements FilePort {
  async createBase64(filePath: string): Promise<string> {
    const file = await fs.promises.readFile(filePath, { encoding: "base64" });
    return file;
  }
  async readFileAsBase64(file: File): Promise<string> {
    const buffer = await file.arrayBuffer();
    const base64String = Buffer.from(buffer).toString("base64");
    return base64String;
  }
}
