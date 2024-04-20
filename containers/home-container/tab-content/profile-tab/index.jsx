import React from "react";
import Header from "./header";
import Form from "./form";

export default function ProfileTab() {
  return (
    <section className="flex">
      <div className="flex-1 bg-white rounded-xl m-4 hidden xl:block 2xl:ml-0 p-6">
        this area will be component
      </div>
      <div className="flex flex-col w-full bg-white m-4 2xl:mr-0 rounded-xl 2xl:ml-0 p-6 xl:flex-1  ">
        <Header />
        <Form />
      </div>
    </section>
  );
}
