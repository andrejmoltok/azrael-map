import * as cheerio from "cheerio";
async function test() {
  const $ = await cheerio.fromURL(
    "https://questforazrael.hungarianforum.net/f6-adatlap"
  );
  const data = $.html();
  const $2 = cheerio.load(data, null, false);
  let links = [{ title: "", href: "", chars: [] }];
  $2(".forumtitle").each((index, element) => {
    const href = $(element).attr("href");
    const title = $(element).text().trim();
    if (href) links.push({ title: title, href: href, chars: [] });
  });

  // console.log(links);

  const links2 = await Promise.all(
    links.map(async (link) => {
      const $3 = await cheerio.fromURL(
        `https://questforazrael.hungarianforum.net${link.href}`
      );
      const $4 = cheerio.load($3.html(), null, false);
      // const subLinks = [];
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
  console.log(links2);
  // console.log(JSON.stringify(links2, null, 2));

  // const links3 = await Promise.all(
  //   links2.flat().map(async (link) => {
  //     const $5 = await cheerio.fromURL(
  //       `https://questforazrael.hungarianforum.net${link.href}`
  //     );
  //     const $6 = cheerio.load($5.html(), null, false);
  //     const characterData = [];

  //     // Iterate over all text nodes
  //     $6(".user-info").each((index, element) => {
  //       const href = $(element).attr("href");
  //       if (href) characterData.push({ href: href });
  //     });

  //     return characterData;
  //   })
  // );

  // console.log(links3);
}

console.log(test());
