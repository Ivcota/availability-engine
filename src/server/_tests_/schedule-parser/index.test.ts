import { OpenAIAIAdapter, client } from "~/server/domains/ai/ai-adapter";
import { describe, expect, it } from "vitest";

import { AIScheduleAdapter } from "~/server/domains/schedule-parser/schedule-adapter";
import { ScheduleService } from "~/server/domains/schedule-parser/schedule-service";
import { createReadStream } from "fs";
import { promises as fs } from "fs";
import path from "path";

describe("schedule-parser integration test", () => {
  it("should create a schedule dependency reference", async () => {
    const scheduleService = new ScheduleService(
      new AIScheduleAdapter(new OpenAIAIAdapter(client)),
    );

    const file1Path = path.join(__dirname, "./dummyfile.txt");
    const file1Content = await fs.readFile(file1Path, "utf-8");

    const scheduleDependencyReference =
      await scheduleService.createScheduleDependencyReference([file1Content]);

    expect(scheduleDependencyReference).toEqual([
      {
        date: "2024-01-23",
        people: ["John Doe", "Jane Doe"],
      },
      {
        date: "2024-01-24",
        people: ["John Doe", "Jane Doe"],
      },
    ]);
  });
});
