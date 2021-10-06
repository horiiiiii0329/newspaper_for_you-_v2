import SectionHeader from "../UI/SectionHeader";
import SectionLayout from "../Layout/SectionLayout";
import styles from "./Profile.module.scss";
import { useState, useEffect } from "react";
import AuthUser from "./AuthUser";
import { supabase } from "../../api";
import Spinner from "../UI/Spinner";
import PostItem from "./PostItem";
import Link from "next/link";

function Profile() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const user = supabase.auth.user();
    const { data } = await supabase
      .from("posts")
      .select("*")
      .filter("user_id", "eq", user.id);
    setPosts(data);
  }
  async function deletePost(id) {
    await supabase.from("posts").delete().match({ id });
    fetchPosts();
  }

  return (
    <div>
      {/* {posts ? (
          <Spinner />
        ) : (
          posts.map((post, index) => (
            <div key={index}>
              <PostItem
                id={post.id}
                href={`posts/${post.id}`}
                title={post.title}
                email={post.user_email}
              />
              <Link href={`/edit-post/${post.id}`}>
                <a>編集</a>
              </Link>
              <Link href={`/posts/${post.id}`}>
                <a>詳細</a>
              </Link>
              <button onClick={() => deletePost(post.id)}>消去</button>
            </div>
          ))
        )} */}
    </div>
  );
}

export default Profile;
