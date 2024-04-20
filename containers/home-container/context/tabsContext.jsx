"use client";
import { createContext, useContext, useMemo, useState } from "react";

const TabsContext = createContext();

export const TabsContextProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("links");
  const data = useMemo(() => {
    return {
      activeTab,
      setActiveTab,
    };
  }, [activeTab]);

  return <TabsContext.Provider value={data}>{children}</TabsContext.Provider>;
};

export const useTabsContext = () => {
  const TabsContextData = useContext(TabsContext);
  if (!TabsContextData) {
    throw new Error("no tabs context");
  }

  return TabsContextData;
};
