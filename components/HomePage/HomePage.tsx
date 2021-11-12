import styles from "./HomePage.module.scss";
import { useState, useEffect } from "react";
import Weather from "../Weather/Weather";
import moment from "moment";
import NewsList from "./NewsList";

function HomePage({
  user,
  weatherNews,
  asahiData,
  yomiuriData,
  sankeiData,
  mainichiData,
  nikkeiData,
}: {
  user: string;
  weatherNews: object;
  asahiData: object;
  yomiuriData: object;
  sankeiData: object;
  mainichiData: object;
  nikkeiData: object;
}) {
  const [dateState, setDateState] = useState(moment().format());

  const [leftOpen, setLeftOpen] = useState(true);
  const [asahi, setAsahi] = useState(true);
  const [mainichi, setMainichi] = useState(false);
  const [tokyo, setTokyo] = useState(false);
  const [leftPickedNews, setLeftPickedNews] = useState("新聞紙を選ぶ");
  const [leftPickedNewsData, setLeftPickedNewsData] = useState<object>([]);

  const [rightOpen, setRightOpen] = useState(true);
  const [rightPickedNews, setRightPickedNews] = useState("新聞紙を選ぶ");
  const [rightPickedNewsData, setRightPickedNewsData] = useState<object>([]);

  useEffect(() => {
    setInterval(() => setDateState(moment().format()), 1000);
  }, []);

  return (
    <>
      <div className={styles.main}>
        <div className={styles.main_left}>
          <div>
            <h3
              onClick={() => {
                setLeftOpen(!leftOpen);
                setLeftPickedNews("新聞紙を選ぶ");
              }}
            >
              {leftPickedNews}
            </h3>
            {leftOpen && (
              <div onClick={() => setLeftOpen(!leftOpen)}>
                <h3
                  onClick={() => {
                    setAsahi(!asahi);
                    setLeftPickedNews("朝日新聞");
                    setLeftPickedNewsData(asahiData);
                  }}
                >
                  朝日新聞
                </h3>
                <h3
                  onClick={() => {
                    setMainichi(!mainichi);
                    setLeftPickedNews("毎日新聞");
                    setLeftPickedNewsData(mainichiData);
                  }}
                >
                  毎日新聞
                </h3>
                <h3
                  onClick={() => {
                    setTokyo(!tokyo);
                    setLeftPickedNews("産経新聞");
                    setLeftPickedNewsData(sankeiData);
                  }}
                >
                  産経新聞
                </h3>
              </div>
            )}
          </div>

          <div>
            {!leftOpen && (
              <NewsList newsData={leftPickedNewsData} user={user} />
            )}
          </div>
        </div>
        <div className={styles.main_right}>
          <h3
            onClick={() => {
              setRightOpen(!rightOpen);
              setRightPickedNews("新聞紙を選ぶ");
            }}
          >
            {rightPickedNews}
          </h3>
          {rightOpen && (
            <div onClick={() => setRightOpen(!rightOpen)}>
              <h3
                onClick={() => {
                  setRightPickedNews("読売新聞");
                  setRightPickedNewsData(yomiuriData);
                }}
              >
                読売新聞
              </h3>
              <h3
                onClick={() => {
                  setRightPickedNews("日経新聞");
                  setRightPickedNewsData(nikkeiData);
                }}
              >
                日経新聞
              </h3>
            </div>
          )}
          <div>
            {!rightOpen && (
              <NewsList newsData={rightPickedNewsData} user={user} />
            )}
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottom_right}>
          <Weather weatherNews={weatherNews} />
        </div>
        <div className={styles.bottom_left}>
          <p>{dateState}</p>
        </div>
      </div>
    </>
  );
}

export default HomePage;
