import { Queue } from "quirrel/next-app";

export const exampleQueue = Queue(
  "api/queues/example",
  async (job: { id: string }) => {
    console.log("exampleQueue job", job.id);
  },
);
