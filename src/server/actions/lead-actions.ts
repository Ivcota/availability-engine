"use server";

import { Lead } from "../models/lead-model";

export const _createLead = async (data: { email: string; userId?: string }) => {
  const lead = await Lead.create(data);
  return lead;
};
