import React from "react";
import PreviewHeader from "./preview-header";
import PreviewCard from "./preview-card";
export default function PreviewContainer({ user }) {
  return (
    <main className="flex flex-col pb-10">
      <PreviewHeader user={user} />
      <PreviewCard user={user} />
    </main>
  );
}
