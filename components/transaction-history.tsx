"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface TransactionHistoryProps {
  address: string | undefined
}

export default function TransactionHistory({ address }: TransactionHistoryProps) {
  const mockTransactions = [
    {
      id: "1",
      type: "save",
      amount: "1000",
      date: "2024-12-27",
      status: "confirmed",
    },
    {
      id: "2",
      type: "yield",
      amount: "4.20",
      date: "2024-12-26",
      status: "confirmed",
    },
    {
      id: "3",
      type: "save",
      amount: "500",
      date: "2024-12-25",
      status: "confirmed",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Your savings and yield history</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockTransactions.length > 0 ? (
            mockTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-card/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-lg">
                    {tx.type === "save" ? "💾" : "📈"}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground capitalize">
                      {tx.type === "save" ? "Saved to Jar" : "Yield Earned"}
                    </p>
                    <p className="text-sm text-muted-foreground">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">${tx.amount}</p>
                  <p className="text-xs text-accent">Confirmed</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No transactions yet</p>
              <p className="text-sm text-muted-foreground mt-1">Start saving to see your transaction history</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
