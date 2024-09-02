import OpenAI, { toFile } from "openai";
import { ScheduleDTO, ScheduleResponseSchema } from "~/server/dto/schedule";

import { AIPort } from "./ai-port";
import { Blob } from "fetch-blob";
import { zodResponseFormat } from "openai/helpers/zod.mjs";

export const client = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
  dangerouslyAllowBrowser: true,
});

export class OpenAIAIAdapter implements AIPort {
  private readonly client: OpenAI;

  constructor(client: OpenAI) {
    this.client = client;
  }

  async createSchedule(
    fileContent: string[],
  ): Promise<ScheduleDTO[] | null | undefined> {
    const file = await this.client.files.create({
      file: new File(fileContent, "schedule.txt", { type: "text/plain" }),
      purpose: "fine-tune",
    });

    await this.client.uploads.create({
      purpose: "fine-tune",
      filename: "schedule.txt",
      bytes: file.bytes,
      mime_type: "text/plain",
    });

    const completion = await this.client.beta.chat.completions.parse({
      model: "gpt-4o-2024-08-06",
      messages: [
        {
          role: "system",
          content:
            "I am a schedule parser, I will be given a file content, and I will parse it into a list of dates and names.",
        },
        {
          role: "user",
          content: `
          Please analyze the provided file content and extract the schedule information. 
          Format the output as follows:

          export const ScheduleDTOSchema = z.object({
            date: z.string(),
            people: z.array(z.string()),
          });

          // Ensure that the extracted data adheres to the structure defined above.
          `,
        },
      ],
      response_format: zodResponseFormat(ScheduleResponseSchema, "schedule"),
    });

    return completion.choices[0]?.message.parsed?.schedule ?? [];
  }
}
