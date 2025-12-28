"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatUnits } from "viem"

interface PortfolioOverviewProps {
  jarBalance: bigint | undefined
  usdcBalance: any
  chain: string | undefined
}

export default function PortfolioOverview({ jarBalance, usdcBalance, chain }: PortfolioOverviewProps) {
  const formattedJarBalance = jarBalance ? Number.parseFloat(formatUnits(jarBalance, 6)).toFixed(2) : "0.00"
  const formattedUsdcBalance = usdcBalance?.value
    ? Number.parseFloat(formatUnits(usdcBalance.value, usdcBalance.decimals)).toFixed(2)
    : "0.00"

  const totalValue = (Number.parseFloat(formattedJarBalance) + Number.parseFloat(formattedUsdcBalance)).toFixed(2)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
        <CardHeader>
          <CardDescription>Jar Balance</CardDescription>
          <CardTitle className="text-3xl mt-2">${formattedJarBalance}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Earning 4.2% APY on Aave</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-accent/10 to-secondary/10 border-accent/30">
        <CardHeader>
          <CardDescription>Available USDC</CardDescription>
          <CardTitle className="text-3xl mt-2">${formattedUsdcBalance}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Ready to save</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-chart-5/10 to-chart-4/10 border-chart-5/30">
        <CardHeader>
          <CardDescription>Total Portfolio</CardDescription>
          <CardTitle className="text-3xl mt-2">${totalValue}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{chain ? `Connected to ${chain}` : "Select a network"}</p>
        </CardContent>
      </Card>
    </div>
  )
}
