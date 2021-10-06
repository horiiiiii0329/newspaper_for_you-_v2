import "../styles/global.scss";
import { useState, useEffect } from "react";
import { supabase } from "../api";
import AuthUser from "../components/Profile/AuthUser";
import Header from "../components/Header/Header";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
