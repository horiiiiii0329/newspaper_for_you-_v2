import { useState, useEffect } from "react";
import { supabase } from "../../api";
import styles from "./EditProfile.module.scss";

export default function EditProfile({ user }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    const profileData = await supabase.auth.user();
    if (!profileData) {
      router.push("/");
    } else {
      setProfile(profileData);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  async function fetchProfile() {
    const profileData = await supabase.auth.user();

    setProfile(profileData);
  }

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username, website, avatar_url }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user.id,
        username,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal",
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.form}>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={profile?.email} disabled />
      </div>
      <div>
        <label htmlFor="username">名前</label>
        <input
          id="username"
          type="text"
          value={username || "名無し"}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <button
          className={styles.button}
          onClick={() => updateProfile({ username, website, avatar_url })}
          disabled={loading}
        >
          {loading ? "ローディング中。。。" : "更新"}
        </button>
      </div>

      <div>
        <button
          className={styles.button}
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
