"use server";

import { exampleQueue } from "~/app/api/queues/example/queue";

export const queueExample = async () => {
  await exampleQueue.enqueue(
    {
      id: "example-job",
    },
    {
      delay: 100, // 100 milliseconds delay
    },
  );
};
