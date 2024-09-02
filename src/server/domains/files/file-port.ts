export interface FilePort {
  createBase64(filePath: string): Promise<string>;
  readFileAsBase64(file: File): Promise<string>;
}
