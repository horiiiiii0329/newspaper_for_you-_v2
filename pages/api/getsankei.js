const puppeteer = require("puppeteer");

const url = "https://news.yahoo.co.jp/media/san";

export default function getYomiuri(req, res) {
  async function getData(url) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);
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
        topNews.push({ title, href, time, company: "産経新聞" });
      }
      return topNews;
    });

    console.log(news);

    res.send(news);
    browser.close();
  }
  getData(url);
}
