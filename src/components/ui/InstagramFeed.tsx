"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export function InstagramFeed() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Yüklenirken gösterilecek şık animasyon (Skeleton)
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="aspect-square rounded-xl bg-slate-200 animate-pulse"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full relative min-h-[300px]">
      <div className="elfsight-app-f7e08264-aa14-4c0d-88e5-b414f4b1ed0c" data-elfsight-app-lazy></div>
      
      {/* Elfsight Script'i (Sadece bu bileşen yüklendiğinde çalışır) */}
      <Script 
        src="https://elfsightcdn.com/platform.js" 
        strategy="lazyOnload"
      />
    </div>
  );
}
