"use client";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import UploadImage from "@/public/icon-upload-image.svg";
import { FORM_INPUTS } from "./constant";
import Button from "@/components/Button";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import clsx from "clsx";
import { useRouter } from "next/navigation";
export default function Form() {
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState(null);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();

    for (const key in data) {
      if (data[key] !== file) {
        formData.append(key, data[key]);
      }
    }
    if (file) {
      formData.append("profilePicture", file);
    }

    const response = await fetch("/api/user-upload", {
      method: "POST",
      body: formData,
    });

    if (response.status === 200) {
      const result = await response.json();
      toast.success(result.message);
      router.refresh();
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const fileTypes = ["image/jpeg", "image/png"];
    if (selectedFile) {
      if (!fileTypes.includes(selectedFile.type)) {
        toast.error("Only JPG and PNG files are allowed.");
        return;
      }
      setFile(selectedFile);
      setValue("profilePicture", selectedFile);
      const fileURL = URL.createObjectURL(selectedFile);
      setPreviewImage(fileURL);
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current.click(); // This will open the file input
  };

  return (
    <form
      encType="multipart/form-data"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 mt-4 "
    >
      <ToastContainer />
      <div className="p-5 flex flex-col md:flex-row md:items-center gap-4 bg-light-gray rounded-xl">
        <h5 className="text-base font-normal text-dark-gray md:w-[240px] ">
          Profile picture
        </h5>
        <div className="relative">
          <input
            {...register("profilePicture")}
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            hidden
            ref={fileInputRef}
            accept="image/png, image/jpeg"
          />
          <button
            type="button"
            onClick={handleFileButtonClick}
            className="w-[193px] h-[193px] inline-flex items-center justify-center rounded-xl bg-very-light-purple"
            style={{
              backgroundImage: previewImage
                ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${previewImage})`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div
              className={clsx(
                "flex flex-col items-center gap-2 ",
                {
                  "text-white": previewImage !== null,
                },
                { "text-purple": previewImage === null }
              )}
            >
              <UploadImage />
              <p className="text-base font-semibold  ">
                {previewImage ? "Change Image" : "+Upload Image"}
              </p>
            </div>
          </button>
        </div>

        <p className="text-xs font-normal text-dark-gray md:ml-2">
          Image must be below 1024x1024px.Use PNG or JPG format.
        </p>
      </div>

      <div className="p-5 flex flex-col gap-4 bg-light-gray rounded-xl">
        {FORM_INPUTS.map((input) => (
          <div
            key={input.id}
            className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 relative"
          >
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
