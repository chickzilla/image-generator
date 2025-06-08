"use client";
import { useEffect, useState } from "react";
import ShowResult from "./showResult";
import promptHistory from "@/services/promptHistory";
import { toast } from "../ui/use-toast";
import { promptHistory as promptHistoryType } from "@/types";
import NoImages from "./noImages";

interface ImageAreaProps {
  isGenerating: boolean;
}
export default function ImageArea({ isGenerating }: ImageAreaProps) {
  const [historyItems, setHistoryItems] = useState<promptHistoryType[]>([]);
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await promptHistory();
        setHistoryItems(response?.items || []);
      } catch (error) {
        if (error instanceof Error) {
          toast({
            title: "Error",
            description: error?.message,
            isError: true,
          });
        }
      }
    };
    fetchHistory();
  }, []);

  if (historyItems?.length === 0) {
    return <NoImages />;
  }
  return <ShowResult historyItems={historyItems} isGenerating={isGenerating} />;
}
