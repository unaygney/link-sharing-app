"use client";
import React, { useRef, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Button from "@/components/Button";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import { useRouter } from "next/navigation";
import DragIcon from "@/public/icon-drag-and-drop.svg";
import { ALL_MENU_LIST } from "./constant";
import Image from "next/image";
import LinksIcon from "@/public/icon-links.svg";
import EmptyIconMobile from "@/public/illustration-empty-mobile.svg?url";

export default function Form() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      links: [{ platform: "", url: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });

  const onSubmit = async (data) => {
    console.log(data);
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      height: "48px",

      display: "flex",
      alignItems: "center",
      padding: "0 12px",
    }),
    control: (provided) => ({
      ...provided,
      height: "48px",
      borderRadius: "8px",
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: "48px",
    }),
  };

  const customOptions = ALL_MENU_LIST.map((item) => ({
    value: item.value,
    label: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Image
          src={item.icon}
          alt=""
          width={24}
          height={24}
          style={{ marginRight: "10px" }}
        />
        {item.title}
      </div>
    ),
  }));

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 mt-4"
    >
      <ToastContainer />
      <Button
        onClick={() => append({ platform: "", url: "" })}
        type="button"
        variant="secondary"
        className="flex-shrink-0"
        title="+ Add new link"
      />

      {fields.length === 0 ? (
        <div className="bg-light-gray p-5 flex items-center justify-center rounded-xl">
          <div className="flex flex-col gap-6 items-center text-center ">
            <div className="relative w-[124px] h-[80px] md:w-[249px] md:h-[160px]">
              <Image alt="icon" src={EmptyIconMobile} fill />
            </div>
            <h3 className="text-custom-black text-2xl md:text-[32px] font-bold">
              Let's get you started
            </h3>
            <p className="text-dark-gray text-base font-normal">
              Use the “Add new link” button to get started. Once you have more
              than one link, you can reorder and edit them.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4  lg:max-h-[509px] lg:overflow-scroll hide-scrollbar  ">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="bg-light-gray rounded-xl p-5 flex flex-col gap-3"
            >
              <div className="flex justify-between">
                <button className="inline-flex items-center gap-2 text-dark-gray">
                  <DragIcon />
                  <p className="font-bold text-base">Link #{index + 1}</p>
                </button>
                <button
                  onClick={() => remove(index)}
                  className="text-base text-dark-gray font-normal"
                  type="button"
                >
                  Remove
                </button>
              </div>

              <Controller
                name={`links[${index}].platform`}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={customOptions}
                    classNamePrefix="custom-select"
                    menuPortalTarget={document.body}
                    styles={customStyles}
                    menuPosition="fixed"
                    value={customOptions.find(
                      (option) => option.value === field.value
                    )}
                    onChange={(val) => field.onChange(val.value)}
                  />
                )}
              />
              <div className="relative">
                <input
                  {...register(`links[${index}].url`, { required: true })}
                  placeholder="Enter the URL"
                  className="relative w-full h-12 pl-[46px] pr-4 body-m outline-none rounded-lg border border-gray focus:border-purple focus:drop-shadow-[.5px_.5px_5px_rgb(90,60,255)] hover:cursor-pointer"
                />
                {errors.links && errors.links[index]?.url && (
                  <p className="text-red-500">This area is required.</p>
                )}
                <div className="absolute top-1/2 left-4 -translate-y-1/2 text-custom-black">
                  <LinksIcon />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <hr className="w-full text-gray" />
      <Button
        type="submit"
        title="Save"
        variant="primary"
        className="xl:w-[91px] xl:ml-auto  flex-shrink-0"
        disabled={fields.length === 0}
      />
    </form>
  );
}
