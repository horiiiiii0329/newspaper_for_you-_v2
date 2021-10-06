import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { supabase } from "../../api";
import styles from "./posts.module.scss";

export default function Post({ post }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.container}>
      <h1>{post.title}</h1>
      <p> {post.user_email}</p>
      <div>
        <ReactMarkdown className="prose">{post.content}</ReactMarkdown>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const { data, error } = await supabase.from("posts").select("id");
  const paths = data.map((post) => ({
    params: { id: JSON.stringify(post.id) },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const { data } = await supabase
    .from("posts")
    .select()
    .filter("id", "eq", id)
    .single();
  return {
    props: {
      post: data,
    },
  };
}
