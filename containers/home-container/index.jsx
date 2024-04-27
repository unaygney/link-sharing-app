import React from "react";
import Header from "./header";
import TabContent from "./tab-content";

export default function HomeContainer() {
  return (
    <main className="2xl:container 2xl:mx-auto">
      <Header />
      <TabContent />
    </main>
  );
}
