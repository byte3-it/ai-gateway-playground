"use client";

import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000, // 5 minutes
    },
  },
});

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster position="top-center" />
      {/* <ReactQueryDevtools buttonPosition="bottom-right" initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
