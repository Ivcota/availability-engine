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

  const image1 = formData.get("image1") as File;
  const image2 = formData.get("image2") as File;
  const base64Images = [];

  try {
    const image1Base64 = await fileService.readFileAsBase64(image1);
    base64Images.push(image1Base64);
  } catch (error) {
    return {
      error: (error as any).message ?? "An error occurred",
    };
  }

  try {
    const image2Base64 = await fileService.readFileAsBase64(image2);
    base64Images.push(image2Base64);
  } catch (error) {
    console.error(error);
  }

  try {
    const scheduleDependencyReference =
      await scheduleService.createScheduleDependencyReference([
        ...base64Images,
      ]);

    return {
      error: "",
      scheduleDependencyReference,
    };
  } catch (error) {
    return {
      error: (error as any).message ?? "An error occurred",
    };
  }
};
