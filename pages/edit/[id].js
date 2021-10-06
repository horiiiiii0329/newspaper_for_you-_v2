import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { supabase } from "../../api";
import styles from "./edit.module.scss";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

function EditPost() {
  const [post, setPost] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    fetchPost();
    async function fetchPost() {
      if (!id) return;
      const { data } = await supabase
        .from("posts")
        .select()
        .filter("id", "eq", id)
        .single();
      setPost(data);
    }
  }, [id]);
  if (!post) return null;
  function onChange(e) {
    setPost(() => ({ ...post, [e.target.name]: e.target.value }));
  }
  const { title, content } = post;
  async function updateCurrentPost() {
    if (!title || !content) return;
    await supabase.from("posts").update([{ title, content }]).match({ id });
    router.push("/my-posts");
  }
  return (
    <div className={styles.container}>
      <h1>編集</h1>
      <input
        onChange={onChange}
        name="title"
        placeholder="タイトル"
        value={post.title}
      />
      <SimpleMDE
        value={post.content}
        onChange={(value) => setPost({ ...post, content: value })}
      />
      <button className={styles.button} onClick={updateCurrentPost}>
        更新
      </button>
    </div>
  );
}

export default EditPost;
