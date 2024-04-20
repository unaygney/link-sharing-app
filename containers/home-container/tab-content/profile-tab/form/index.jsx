"use client";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import UploadImage from "@/public/icon-upload-image.svg";
import { FORM_INPUTS } from "./constant";
import Button from "@/components/Button";
export default function Form() {
  const fileInputRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  const handleFileButtonClick = () => {
    fileInputRef.current.click(); // This will open the file input
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 mt-4 "
    >
      <div className="p-5 flex flex-col md:flex-row md:items-center gap-4 bg-light-gray rounded-xl">
        <h5 className="text-base font-normal text-dark-gray md:w-[240px] ">
          Profile picture
        </h5>
        <div className="relative">
          <input
            {...register("profilePicture")}
            type="file"
            hidden
            ref={fileInputRef}
          />
          <button
            type="button"
            onClick={handleFileButtonClick}
            className="w-[193px] h-[193px] inline-flex items-center justify-center rounded-xl bg-very-light-purple"
          >
            <div className="flex flex-col items-center gap-2 text-purple">
              <UploadImage />
              <p className="text-base font-semibold ">+Upload Image</p>
            </div>
          </button>
        </div>

        <p className="text-xs font-normal text-dark-gray md:ml-2">
          Image must be below 1024x1024px.Use PNG or JPG format.
        </p>
      </div>

      <div className="p-5 flex flex-col gap-4 bg-light-gray rounded-xl">
        {FORM_INPUTS.map((input) => (
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 relative">
            <label
              htmlFor={input.name}
              className="text-xs md:text-base font-normal text-dark-gray"
            >
              {input.placeholder}
            </label>
            <input
              {...register(input.name, { required: input.name !== "email" })}
              type={input.type}
              id={input.name}
              name={input.name}
              placeholder={input.placeholder}
              className="w-full md:w-[344px] h-12 p-4 bg-white border border-gray rounded-lg relative"
            />
            {errors[input.name] && (
              <span className="text-xs text-red absolute right-4 top-1/2 -translate-y-1/2">
                This field is required
              </span>
            )}
          </div>
        ))}
      </div>

      <hr className="w-full text-gray" />
      <Button
        type="submit"
        title="save"
        variant="primary"
        className="xl:w-[91px] xl:ml-auto"
      />
    </form>
  );
}
