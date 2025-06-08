import { useEffect, useRef } from "react";
import { promptHistory } from "@/types";
import { ResultCard } from "./resultCard";
import { Skeleton } from "../ui/skeleton";

interface ShowResultProps {
  historyItems: promptHistory[];
  isGenerating: boolean;
}

export default function ShowResult({
  historyItems,
  isGenerating,
}: ShowResultProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [historyItems, isGenerating]);

  return (
    <div className="flex flex-col gap-6 p-8 h-full pb-[120px]">
      <div ref={containerRef} className="overflow-y-auto h-full space-y-10">
        {historyItems?.map((item, index) => (
          <ResultCard
            key={index}
            prompt={item.prompt}
            negativePrompt={item.negativePrompt}
            results={item.results}
          />
        ))}

        {isGenerating && (
          <div className="rounded-lg border shadow p-4 space-y-4 w-full animate-pulse">
            <div className="flex justify-between items-start">
              <Skeleton className="h-6 w-3/4 bg-gray" />
              <Skeleton className="h-6 w-6 bg-gray" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <Skeleton
                    key={i}
                    className="aspect-square w-full rounded bg-gray"
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
