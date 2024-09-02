import { ScheduleDTO } from "~/server/dto/schedule";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface AIPort {
  createSchedule(
    fileContent: string[],
  ): Promise<ScheduleDTO[] | null | undefined>;
}
