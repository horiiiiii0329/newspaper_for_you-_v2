import { supabase } from "../../api";
import { useState } from "react";
import styles from "./AuthUser.module.scss";
import { AuthSession } from "@supabase/supabase-js";

function AuthUser() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  async function signIn() {
    const { error, data } = await supabase.auth.signIn({
      email,
    });
    if (error) {
      console.log({ error });
    } else {
      setSubmitted(true);
    }
  }
  if (submitted) {
    return (
      <div className={styles.container}>
        <h1>メールボックスを確認してください</h1>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div>
          <h1 className={styles.title}>サインイン</h1>
          <input
            placeholder="e-mail"
            onChange={(e) => setEmail(e.target.value)}
            style={{ margin: 10 }}
          />
        </div>
        <button onClick={() => signIn()}>リンクを送る</button>
      </main>
    </div>
  );
}

export default AuthUser;
