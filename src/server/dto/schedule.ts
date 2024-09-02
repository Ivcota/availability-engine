import { z } from "zod";

export const ScheduleDTOSchema = z.object({
  date: z.string(),
  people: z.array(z.string()),
});

export const ScheduleResponseSchema = z.object({
  schedule: z.array(ScheduleDTOSchema),
  what_i_saw: z.string(),
});

export interface ScheduleDTO {
  date: string;
  people: string[];
}

export interface ScheduleFileDTO {
  file: File | Blob;
}
