import { useEffect, useRef } from "react";
import { promptHistory } from "@/types";
import { ResultCard } from "./resultCard";

interface ShowResultProps {
  historyItems: promptHistory[];
}

export default function ShowResult({ historyItems }: ShowResultProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [historyItems]);

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
      </div>
    </div>
  );
}
