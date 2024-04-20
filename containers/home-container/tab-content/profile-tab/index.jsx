import React from "react";
import Header from "./header";
import Form from "./form";

export default function ProfileTab() {
  return (
    <section className="flex flex-col bg-white m-4 rounded-xl p-6">
      <Header />
      <Form />
    </section>
  );
}
