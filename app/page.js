"use client";
import Button from "@/components/Button";
import { Select } from "antd";
import { FileInput, TextField } from "@/components/Input";
import Tab from "@/components/Tab";
export default function Home() {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <main className="p-10">
      <div className="flex flex-col gap-10 max-w-[300px]">
        <Button title="Test" variant="primary" />
        <Button title="Test" variant="secondary" />
        <TextField
          labelTag="Email Address"
          inputName="name"
          placeholder="name"
        />
        <Tab />
        <Tab />

        <Select
          defaultValue="lucy"
          className="w-[400px] h-10"
          onChange={handleChange}
          options={[
            { value: "jack", label: "Jack" },
            { value: "lucy", label: "Lucy" },
            { value: "Yiminghe", label: "yiminghe" },
            { value: "disabled", label: "Disabled", disabled: true },
          ]}
        />

        <FileInput />
      </div>
    </main>
  );
}
