import "tailwindcss/tailwind.css";
import { SessionProvider } from "next-auth/react";
import { AppProvider } from "../context/sidebar-context";
import { useEffect, useState } from "react";
import { useMediaQuery } from 'react-responsive';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  function toggleSidebar() {
    setSidebarExpanded(!sidebarExpanded);
  }
  console.log(isMobile)

  useEffect(() => {
    if (sidebarExpanded !== false) setSidebarExpanded(!isMobile);
  }, [isMobile])

  return (
    <SessionProvider session={session}>
      <AppProvider value={{sidebarExpanded, toggleSidebar, isMobile}}>
        <Component {...pageProps} />
      </AppProvider>
    </SessionProvider>
  );
}

export default MyApp;
