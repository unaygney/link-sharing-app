import React from "react";
import LoginForm from "./login-form";
import Logo from "@/public/logo-devlinks-large.svg";
export default function LoginContainer() {
  return (
    <main className="w-full h-full md:bg-light-gray md:shadow-md">
      <div className="w-full h-full flex-col flex  justify-center items-center  gap-10 p-8 ">
        <div className="mb-6">
          <Logo />
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
