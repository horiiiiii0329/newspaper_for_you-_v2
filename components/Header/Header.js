import { LightBulbIcon } from "@heroicons/react/outline";
import { useState, useEffect } from "react";
import { supabase } from "../../api";
import styles from "./Header.module.scss";
import { useRouter } from "next/router";

function Header({ resetAll }) {
  const router = useRouter();
  // const [user, setUser] = useState(null);
  // useEffect(() => {
  //   const { data: authListener } = supabase.auth.onAuthStateChange(async () =>
  //     checkUser()
  //   );
  //   checkUser();
  //   return () => {
  //     authListener?.unsubscribe();
  //   };
  // }, []);

  // async function checkUser() {
  //   const user = supabase.auth.user();
  //   setUser(user);
  // }

  return (
    <header className={styles.Header}>
      <LightBulbIcon
        style={{ width: "80px", height: "80px", cursor: "pointer" }}
        onClick={() => {
          router.push("/");
          router.reload();
        }}
      />
    </header>
  );
}

export default Header;
