"use client";
import React from "react";
import clsx from "clsx";

export default function Button({
  title,
  variant,
  onClick,
  className,
  ...rest
}) {
  return (
    <button
      onClick={onClick}
      {...rest}
      className={clsx(
        "min-w-[227px] h-[46px] flex items-center justify-center rounded-lg transition-colors delay-150 heading-s",
        variant === "primary" &&
          "bg-purple text-white hover:bg-light-purple disabled:bg-very-light-purple disabled:pointer-events-none",
        variant === "secondary" &&
          "bg-white text-purple border border-purple hover:bg-very-light-purple disabled:opacity-50 disabled:pointer-events-none",
        className
      )}
    >
      {title}
    </button>
  );
}
