/* eslint-disable */

import {
  AIScheduleAdapter,
  ScheduleHelperAdapter,
  TestScheduleAdapter,
} from "~/server/domains/schedule-parser/schedule-adapter";
import { OpenAIAIAdapter, client } from "~/server/domains/ai/ai-adapter";
import { describe, expect, it } from "vitest";

import { FileService } from "~/server/domains/files/file-adapter";
import { ScheduleService } from "~/server/domains/schedule-parser/schedule-service";
import path from "path";

describe("Schedule Parser Service", () => {
  it("should create a schedule dependency reference based on image", async () => {
    const fileService = new FileService();
    const aiAdapter = new OpenAIAIAdapter(client);
    const scheduleAdapter = new AIScheduleAdapter(aiAdapter);
    const scheduleHelper = new ScheduleHelperAdapter();
    const scheduleService = new ScheduleService(
      scheduleAdapter,
      scheduleHelper,
    );

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

  it("should allow for multiple images", async () => {
    const fileService = new FileService();
    const aiAdapter = new OpenAIAIAdapter(client);
    const scheduleAdapter = new AIScheduleAdapter(aiAdapter);
    const scheduleHelper = new ScheduleHelperAdapter();
    const scheduleService = new ScheduleService(
      scheduleAdapter,
      scheduleHelper,
    );

    const file1Path = path.join(__dirname, "./example-split-1.png");
    const file2Path = path.join(__dirname, "./example-split-2.png");

    const image1 = await fileService.createBase64(file1Path);
    const image2 = await fileService.createBase64(file2Path);

    const scheduleDependencyReference =
      await scheduleService.createScheduleDependencyReference([image1, image2]);

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
          date: "2024-09-15",
          people: expect.arrayContaining([
            "Jay James",
            "Theodore Forman",
            "Ron Plasse",
            "Iverson Diles",
          ]),
        }),
      ]),
    );
  });

  it("should sort the schedule in order from earliest to latest", async () => {
    const scheduleAdapter = new TestScheduleAdapter();
    const scheduleHelper = new ScheduleHelperAdapter();
    const scheduleService = new ScheduleService(
      scheduleAdapter,
      scheduleHelper,
    );

    const scheduleDependencyReference =
      await scheduleService.createScheduleDependencyReference(["mockfiles"]);

    const sortedSchedule = scheduleHelper.sortSchedule(
      scheduleDependencyReference,
    );

    expect(sortedSchedule).toEqual([
      { date: "2024-01-23", people: ["John Doe", "Jane Doe"] },
      { date: "2024-01-24", people: ["Alice Smith", "Bob Johnson"] },
      { date: "2024-01-25", people: ["Charlie Brown", "Diana Prince"] },
      { date: "2024-01-26", people: ["Eve Adams", "Frank Castle"] },
    ]);
  });

  it("should throw an error if more than 3 images are provided", async () => {
    const fileService = new FileService();
    const aiAdapter = new OpenAIAIAdapter(client);
    const scheduleAdapter = new AIScheduleAdapter(aiAdapter);
    const scheduleHelper = new ScheduleHelperAdapter();
    const scheduleService = new ScheduleService(
      scheduleAdapter,
      scheduleHelper,
    );

    const file1Path = path.join(__dirname, "./example-schedule-image.png");
    const file2Path = path.join(__dirname, "./example-schedule-image.png");
    const file3Path = path.join(__dirname, "./example-schedule-image.png");
    const file4Path = path.join(__dirname, "./example-schedule-image.png");

    const images = [
      await fileService.createBase64(file1Path),
      await fileService.createBase64(file2Path),
      await fileService.createBase64(file3Path),
      await fileService.createBase64(file4Path),
    ];

    await expect(
      scheduleService.createScheduleDependencyReference(images),
    ).rejects.toThrow("Only 3 schedules are allowed");
  });
});
