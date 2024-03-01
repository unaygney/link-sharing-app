import React from "react";
import SignupForm from "./SignupForm";
import Logo from "@/public/logo-devlinks-large.svg";

function SignupContainer() {
  return (
    <main className="w-full h-full md:bg-light-gray">
      <div className="w-full h-full flex flex-col md:justify-center md:items-center  gap-10 p-8 ">
        <div className="mb-6">
          <Logo />
        </div>
        <SignupForm />
      </div>
    </main>
  );
}

export default SignupContainer;
