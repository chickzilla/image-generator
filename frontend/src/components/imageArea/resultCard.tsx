"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";

interface ResultCardProps {
  prompt: string;
  negativePrompt?: string;
  results: string[];
}

export function ResultCard({
  prompt,
  negativePrompt,
  results,
}: ResultCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-lg border bg-white shadow p-4 space-y-4 w-full">
      <div className="flex items-start justify-between">
        {!expanded ? (
          <div className="text-base font-bold text-black w-[80%] truncate whitespace-nowrap">
            {prompt}
          </div>
        ) : (
          <div className="text-base text-black w-[80%] truncate"> </div>
        )}

        <button
          className="flex items-center gap-1 text-lg text-blue hover:underline hover:cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>

      {expanded && (
        <div className="border-b space-y-5 pb-3">
          <div className="text-md text-black font-semibold">Image Prompt</div>
          <div className="text-sm text-black italic">{prompt}</div>
        </div>
      )}
      {expanded && negativePrompt && (
        <div className="border-b space-y-5 pb-3">
          <div className="text-md text-gray font-semibold">Negative Prompt</div>
          <div className="text-sm text-gray italic">{negativePrompt}</div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {results.map((url, i) => (
          <div
            key={i}
            className="aspect-square relative rounded overflow-hidden"
          >
            <Image
              src={url}
              alt={`Generated image ${i + 1}`}
              fill
              className="object-cover rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
