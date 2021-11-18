import "tailwindcss/tailwind.css";
import { SessionProvider } from "next-auth/react";
import { AppProvider } from "../context/sidebar-context";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import AuthGuard from "../components/AuthGuard/AuthGuard";
import Head from "next/dist/shared/lib/head";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  function toggleSidebar() {
    setSidebarExpanded(!sidebarExpanded);
  }

  useEffect(() => {
    if (sidebarExpanded !== false) setSidebarExpanded(!isMobile);
  }, [isMobile]);

  return (
    <SessionProvider session={session}>
      {Component.requireAuth ? (
        <AuthGuard>
          <AppProvider value={{ sidebarExpanded, toggleSidebar, isMobile }}>
            <Head>
              <link rel="icon" href="/favicon.png" />
            </Head>
            <Component {...pageProps} />
          </AppProvider>
        </AuthGuard>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}

export default MyApp;
