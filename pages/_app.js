import "../styles/global.scss";
import { useState, useEffect } from "react";
import { supabase } from "../api";
import AuthUser from "../components/Profile/AuthUser";
import Header from "../components/Header/Header";
import { AppWrapperProvider } from "../context/state";
import TitleBar from "../components/UI/TitleBar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <TitleBar />
      <Header />

      <AppWrapperProvider>
        <Component {...pageProps} />
      </AppWrapperProvider>
    </>
  );
}

export default MyApp;
