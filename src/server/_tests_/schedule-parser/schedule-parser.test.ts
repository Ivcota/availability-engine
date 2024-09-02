import { OpenAIAIAdapter, client } from "~/server/domains/ai/ai-adapter";
import { describe, expect, it } from "vitest";

import { AIScheduleAdapter } from "~/server/domains/schedule-parser/schedule-adapter";
import { FileService } from "~/server/domains/files/file-adapter";
import { ScheduleService } from "~/server/domains/schedule-parser/schedule-service";
import path from "path";

describe("schedule-parser integration", () => {
  it("should create a schedule dependency reference based on image", async () => {
    const fileService = new FileService();
    const aiAdapter = new OpenAIAIAdapter(client);
    const scheduleAdapter = new AIScheduleAdapter(aiAdapter);
    const scheduleService = new ScheduleService(scheduleAdapter);

    const file1Path = path.join(__dirname, "./example-schedule-image.png");

    const image = await fileService.createBase64(file1Path);

    const scheduleDependencyReference =
      await scheduleService.createScheduleDependencyReference([image]);

    expect(scheduleDependencyReference).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          date: "2024-09-01",
          people: expect.arrayContaining([
            "Ray Patton",
            "Robert Byrne",
            "Colvin Diles",
            "Rick Green",
            "Jacob Diaz",
          ]),
        }),
        expect.objectContaining({
          date: "2024-09-08",
          people: expect.arrayContaining([
            "Jared Bryant",
            "Glen Middlecoat",
            "Terry Levingston",
            "Mark Diles",
          ]),
        }),
        expect.objectContaining({
          date: "2024-09-15",
          people: expect.arrayContaining([
            "Jay James",
            "Theodore Forman",
            "Ron Plasse",
            "Iverson Diles",
          ]),
        }),
        expect.objectContaining({
          date: "2024-09-22",
          people: expect.arrayContaining([
            "Greg Sallis",
            "Jeffrey Rivera",
            "Anthony Johnson",
            "Chris Carranza",
          ]),
        }),
      ]),
    );
  });
});
