import { useState, useEffect } from "react";
import { supabase } from "../../api";
import EditProfile from "./EditProfile";
import styles from "./ProfileCard.module.scss";

function ProfileCard() {
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile();
    const mySubscription = supabase
      .from("profiles")
      .on("*", () => getProfile())
      .subscribe();
    return () => supabase.removeSubscription(mySubscription);
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
        setUserName(data.username);
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

  return (
    <>
      <div className={styles.container}>
        <h2>
          こんにちわ : {userName ? userName : "名無し"} <span>さん</span>
        </h2>

        <button onClick={signOut}>プロフィール</button>
      </div>
      <EditProfile />
    </>
  );
}

export default ProfileCard;
