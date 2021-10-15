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

const url = "https://www.yomiuri.co.jp/news/";

export default function getYomiuri(req, res) {
  async function getData(url) {
    const browser = await puppeteer.launch({
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "load", timeout: 0 });
    const news = await page.evaluate(() => {
      const topNews = [];
      const listOfAllNews = Array.from(
        document.querySelectorAll("div.news-top-latest__list-item__inner h3 a")
      );
      const hrefOfAllNews = Array.from(
        document.querySelectorAll("div.news-top-latest__list-item__inner h3 a")
      );
      const timeOfAllNews = Array.from(
        document.querySelectorAll("div.c-list-date time")
      );
      for (var i = 1; i < 25; i++) {
        const title = listOfAllNews[i].textContent;
        const href = hrefOfAllNews[i].href;
        const time = timeOfAllNews[i].textContent;
        topNews.push({ title, href, time, company: "読売新聞" });
      }
      return topNews;
    });

    console.log(news);

    res.status(200).json(news);
    browser.close();
  }
  getData(url);
}
