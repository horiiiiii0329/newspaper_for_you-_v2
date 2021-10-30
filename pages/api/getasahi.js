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
  async function getData(url) {
    const browser = await puppeteer.launch({
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: false,
    });
    const page = await browser.newPage();
    await page.goto(
      "https://www.asahi.com/news/history.html?iref=comtop_history",
      {
        waitUntil: "load",
        timeout: 0,
      }
    );

    const news = await page.evaluate(() => {
      const topNews = [];
      const listOfAllNews = Array.from(
        document.querySelectorAll(
          "#MainInner > div.Section.SectionFst > ul > li > a"
        )
      );
      const hrefOfAllNews = Array.from(
        document.querySelectorAll(
          "#MainInner > div.Section.SectionFst > ul > li > a"
        )
      );
      const timeOfAllNews = Array.from(
        document.querySelectorAll(
          "#MainInner > div.Section.SectionFst > ul > li > a > span.Time"
        )
      );
      for (var i = 1; i < listOfAllNews.length; i++) {
        const title = listOfAllNews[i].textContent.slice(
          0,
          textContent.length - 7
        );
        const href = hrefOfAllNews[i].href;
        const time = timeOfAllNews[i].outerText.slice(1, 5);

        topNews.push({ title, href, time, company: "朝日新聞" });
      }
      return topNews;
    });

    console.log(news);

    res.status(200).json(news);
    browser.close();
  }
  getData();
}
