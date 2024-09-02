import { ScheduleDTO } from "~/server/dto/schedule";
import { SchedulePort } from "./schedule-port";

export class ScheduleService {
  private readonly scheduleAdapter: SchedulePort;

  constructor(scheduleAdapter: SchedulePort) {
    this.scheduleAdapter = scheduleAdapter;
  }

  async createScheduleDependencyReference(
    schedules: string[],
  ): Promise<ScheduleDTO[]> {
    if (schedules.length > 3) {
      throw new Error("Only 3 schedules are allowed");
    }
    const response = await this.scheduleAdapter.generateSchedule(schedules);
    return response ?? [];
  }
}
