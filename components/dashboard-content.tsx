"use client"

import { useEffect, useState } from "react"
import { useAccount, useBalance, useReadContract } from "wagmi"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import WalletConnect from "./wallet-connect"
import PortfolioOverview from "./portfolio-overview"
import SaveForm from "./save-form"
import TransactionHistory from "./transaction-history"

const BASE_JAR_ADDRESS = "0x62a4268dFf68ec7Fcc95EAB1De6EBC55A6Edf6df"
const USDC_ADDRESS = "0xdd64a06ed92930F3181e2aa23891Edc834F60f85"

const BASE_JAR_ABI = [
  {
    inputs: [
      { internalType: "address", name: "_user", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "dailySave",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "smashJar",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "userBalances",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
]

export default function DashboardContent() {
  const { address, isConnected, chain } = useAccount()
  const [mounted, setMounted] = useState(false)

  // Read user's BaseJar balance
  const { data: jarBalance } = useReadContract({
    address: BASE_JAR_ADDRESS,
    abi: BASE_JAR_ABI,
    functionName: "userBalances",
    args: [address as `0x${string}`],
    enabled: !!address && isConnected,
  })

  // Read user's USDC balance
  const { data: usdcBalance } = useBalance({
    address: address as `0x${string}`,
    token: USDC_ADDRESS,
    enabled: !!address && isConnected,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-lg font-bold text-primary-foreground">🏺</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">BaseJar</h1>
              <p className="text-sm text-muted-foreground">Automated Crypto Savings</p>
            </div>
          </div>
          <WalletConnect />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {!isConnected ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <Card className="w-full max-w-md">
              <CardHeader className="text-center">
                <CardTitle>Connect Your Wallet</CardTitle>
                <CardDescription>Start saving your USDC across multiple blockchains</CardDescription>
              </CardHeader>
              <CardContent>
                <WalletConnect />
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Portfolio Section */}
            <PortfolioOverview jarBalance={jarBalance} usdcBalance={usdcBalance} chain={chain?.name} />

            {/* Main Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Save Form */}
              <div className="lg:col-span-2">
                <SaveForm address={address} />
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Manage your savings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" variant="default">
                    🎯 Set Savings Goal
                  </Button>
                  <Button className="w-full bg-transparent" variant="outline">
                    📊 View Analytics
                  </Button>
                  <Button
                    className="w-full bg-transparent"
                    variant="outline"
                    className="text-destructive border-destructive hover:bg-destructive/10"
                  >
                    💥 Smash Jar
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Tabs Section */}
            <Tabs defaultValue="history" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="history">Transaction History</TabsTrigger>
                <TabsTrigger value="networks">Networks</TabsTrigger>
                <TabsTrigger value="yields">Yield Info</TabsTrigger>
              </TabsList>

              <TabsContent value="history">
                <TransactionHistory address={address} />
              </TabsContent>

              <TabsContent value="networks">
                <Card>
                  <CardHeader>
                    <CardTitle>Multi-Chain Support</CardTitle>
                    <CardDescription>Your BaseJar is available on these networks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {["Base", "Ethereum", "Polygon"].map((network) => (
                        <div
                          key={network}
                          className="p-4 rounded-lg bg-card border border-border hover:border-primary transition-colors"
                        >
                          <p className="font-semibold text-foreground">{network}</p>
                          <p className="text-sm text-muted-foreground">Connected</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="yields">
                <Card>
                  <CardHeader>
                    <CardTitle>Yield Information</CardTitle>
                    <CardDescription>Earn passive income on your savings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 border border-border">
                        <p className="text-sm text-muted-foreground mb-1">Aave Yield APY</p>
                        <p className="text-2xl font-bold text-accent">4.2%</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Your deposits are automatically yielding on Aave. Compound your savings daily!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>
    </div>
  )
}
