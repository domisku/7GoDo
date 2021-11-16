import "tailwindcss/tailwind.css";
import { SessionProvider } from "next-auth/react";
import { AppProvider } from "../context/sidebar-context";
import { useState } from "react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  function toggleSidebar() {
    setSidebarExpanded(!sidebarExpanded);
  }

  return (
    <SessionProvider session={session}>
      <AppProvider value={{sidebarExpanded, toggleSidebar}}>
        <Component {...pageProps} />
      </AppProvider>
    </SessionProvider>
  );
}

export default MyApp;
