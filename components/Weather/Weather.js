import Image from "next/image";
import styles from "./Weather.module.scss";

const week = ["日", "月", "火", "水", "木", "金", "土"];

function Weather({ weatherNews }) {
  return (
    <div className={styles.weather__weekly}>
      <ul className={styles.weather__weekly__list}>
        {weatherNews.daily.map((date, index) => {
          const time = new Date(date.dt * 1000);
          let day = week[time.getDay()];
          const nowDay = week[new Date().getDay()];
          if (day == nowDay) {
            day;
          }
          if (index > 6) {
            return;
          }
          return (
            <li key={index}>
              <span>
                <Image
                  src={`/img/weatherIcons/${date.weather[0].icon}.png`}
                  className={styles.weatehr__icon}
                  alt={`${day}`}
                  loading="eager"
                  width={41}
                  height={41}
                  priority
                />
              </span>
              <div className={styles.weather__temp}>
                <p>{day}</p>
                <p className={styles.weather__temp__high}>
                  {parseInt(date.temp.max.toLocaleString(), 10)}˚c
                </p>
                <p className={styles.weather__temp__low}>
                  {parseInt(date.temp.min.toLocaleString(), 10)}˚c
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Weather;
