"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollToTop({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Control scroll restoration ourselves
  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);

  // Scroll to top whenever the route changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return <>{children}</>;
}

