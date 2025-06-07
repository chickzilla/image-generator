import { PromptForm } from "@/components/promptForm/promptForm";
import Image from "next/image";

export default function Home() {
  return (
    <main className="pt-[50px] h-screen overflow-hidden">
      <PromptForm />
    </main>
  );
}
