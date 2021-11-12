import { useState, useEffect } from "react";
import { supabase } from "../../api";
import Link from "next/link";
import styles from "./MyPost.module.scss";

interface Post {
  title: string;
  user_email: string;
  id: string;
}

export default function MyPosts() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const user = supabase.auth.user();
    const { data }: any = await supabase
      .from("posts")
      .select("*")
      .filter("user_id", "eq", user?.id);
    setPosts(data);
  }
  async function deletePost(id: string) {
    await supabase.from("posts").delete().match({ id });
    fetchPosts();
  }
  return (
    <>
      {posts.map((post, index) => (
        <>
          <div key={index} className={styles.container}>
            <h2>{post.title}</h2>
            <p>著者: {post.user_email}</p>
          </div>
          <div className={styles.button__container}>
            <Link href={`/edit/${post.id}`}>
              <a>編集</a>
            </Link>
            <Link href={`/posts/${post.id}`}>
              <a>詳細を見る</a>
            </Link>
            <button onClick={() => deletePost(post.id)}>消去</button>
          </div>
        </>
      ))}
    </>
  );
}
