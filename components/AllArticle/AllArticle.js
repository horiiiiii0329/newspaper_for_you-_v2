import { useState, useEffect } from "react";
import styles from "./AllArticle.module.scss";
import { supabase } from "../../api";
import AllArticleList from "./AllArticleList";
import AllArticleType from "./AllArticleType";

function AllArticle() {
  const [posts, setPosts] = useState([]);
  const [titles, setTitle] = useState([]);
  const [company, setCompany] = useState([]);
  const [activeContent1, setActiveContent1] = useState(true);
  const [activeContent2, setActiveContent2] = useState(false);

  console.log(posts);

  useEffect(() => {
    fetchPosts();
    fetchTitle();
    fetchCompany();
  }, []);

  async function fetchPosts() {
    const { data } = await supabase.from("save").select("*");

    setPosts(data);
  }

  async function fetchFilteredTitlePosts(title) {
    const { data } = await supabase
      .from("save")
      .select("*")
      .filter("title", "eq", title);

    setPosts(data);
  }

  async function fetchFilteredCompanyPosts(item) {
    const { data } = await supabase
      .from("save")
      .select("*")
      .filter("company", "eq", item);

    setPosts(data);
  }

  async function fetchCompany() {
    const { data } = await supabase.from("save").select("company");

    let unique = [];
    data.forEach((item) => {
      if (!unique.includes(item.company)) {
        unique.push(item.company);
      }
    });

    setCompany(unique);
  }

  async function fetchTitle() {
    const { data } = await supabase.from("save-scrap-title").select("*");

    setTitle(data);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content_wrapper}>
        {posts.map((post, index) => (
          <AllArticleList
            title={post.headline}
            time={post.time}
            company={post.company}
            key={index}
            link={post.link}
          />
        ))}
      </div>
      <div className={styles.content_wrapper2}>
        <div className={styles.categories}>
          <p
            onClick={() => {
              setActiveContent1(true);
              setActiveContent2(false);
            }}
            className={activeContent1 ? styles.activecontent : undefined}
          >
            媒体
          </p>
          <p
            onClick={() => {
              setActiveContent1(false);
              setActiveContent2(true);
            }}
            className={activeContent2 ? styles.activecontent2 : undefined}
          >
            スクラップブック
          </p>
        </div>

        {activeContent1 &&
          company.map((item, index) => (
            <div onClick={() => fetchFilteredCompanyPosts(item)} key={index}>
              <AllArticleType title={item} index={index} />
            </div>
          ))}
        {activeContent2 &&
          titles.map((title, index) => (
            <div
              key={index}
              onClick={() => fetchFilteredTitlePosts(title.title)}
            >
              <AllArticleType title={title.title} index={index} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default AllArticle;
