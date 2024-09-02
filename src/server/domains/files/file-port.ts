export interface FilePort {
  createBase64(filePath: string): Promise<string>;
}
