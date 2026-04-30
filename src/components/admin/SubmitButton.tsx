"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

export function SubmitButton({ 
  children, 
  loadingText = "İşleniyor...", 
  className = "w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg transition-colors mt-4"
}: { 
  children: ReactNode; 
  loadingText?: string;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className={`${className} disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center`}
    >
      {pending ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
}
