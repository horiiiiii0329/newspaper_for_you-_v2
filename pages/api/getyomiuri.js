const puppeteer = require("puppeteer");

const url = "https://www.yomiuri.co.jp/news/";

export default function getYomiuri(req, res) {
  async function getData(url) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);
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
        topNews.push({ title, href, time });
      }
      return topNews;
    });

    console.log(news);

    res.send(news);
    browser.close();
  }
  getData(url);
}
