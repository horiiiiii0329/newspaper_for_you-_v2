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
    const browser = await puppeteer.launch({
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
    });
    let page = await browser.newPage();
    await page.goto("https://www.sankei.com/flash/", {
      waitUntil: "load",
      // Remove the timeout
      timeout: 0,
    });
    const news = await page.evaluate(() => {
      const topNews = [];
      const listOfAllNews = Array.from(
        document.querySelectorAll("h3.headline")
      );
      const hrefOfAllNews = Array.from(
        document.querySelectorAll("h3.headline a")
      );
      const timeOfAllNews = Array.from(
        document.querySelectorAll("div.under-headline time")
      );
      for (var i = 1; i < 17; i++) {
        const title = listOfAllNews[i].textContent;
        const href = hrefOfAllNews[i].href;
        const time = timeOfAllNews[i].textContent;
        topNews.push({ title, href, time, company: "産経新聞" });
      }
      return topNews;
    });

    console.log(news);

    res.status(200).json(news);
    browser.close();
  }
  getData();
}
