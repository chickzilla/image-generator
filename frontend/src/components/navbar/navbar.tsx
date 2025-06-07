import { Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200 bg-white px-6 py-3 shadow-sm">
      <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
        <Sparkles className="h-6 w-6 text-blue" />

        <span className="font-bold text-black">IMAGELY</span>
        <span className="text-blue">AI</span>
      </div>
    </nav>
  );
}
