"use client"

import { useState } from "react"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export const ReactQueryClientProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const fiveMinutesInMs = 5 * 60 * 1000

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: true,
            retry: 1,
            retryDelay: 1000,
            staleTime: fiveMinutesInMs,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
