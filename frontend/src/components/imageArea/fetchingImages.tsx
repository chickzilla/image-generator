import { Brush } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function FetchingImages() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-spin text-gray w-40 h-40"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
      <p className="text-gray mt-5">Fetching beautifully generated images...</p>
    </div>
  );
}
