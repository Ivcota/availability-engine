import { ScheduleHelperPort, SchedulePort } from "./schedule-port";

import { ScheduleDTO } from "~/server/dto/schedule";

export class ScheduleService {
  private readonly scheduleAdapter: SchedulePort;
  private readonly scheduleHelper: ScheduleHelperPort;

  constructor(
    scheduleAdapter: SchedulePort,
    scheduleHelper: ScheduleHelperPort,
  ) {
    this.scheduleAdapter = scheduleAdapter;
    this.scheduleHelper = scheduleHelper;
  }

  async createScheduleDependencyReference(
    schedules: string[],
  ): Promise<ScheduleDTO[]> {
    if (schedules.length > 3) {
      throw new Error("Only 3 schedules are allowed");
    }
    const response = await this.scheduleAdapter.generateSchedule(schedules);
    const sortedSchedule = this.scheduleHelper.sortSchedule(response);
    return sortedSchedule ?? [];
  }
}
