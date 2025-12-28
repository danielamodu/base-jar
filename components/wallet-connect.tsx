"use client"

import { useAccount, useConnect, useDisconnect } from "wagmi"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function WalletConnect() {
  const { address, isConnected } = useAccount()
  const { connectors, connect } = useConnect()
  const { disconnect } = useDisconnect()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <div className="px-3 py-2 rounded-lg bg-secondary/20 border border-border">
          <p className="text-sm font-mono text-foreground">
            {address.slice(0, 6)}...{address.slice(-4)}
          </p>
        </div>
        <Button variant="outline" onClick={() => disconnect()}>
          Disconnect
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap gap-2">
      {connectors.map((connector) => (
        <Button key={connector.uid} onClick={() => connect({ connector })} variant="default">
          Connect {connector.name}
        </Button>
      ))}
    </div>
  )
}
