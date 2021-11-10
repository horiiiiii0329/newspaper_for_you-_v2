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
  let result = null;
  let browser = null;
  async function getData() {
    try {
      browser = await puppeteer.launch({
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
      });

      let page = await browser.newPage();
      await page.goto("https://www.nikkei.com/access/index/?bd=hKijiSougou", {
        waitUntil: "load",
        // Remove the timeout
        timeout: 0,
      });
      const news = await page.evaluate(() => {
        const topNews = [];
        const listOfAllNews = Array.from(
          document.querySelectorAll(
            "#JSID_baseCheckMaxRkichiran div ul li span span a"
          )
        );
        const hrefOfAllNews = Array.from(
          document.querySelectorAll(
            "#JSID_baseCheckMaxRkichiran div ul li span span a"
          )
        );
        const timeOfAllNews = Array.from(
          document.querySelectorAll("span.m-miM32_itemkeyword span")
        );
        for (var i = 1; i < 25; i++) {
          const title = listOfAllNews[i].textContent;
          const href = hrefOfAllNews[i].href;
          const time = timeOfAllNews[i].textContent;
          topNews.push({ title, href, time, company: "日本経済新聞" });
        }
        return topNews;
      });

      res.status(200).json(news);
      await browser.close();
    } catch (error) {
      return callback(error);
    } finally {
      if (browser !== null) {
        await browser.close();
      }
    }
  }
  getData();
}
