let chrome = {};
let puppeteer = {};

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  //Vercel
  chrome = require("chrome-aws-lambda");
  puppeteer = require("puppeteer-core");
} else {
  //Local Test
  puppeteer = require("puppeteer");
}

export default function getYomiuri(req, res) {
  async function getData() {
    let browser = await puppeteer.launch({
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: false,
    });

    let page = await browser.newPage();
    await page.goto("https://mainichi.jp/ranking/", {
      waitUntil: "load",
      // Remove the timeout
      timeout: 0,
    });
    const news = await page.evaluate(() => {
      const topNews = [];
      const listOfAllNews = Array.from(
        document.querySelectorAll("h3.articlelist-title")
      );
      const hrefOfAllNews = Array.from(document.querySelectorAll("ul li a"));
      const timeOfAllNews = Array.from(
        document.querySelectorAll("span.articletag-date")
      );
      for (var i = 1; i < 20; i++) {
        const title = listOfAllNews[i].textContent;
        const href = hrefOfAllNews[i].href;
        const time = timeOfAllNews[i].textContent;
        topNews.push({ title, href, time, company: "日本経済新聞" });
      }
      return topNews;
    });

    await browser.close();

    res.status(200).json(news);
    browser.close();
  }
  getData();
}
