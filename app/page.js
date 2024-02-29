import Button from "@/components/Button";
import { TextField } from "@/components/Input";
import Tab from "@/components/Tab";
export default function Home() {
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
      </div>
    </main>
  );
}
