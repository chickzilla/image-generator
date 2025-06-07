import ImageArea from "@/components/imageArea/imageArea";
import PromptForm from "@/components/promptForm/promptForm";

export default function Home() {
  return (
    <main className="pt-[50px] h-screen overflow-hidden flex flex-col md:flex-row">
      <PromptForm />
      <div className="flex-1 overflow-auto">
        <ImageArea />
      </div>
    </main>
  );
}
