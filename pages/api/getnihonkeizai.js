let chrome = {};
let puppeteer = {};

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  //Vercel
  chrome = require("chrome-aws-lambda");
  puppeteer = require("puppeteer-core");
} else {
  //Local Test
  puppeteer = require("puppeteer");

  const URL = `https://protoout.studio`;
}

const url = "https://news.yahoo.co.jp/media/nikkeisty";

export default function getYomiuri(req, res) {
  async function getData(url) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "load", timeout: 0 });
    const news = await page.evaluate(() => {
      const topNews = [];
      const listOfAllNews = Array.from(
        document.querySelectorAll("div.newsFeed_item_title")
      );
      const hrefOfAllNews = Array.from(
        document.querySelectorAll("a.newsFeed_item_link")
      );
      const timeOfAllNews = Array.from(
        document.querySelectorAll("time.newsFeed_item_date")
      );
      for (var i = 1; i < listOfAllNews.length; i++) {
        const title = listOfAllNews[i].textContent;
        const href = hrefOfAllNews[i].href;
        const time = timeOfAllNews[i].textContent;
        topNews.push({ title, href, time, company: "日本経済新聞" });
      }
      return topNews;
    });

    console.log(news);

    res.send(news);
    browser.close();
  }
  getData(url);
}
