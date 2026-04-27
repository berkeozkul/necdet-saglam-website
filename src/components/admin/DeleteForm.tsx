"use client";

import { ReactNode, useState, useRef, useTransition } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";

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
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const handleConfirm = () => {
    startTransition(async () => {
      if (formRef.current) {
        await action(new FormData(formRef.current));
      }
      setIsOpen(false);
    });
  };

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit} className={className}>
        {children}
      </form>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-8">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-red-50 text-red-500 mx-auto mb-6 shadow-sm border border-red-100">
                <AlertTriangle className="w-10 h-10" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-center text-slate-900 mb-3">Emin misiniz?</h3>
              <p className="text-center text-slate-500 leading-relaxed">{message}</p>
            </div>
            <div className="bg-slate-50 px-8 py-5 flex gap-3 justify-center sm:justify-end border-t border-slate-100">
              <button 
                type="button" 
                onClick={() => setIsOpen(false)}
                disabled={isPending}
                className="px-6 py-2.5 text-sm text-slate-600 font-bold hover:bg-slate-200 rounded-xl transition-colors disabled:opacity-50"
              >
                İptal
              </button>
              <button 
                type="button" 
                onClick={handleConfirm}
                disabled={isPending}
                className="px-6 py-2.5 text-sm bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-all flex items-center shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Siliniyor...
                  </>
                ) : (
                  "Evet, Sil"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
