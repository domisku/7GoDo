import React from "react";

const SidebarContext = React.createContext({
    sidebarExpanded: true
});

export const AppProvider = SidebarContext.Provider;

export default SidebarContext;