"use server";

import { OpenAIAIAdapter, client } from "../ai/ai-adapter";

import { AIScheduleAdapter } from "./schedule-adapter";
import { FileService } from "../files/file-adapter";
import { ScheduleDTO } from "~/server/dto/schedule";
import { ScheduleService } from "./schedule-service";

interface ScheduleActionState {
  error?: string;
  scheduleDependencyReference?: ScheduleDTO[];
}

export const getScheduleDependencyReferences = async (
  _: ScheduleActionState,
  formData: FormData,
): Promise<ScheduleActionState> => {
  const fileService = new FileService();
  const scheduleService = new ScheduleService(
    new AIScheduleAdapter(new OpenAIAIAdapter(client)),
  );

  const images = formData.getAll("images") as File[];

  const base64Images: string[] = [];

  for (const image of images) {
    try {
      const imageBase64 = await fileService.readFileAsBase64(image);
      base64Images.push(imageBase64);
    } catch (error) {
      return {
        error: (error as Error).message || "An error occurred",
      };
    }
  }

  try {
    const scheduleDependencyReference =
      await scheduleService.createScheduleDependencyReference(base64Images);

    return {
      error: "",
      scheduleDependencyReference,
    };
  } catch (error) {
    return {
      error: (error as Error).message || "An error occurred",
    };
  }
};
