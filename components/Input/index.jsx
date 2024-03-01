import React, { useState } from "react";
import UploadImage from "./icon-upload-image.svg";
export const TextField = ({
  labelTag,
  inputType = "text",
  inputName,
  value,
  onChange,
  placeholder,
  icon,
}) => {
  return (
    <div className="relative flex flex-col gap-2 ">
      <label className="body-s" htmlFor={inputName}>
        {labelTag}
      </label>
      <div className="relative ">
        <input
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
          <svg
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 0H1C0.867392 0 0.740215 0.0526785 0.646447 0.146447C0.552678 0.240215 0.5 0.367392 0.5 0.5V9C0.5 9.26522 0.605357 9.51957 0.792893 9.70711C0.98043 9.89464 1.23478 10 1.5 10H12.5C12.7652 10 13.0196 9.89464 13.2071 9.70711C13.3946 9.51957 13.5 9.26522 13.5 9V0.5C13.5 0.367392 13.4473 0.240215 13.3536 0.146447C13.2598 0.0526785 13.1326 0 13 0ZM12.5 9H1.5V1.63688L6.66187 6.36875C6.75412 6.45343 6.87478 6.50041 7 6.50041C7.12522 6.50041 7.24588 6.45343 7.33813 6.36875L12.5 1.63688V9Z"
              fill="#737373"
            />
          </svg>
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
    <div className="relative">
      <input
        type="file"
        id="fileInput"
        className="absolute w-full h-full opacity-0"
        onChange={handleFileChange}
      />
      <button
        className={`w-[193px]  h-[193px] bg-light-purple   rounded ${
          previewImage ? "text-white" : "text-purple"
        }`}
        style={{
          backgroundImage: `url(${previewImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col items-center justify-center gap-4 w-full h-full relative">
          <UploadImage />
          <div> {previewImage ? "Change Image" : "+ Upload Image"}</div>
          {previewImage && (
            <div className="absolute inset-0 bg-black opacity-50 rounded z-10"></div>
          )}
        </div>
      </button>
    </div>
  );
};
