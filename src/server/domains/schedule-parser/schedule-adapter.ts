import { ScheduleHelperPort, SchedulePort } from "./schedule-port";

import { AIPort } from "../ai/ai-port";
import { ScheduleDTO } from "~/server/dto/schedule";

export class AIScheduleAdapter implements SchedulePort {
  constructor(private readonly ai: AIPort) {}

  async generateSchedule(fileContent: string[]): Promise<ScheduleDTO[]> {
    const result = await this.ai.createSchedule(fileContent);
    return result ?? [];
  }
}

export class TestScheduleAdapter implements SchedulePort {
  async generateSchedule(fileContent: string[]): Promise<ScheduleDTO[]> {
    return [
      { date: "2024-01-25", people: ["Charlie Brown", "Diana Prince"] },
      { date: "2024-01-26", people: ["Eve Adams", "Frank Castle"] },
      { date: "2024-01-23", people: ["John Doe", "Jane Doe"] },
      { date: "2024-01-24", people: ["Alice Smith", "Bob Johnson"] },
    ];
  }
}

export class ScheduleHelperAdapter implements ScheduleHelperPort {
  sortSchedule(schedule: ScheduleDTO[]): ScheduleDTO[] {
    return schedule.sort((a, b) => a.date.localeCompare(b.date));
  }
}
