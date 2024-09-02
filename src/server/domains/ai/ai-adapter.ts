import { ScheduleDTO, ScheduleResponseSchema } from "~/server/dto/schedule";

import { AIPort } from "./ai-port";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod.mjs";

export const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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
    const content = [];

    for (const file of fileContent) {
      content.push({
        type: "image_url",
        image_url: {
          url: `data:image/jpeg;base64,${file}`,
        },
      });
    }

    const completion = await this.client.beta.chat.completions.parse({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "I am a schedule parser, I will be given image file content, and I will parse it into a list of dates and names. For example, the output could look like this: { date: '2024-01-23', people: ['John Doe', 'Jane Doe'] }, { date: '2024-01-24', people: ['John Doe', 'Jane Doe'] }.",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Please analyze the provided image file content and extract the schedule information.",
            },
            ...(content as {
              type: "image_url";
              image_url: {
                url: string;
              };
            }[]),
          ],
        },
      ],
      response_format: zodResponseFormat(ScheduleResponseSchema, "schedule"),
    });

    return completion.choices[0]?.message.parsed?.schedule ?? [];
  }
}
