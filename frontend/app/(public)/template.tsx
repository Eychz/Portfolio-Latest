import React from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-700 ease-out">
      {children}
    </div>
  );
}
