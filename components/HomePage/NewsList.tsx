import NewsListItem from "./NewsListItem";

interface Item {
  item: {
    company: string;
    title: string;
    href: string;
    time: string;
    id: string;
  };
}

function NewsList({ newsData }: any) {
  console.log(newsData);
  return (
    <div>
      {newsData.map((item: any, index: number) => {
        return <NewsListItem item={item} key={index} />;
      })}
    </div>
  );
}

export default NewsList;
