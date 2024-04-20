import React from "react";
import Header from "./header";
import TabContent from "./tab-content";
import { TabsContextProvider } from "./context/tabsContext";
export default function HomeContainer() {
  return (
    <TabsContextProvider>
      <main className="2xl:container 2xl:mx-auto">
        <Header />
        <TabContent />
      </main>
    </TabsContextProvider>
  );
}
