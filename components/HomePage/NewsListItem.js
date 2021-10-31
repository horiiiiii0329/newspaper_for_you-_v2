function NewsListItem({ item }) {
  return (
    <div key={index} className={styles.item__item}>
      <a href={item.href} target="_blank" rel="noopener noreferrer">
        <p>{item.title}</p>
      </a>
      {user && (
        <div
          onClick={() => {
            setSavedData({
              company: item.company,
              headline: item.title,
              link: item.href,
              time: item.time,
            });
            savePost();
          }}
        >
          {status ? done : scissors}
        </div>
      )}
    </div>
  );
}

export default NewsListItem;
