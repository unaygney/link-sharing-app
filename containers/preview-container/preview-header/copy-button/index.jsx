"use client";
import React from "react";
import Button from "@/components/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function index() {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("The link has been copied to your clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return (
    <>
      <ToastContainer />
      <Button
        className="flex-1 rounded-xl max-w-[133px]"
        variant="primary"
        title="Share Link"
        onClick={handleCopyLink}
      />
    </>
  );
}
