"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { WagmiProvider } from "wagmi"
import { base, baseSepolia, mainnet, polygon } from "wagmi/chains"
import { createConfig, http } from "wagmi"
import { injected, walletConnect } from "wagmi/connectors"
import { RainbowKitProvider } from "@rainbow-me/rainbowkit"
import type { ReactNode } from "react"

const config = createConfig({
  chains: [baseSepolia, base, mainnet, polygon],
  connectors: [
    injected(),
    walletConnect({
      projectId: "1586e06e2bb4ca5b2797983ad4a0b008",
    }),
  ],
  transports: {
    [baseSepolia.id]: http(),
    [base.id]: http(),
    [mainnet.id]: http(),
    [polygon.id]: http(),
  },
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
})

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
