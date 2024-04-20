"use client";
import React from "react";
import { useTabsContext } from "../context/tabsContext";
import LinksTab from "./links-tab";
import ProfileTab from "./profile-tab";
export default function TabContent() {
  const { activeTab } = useTabsContext();

  if (activeTab === "links") {
    return <LinksTab />;
  } else {
    return <ProfileTab />;
  }
}
