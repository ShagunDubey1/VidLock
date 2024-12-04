'use client'

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

interface QueryProviderProps{
  children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  const queryClient = new QueryClient();

  return(
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}