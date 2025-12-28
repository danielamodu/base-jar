"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface SaveFormProps {
  address: string | undefined
}

export default function SaveForm({ address }: SaveFormProps) {
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    if (!amount || !address) return
    setIsLoading(true)
    try {
      // Contract interaction logic will go here
      console.log("Saving", amount, "USDC to BaseJar")
      // Simulate transaction
      await new Promise((resolve) => setTimeout(resolve, 2000))
    } catch (error) {
      console.error("Error saving:", error)
    } finally {
      setIsLoading(false)
      setAmount("")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Save to Jar</CardTitle>
        <CardDescription>Deposit USDC to start earning yield through Aave</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount (USDC)</Label>
          <div className="flex gap-2">
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline">Max</Button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Expected Daily Yield</span>
            <span className="font-semibold text-accent">
              ${((Number.parseFloat(amount || "0") * 0.042) / 365).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Network Fee</span>
            <span className="font-semibold">≈ $0.50</span>
          </div>
          <div className="h-px bg-border" />
          <div className="flex justify-between">
            <span className="font-semibold">Total</span>
            <span className="text-lg font-bold text-primary">
              ${(Number.parseFloat(amount || "0") + 0.5).toFixed(2)}
            </span>
          </div>
        </div>

        <Button className="w-full" size="lg" onClick={handleSave} disabled={!amount || isLoading}>
          {isLoading ? "Processing..." : "💰 Save to Jar"}
        </Button>

        <div className="text-xs text-muted-foreground bg-muted/20 p-3 rounded-lg">
          <p className="font-semibold mb-1">How it works:</p>
          <ol className="space-y-1 list-decimal list-inside">
            <li>Approve USDC spending</li>
            <li>Deposit funds to contract</li>
            <li>Funds sent to Aave for yield</li>
            <li>Earn 4.2% APY daily</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  )
}
