import { ScheduleDTO, ScheduleDTOsSchema } from "~/server/dto/schedule";

import { AIPort } from "./ai-port";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod.mjs";

export const client = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

export class OpenAIAIAdapter implements AIPort {
  constructor(private readonly client: OpenAI) {
    this.client = client;
  }

  async createSchedule(
    text: string,
  ): Promise<ScheduleDTO[] | null | undefined> {
    const completion = await this.client.beta.chat.completions.parse({
      model: "gpt-4o-2024-08-06",
      messages: [
        {
          role: "system",
          content:
            "I am a schedule parser, I will be given a file, and I will parse it into a list dates and names.",
        },
        {
          role: "user",
          content: `
          Here's the file:
          ${text}
          `,
        },
      ],
      response_format: zodResponseFormat(ScheduleDTOsSchema, "schedule"),
    });
    return completion.choices[0]?.message.parsed ?? [];
  }
}
