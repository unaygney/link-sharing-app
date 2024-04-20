import React, { useState } from "react";
import UploadImage from "./icon-upload-image.svg";
import Image from "next/image";
export const TextField = ({
  labelTag,
  inputType = "text",
  inputName,
  value,
  onChange,
  placeholder,
  icon,
  register,
}) => {
  return (
    <div className="relative flex flex-col gap-1 ">
      <label className="body-s" htmlFor={inputName}>
        {labelTag}
      </label>
      <div className="relative ">
        <input
          {...register(inputName)}
          id={inputName}
          name={inputName}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="relative w-full h-12 pl-[46px] pr-4 body-m outline-none rounded-lg border border-dark-gray focus:border-purple focus:drop-shadow-[.5px_.5px_5px_rgb(90,60,255)] hover:cursor-pointer"
        />
        {/* Icon */}
        <div className=" absolute top-1/2 left-4 -translate-y-1/2  ">
          <Image
            src={icon}
            alt="icon"
            width={16}
            height={16}
            className="object-cover"
          />
        </div>

        {/* Error Message */}
        {/* <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <p className="body-s text-red">Please check again</p>
        </div> */}
      </div>
    </div>
  );
};

export const FileInput = () => {
  const [previewImage, setPreviewImage] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className="relative ">
      <input
        type="file"
        id="fileInput"
        className="absolute w-full h-full opacity-0 z-10"
        onChange={handleFileChange}
      />
      <button
        className={`w-[193px]  h-[193px] bg-very-light-purple cursor-pointer  rounded ${
          previewImage ? "text-white    " : "text-purple"
        }`}
        style={{
          backgroundImage: `url(${previewImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col items-center justify-center gap-4 w-full h-full  relative  ">
          <div className="z-20  flex flex-col justify-center items-center ">
            <UploadImage />
            {previewImage ? "Change Image" : "+ Upload Image"}
          </div>
          {previewImage && (
            <div className="absolute inset-0 bg-black opacity-70 rounded z-10"></div>
          )}
        </div>
      </button>
    </div>
  );
};
