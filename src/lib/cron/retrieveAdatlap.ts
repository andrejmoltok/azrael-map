import { CronJob } from "cron";
import ScrapeAdatlapList from "@/lib/cheerio/scrapeAdatlapList";
import MongoSave from "@/lib/mongo/mongosave";

export const retrieveAdatlapList = new CronJob(
  "0 0 0 * * 0", // runs every week once on Sunday midnight
  async function func() {
    //TODO: Add Pino logger
    console.log("RetreiveAdatlap Cron Started");
    const href = await ScrapeAdatlapList();
    await MongoSave("azrael", "adatlap", href);
    console.log("RetreiveAdatlap Cron Finished");
  }
);
