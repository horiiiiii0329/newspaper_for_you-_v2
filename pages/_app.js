import "../styles/global.scss";
import { useState, useEffect } from "react";
import { supabase } from "../api";
import AuthUser from "../components/Profile/AuthUser";
import Header from "../components/Header/Header";
import { AppWrapperProvider } from "../context/state";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <AppWrapperProvider>
        <Component {...pageProps} />
      </AppWrapperProvider>
    </>
  );
}

export default MyApp;
