"use server";

import * as cheerio from "cheerio";

/**
 * Scrapes the 'adatlap' page of the Quest for Azrael forum for links.
 *
 * This function uses Cheerio to load and parse the HTML content of the
 * 'adatlap' page on the Quest for Azrael Hungarian forum. It extracts
 * and returns all href attributes from elements with the class
 * 'forumtitle', representing the links on the page.
 *
 * @returns {Promise<string[]>} A promise that resolves to an array of
 * strings, where each string is a URL extracted from the page.
 */
export default async function ScrapeAdatlapList(): Promise<
  { title: string; href: string; chars: { title: string; href: string }[] }[]
> {
  const $ = await cheerio.fromURL(
    "https://questforazrael.hungarianforum.net/f6-adatlap"
  );
  const data = $.html();
  const $2 = cheerio.load(data, null, false);

  const links2 = await Promise.all(
    (
      await $2(".forumtitle")
        .map((index, element) => {
          const href = $(element).attr("href");
          const title = $(element).text().trim();
          if (href)
            return {
              title: title,
              href: href,
              chars: [] as { title: string; href: string }[],
            };
        })
        .get()
    ).map(async (link) => {
      const $3 = await cheerio.fromURL(
        `https://questforazrael.hungarianforum.net${link.href}`
      );
      const $4 = cheerio.load($3.html(), null, false);
      $4(".topictitle").each((index, element) => {
        const href = $(element).attr("href");
        const title = $(element).text().trim();
        if (title && href) {
          link.chars.push({ title: title, href: href });
        }
      });

      return link;
    })
  );

  return links2;
}
