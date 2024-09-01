"use client";

import { Button } from "~/components/ui/button";
import { queueExample } from "~/server/actions/queues-actions";

const DashboardPage = () => {
  return (
    <div className="mt-6 flex grid-cols-1 flex-col gap-5">
      <Button
        onClick={async () => {
          await queueExample();
        }}
        className="w-fit"
      >
        Queue Job
      </Button>
    </div>
  );
};

export default DashboardPage;
