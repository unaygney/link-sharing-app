import React from "react";
import PhoneCard from "@/components/PhoneCard";
import Form from "./form";
import Header from "./header";
export default function ProfileContainer() {
  return (
    <main>
      <section className="flex">
        <PhoneCard />
        <div className="flex flex-col w-full bg-white m-4 2xl:mr-0 rounded-xl 2xl:ml-0 p-6 xl:flex-1  ">
          <Header />
          <Form />
        </div>
      </section>
    </main>
  );
}
