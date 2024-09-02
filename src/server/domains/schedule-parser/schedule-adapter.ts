import { AIPort } from "../ai/ai-port";
import { ScheduleDTO } from "~/server/dto/schedule";
import { SchedulePort } from "./schedule-port";

export class AIScheduleAdapter implements SchedulePort {
  constructor(private readonly ai: AIPort) {
    this.ai = ai;
  }

  async generateSchedule(fileContent: string): Promise<ScheduleDTO[]> {
    const schedule = await this.ai.createSchedule(fileContent);
    return schedule ?? [];
  }
}
