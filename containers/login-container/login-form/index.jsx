"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FORM_DATA } from "./constant";
import Image from "next/image";
import { validationSchemaLoginUser } from "@/utils/validation";
import Button from "@/components/Button";
import Link from "next/link";
export default function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchemaLoginUser) });

  const onSubmit = async (data) => {
    // const response = await fetch("/api/create-user", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });
    // const { message } = await response.json();
    // console.log(message);
  };
  return (
    <div className="bg-white md:p-10 rounded-lg md:w-[476px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-10">
          <h1 className="text-2xl leading-[150%] font-bold ">Login</h1>
          <p className="body-m text-dark-gray ">
            Add your details below to get back into the app
          </p>
        </div>
        <div className="flex flex-col gap-6 text-dark-gray ">
          {FORM_DATA.map((item) => (
            <div key={item.id} className="relative flex flex-col gap-1 ">
              <label
                htmlFor={item.name}
                className={`${
                  errors[item.name]?.message ? "text-red" : "text-dark-gray"
                } body-s `}
              >
                {item.label}
              </label>
              <div className="relative ">
                <input
                  {...register(item.name)}
                  name={item.name}
                  type={item.type}
                  placeholder={item.placeholder}
                  className={`relative w-full h-12 pl-[46px] pr-4 body-m outline-none rounded-lg border ${
                    errors[item.name]?.message
                      ? "border-red"
                      : "border-dark-gray"
                  } focus:border-purple focus:drop-shadow-[.5px_.5px_5px_rgb(90,60,255)] hover:cursor-pointer`}
                  autoComplete={
                    item.type === "password" || item.type === "rePassword"
                      ? "on"
                      : "off"
                  }
                />
                {/* Icon */}
                <div className=" absolute top-1/2 left-4 -translate-y-1/2  ">
                  <Image
                    src={item.icon}
                    alt="icon"
                    width={16}
                    height={16}
                    className="object-cover"
                  />
                </div>

                {/* Error Message */}
                {errors[item.name]?.message && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <p className="body-s text-red">
                      {errors[item.name]?.message}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}

          <p className="body-s">Password must contain at least 8 characters</p>
          <Button
            className="heading-s"
            title="Create new account"
            variant="primary"
            type="submit"
          />
        </div>
      </form>
      <div className="text-center mt-10 flex items-center justify-center gap-0.5">
        <p className="body-m">Dont have an account?</p>
        <Link href="/signup" className="text-purple body-m">
          Create account
        </Link>
      </div>
    </div>
  );
}
