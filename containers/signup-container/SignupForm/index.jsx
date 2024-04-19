"use client";
import React from "react";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import { FORM_DATA } from "./constant";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemaCreateuser } from "@/utils/validation";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
function SignupForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchemaCreateuser) });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      console.log(response);
      if (response.status === 200) {
        await toast.success(res.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        await toast.error(res.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      await toast.error(error.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <div className="bg-white md:p-10 rounded-lg md:w-[476px]">
      <ToastContainer />
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
      <div className="text-center mt-10">
        <p className="body-m">Already have an account?</p>
        <Link href="/login" className="text-purple body-m">
          Login
        </Link>
      </div>
    </div>
  );
}

export default SignupForm;
