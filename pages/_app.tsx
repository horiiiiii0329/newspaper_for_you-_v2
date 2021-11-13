import "../styles/global.scss";
import Header from "../components/Header/Header";
import { AppWrapperProvider } from "../context/state";
import TitleBar from "../components/UI/TitleBar";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AppWrapperProvider>
        <TitleBar />
        <Header />
        <Component {...pageProps} />
      </AppWrapperProvider>
    </>
  );
}

export default MyApp;
