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
    <button onClick={onClick} {...rest} className={`min-w-[227px] rounded-lg`}>
      {title}
    </button>
  );
}
