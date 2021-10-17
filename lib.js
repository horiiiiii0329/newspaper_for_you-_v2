export default function getAsahi() {
  async function getData() {
    const browser = await puppeteer.launch({
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
    });
    const page = await browser.newPage();
    await page.goto("https://news.yahoo.co.jp/media/asahi", {
      waitUntil: "load",
      timeout: 0,
    });

    var $ = cheerio.load(content);
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

export function getMainchi() {
  async function getData() {
    const browser = await puppeteer.launch({
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
    });
    const page = await browser.newPage();
    await page.goto("https://news.yahoo.co.jp/media/mai", {
      waitUntil: "load",
      timeout: 0,
    });
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

        topNews.push({ title, href, time, company: "毎日新聞" });
      }
      return topNews;
    });

    console.log(news);

    browser.close();
  }
  getData();
}

export function getNikkei() {
  async function getData() {
    const browser = await puppeteer.launch({
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
    });
    const page = await browser.newPage();
    await page.goto("https://news.yahoo.co.jp/media/nikkeisty", {
      waitUntil: "load",
      timeout: 0,
    });
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

    browser.close();
  }
  getData();
}

const url = "https://news.yahoo.co.jp/media/san";

export function getSankei() {
  async function getData(url) {
    const browser = await puppeteer.launch({
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
    });
    const page = await browser.newPage();
    await page.goto("https://news.yahoo.co.jp/media/san", {
      waitUntil: "load",
      timeout: 0,
    });
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

    browser.close();
  }
  getData();
}

export function getYomiuri() {
  async function getData() {
    const browser = await puppeteer.launch({
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
    });
    const page = await browser.newPage();
    await page.goto("https://www.yomiuri.co.jp/news/", {
      waitUntil: "load",
      timeout: 0,
    });
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

    browser.close();
  }
  getData();
}
