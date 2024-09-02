import { ScheduleDTO } from "~/server/dto/schedule";

export interface SchedulePort {
  generateSchedule(fileContent: string[]): Promise<ScheduleDTO[]>;
}

export interface ScheduleHelperPort {
  sortSchedule(schedule: ScheduleDTO[]): ScheduleDTO[];
}
