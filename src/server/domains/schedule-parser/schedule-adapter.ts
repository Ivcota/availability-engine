import { AIPort } from "../ai/ai-port";
import { ScheduleDTO } from "~/server/dto/schedule";
import { SchedulePort } from "./schedule-port";

export class AIScheduleAdapter implements SchedulePort {
  constructor(private readonly ai: AIPort) {}

  async generateSchedule(fileContent: string[]): Promise<ScheduleDTO[]> {
    const result = await this.ai.createSchedule(fileContent);
    return result ?? [];
  }
}

export class TestScheduleAdapter implements SchedulePort {
  async generateSchedule(fileContent: string[]): Promise<ScheduleDTO[]> {
    return [{ date: "2024-01-23", people: ["John Doe", "Jane Doe"] }];
  }
}
