"use client";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { getScheduleDependencyReferences } from "~/server/domains/schedule-parser/schedule-action";
import { useFormState } from "react-dom";

const DashboardPage = () => {
  const [state, checkScheduleAction, isPending] = useFormState(
    getScheduleDependencyReferences,
    {},
  );

  return (
    <div className="mx-auto mt-10 flex max-w-lg flex-col gap-8 rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-xl">
      <h1 className="mb-6 text-center text-3xl font-extrabold text-gray-900">
        Schedule Checker
      </h1>
      <form action={checkScheduleAction} className="flex flex-col">
        <Label className="mb-3 text-lg font-semibold text-gray-700">
          Upload Weekday or Weekend Schedule
        </Label>
        <Input
          type="file"
          name="image1"
          accept=".png, .jpg, .jpeg"
          className="mb-5 rounded-md border border-gray-300 p-3 transition duration-200 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
        />
        <Button
          type="submit"
          disabled={isPending}
          className={`rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition duration-200 hover:bg-blue-700 ${isPending ? "cursor-not-allowed opacity-50" : ""}`}
        >
          {isPending ? "Checking..." : "Check Schedule"}
        </Button>
      </form>
      {state.error && (
        <p className="text-center font-semibold text-red-600">{state.error}</p>
      )}
      {state.scheduleDependencyReference && (
        <div className="mt-6 rounded-md border border-gray-300 bg-white p-4 shadow-md">
          <h2 className="text-lg font-semibold text-gray-800">
            Schedule Dependency Reference:
          </h2>
          <div className="mt-2 space-y-2">
            {state.scheduleDependencyReference.map((schedule) => (
              <div
                key={schedule.date}
                className="border-b border-gray-200 pb-2"
              >
                <p className="font-medium text-gray-700">{schedule.date}</p>
                <p className="text-gray-600">{schedule.people.join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
