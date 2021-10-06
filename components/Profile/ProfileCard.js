import { useState, useEffect } from "react";
import { supabase } from "../../api";
import styles from "./ProfileCard.module.scss";

function ProfileCard() {
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    fetchProfile();
  }, []);
  // async function update() {
  //   const { user, error } = await supabase.auth.update({
  //     data: {
  //       city: "New York",
  //     },
  //   });
  //   console.log("user:", user);
  // }
  async function fetchProfile() {
    const profileData = await supabase.auth.user();
    if (!profileData) {
      router.push("/");
    } else {
      setProfile(profileData);
    }
  }
  async function signOut() {
    await supabase.auth.signOut();
  }
  if (!profile) return null;
  return (
    <div className={styles.container}>
      <h2>こんにちわ</h2>

      <button onClick={signOut}>サインアウト</button>
    </div>
  );
}

export default ProfileCard;
