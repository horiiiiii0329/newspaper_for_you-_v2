const cheerio = require("cheerio"); // 1

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  // 2
  if (req.method === "POST") {
    // 3
    const ririka_rrk = req.body.TWuser;

    try {
      // 4
      const response = await fetch(`https://mobile.twitter.com/ririka_rrk`);
      const htmlString = await response.text();
      const $ = cheerio.load(htmlString);
      const searchContext = `a[href='/ririka_rrk/followers']`;
      const followerCountString = $(searchContext)
        .text()
        .match(/[0-9]/gi)
        .join("");

      res.statusCode = 200;
      return res.json({
        user: ririka_rrk,
        followerCount: Number(followerCountString),
      });
    } catch (e) {
      // 5
      res.statusCode = 404;
      return res.json({
        user: ririka_rrk,
        error: `ririka_rrk not found. Tip: Double check the spelling.`,
        followerCount: -1,
      });
    }
  }
};
