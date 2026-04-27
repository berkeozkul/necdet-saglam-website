"use client";

import { FormEvent, ReactNode } from "react";

export function DeleteForm({ 
  action, 
  children,
  message = "Bu öğeyi kalıcı olarak silmek istediğinize emin misiniz?",
  className = ""
}: { 
  action: (payload: FormData) => void | Promise<void>; 
  children: ReactNode;
  message?: string;
  className?: string;
}) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!window.confirm(message)) {
      e.preventDefault();
    }
  };

  return (
    <form action={action} onSubmit={handleSubmit} className={className}>
      {children}
    </form>
  );
}
