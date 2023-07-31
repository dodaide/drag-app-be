import fs from 'fs';
import { CronJob } from "cron";

function get30DayAgo() {
  const currentDate = new Date();
  const date30DaysAgo = new Date(currentDate);
  date30DaysAgo.setDate(date30DaysAgo.getDate() - 30);
  const month = String(date30DaysAgo.getMonth() + 1).padStart(2, "0");
  const day = String(date30DaysAgo.getDate()).padStart(2, "0");
  return `${month}-${day}`;
}

export default function deleteLog() {
  const job = new CronJob(
    "0 0 * * *",
    () => {
      const logFileName = `error_${get30DayAgo()}.log`;
      fs.unlink(`../../log/${logFileName}`, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        } else {
          console.log("File deleted successfully");
        }
      });
    },
    null,
    true,
    "UTC"
  );
  job.start();
}
