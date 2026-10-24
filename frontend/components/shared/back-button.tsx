"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton({ label = "Back" }: { label?: string }) {
  const router = useRouter();

  return (
    <button 
      onClick={(e) => {
        e.preventDefault();
        router.back();
      }} 
      className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 appearance-none bg-transparent outline-none cursor-pointer"
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </button>
  );
}
