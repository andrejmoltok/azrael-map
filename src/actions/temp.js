"use server";

import MongoSave from "@/lib/mongo/mongosave";
import ScrapeAdatlapList from "@/lib/cheerio/scrapeAdatlapList";

export default async function Temp() {
  const href = await ScrapeAdatlapList();
  await MongoSave("azrael", "adatlap", href);
}
