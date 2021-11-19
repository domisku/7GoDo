import "tailwindcss/tailwind.css";
import { SessionProvider } from "next-auth/react";
import { AppProvider } from "../context/sidebar-context";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import AuthGuard from "../components/AuthGuard/AuthGuard";
import Head from "next/dist/shared/lib/head";
import { config as fontawesomeConfig } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Popup from "../components/Popup/Popup";

fontawesomeConfig.autoAddCss = false;

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [cookiesAccepted, setCookiesAccepted] = useState(true);

  function toggleSidebar() {
    setSidebarExpanded(!sidebarExpanded);
  }

  useEffect(() => {
    if (sidebarExpanded !== false) setSidebarExpanded(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    if (!localStorage.getItem("cookies-pref")) setCookiesAccepted(false);
  }, []);

  return (
    <SessionProvider session={session}>
      {Component.requireAuth ? (
        <AuthGuard>
          <AppProvider value={{ sidebarExpanded, toggleSidebar, isMobile }}>
            <Head>
              <link rel="icon" href="/favicon.png" />
            </Head>
            <Component {...pageProps} />
            <Popup
              cookiesAccepted={cookiesAccepted}
              setCookiesAccepted={setCookiesAccepted}
            />
          </AppProvider>
        </AuthGuard>
      ) : (
        <>
          <Component {...pageProps} />
          <Popup
            cookiesAccepted={cookiesAccepted}
            setCookiesAccepted={setCookiesAccepted}
          />
        </>
      )}
    </SessionProvider>
  );
}

export default MyApp;
