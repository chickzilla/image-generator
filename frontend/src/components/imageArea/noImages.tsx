import { Brush } from "lucide-react";

export default function NoImages() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Brush className="w-30 h-30 mb-4 text-blue opacity-65" />
      <p className="text-gray">Your generated images will be shown up here.</p>
    </div>
  );
}
