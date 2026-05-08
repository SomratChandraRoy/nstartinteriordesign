import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout({ children }) {
  useEffect(() => {
    // Preload hero LCP image
    const id = "hero-preload";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "preload";
      link.as = "image";
      link.href =
        "https://raw.createusercontent.com/00785d2e-5b6d-4334-8dc5-4085206756a8/";
      document.head.appendChild(link);
    }
    // Set base meta defaults
    document.documentElement.lang = "en";
  }, []);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
