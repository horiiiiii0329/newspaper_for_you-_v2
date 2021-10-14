import { useState, useEffect } from "react";
import { supabase } from "../../api";
import EditProfile from "./EditProfile";
import styles from "./ProfileCard.module.scss";

function ProfileCard() {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
  }
  if (!profile) return null;
  return (
    <>
      <div className={styles.container}>
        <h2>こんにちわ{username ? username : "名無し"}さん</h2>

        <button onClick={signOut}>プロフィール</button>
      </div>
      <EditProfile />
    </>
  );
}

export default ProfileCard;
