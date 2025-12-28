"use client"

import { useState, useEffect } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { parseUnits, formatUnits } from "viem"

// --- CONFIG ---
const BASE_JAR_ADDRESS = "0x62a4268dFf68ec7Fcc95EAB1De6EBC55A6Edf6df"
const USDC_ADDRESS = "0xba50cd2a20f6da35d788639e581bca8d0b5d4d5f"

// --- ABI ---
const BASE_JAR_ABI = [
  { inputs: [{ name: "_user", type: "address" }], name: "userBalances", outputs: [{ name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  { inputs: [{ name: "_user", type: "address" }, { name: "_amount", type: "uint256" }], name: "dailySave", outputs: [], stateMutability: "nonpayable", type: "function" },
  { inputs: [], name: "smashJar", outputs: [], stateMutability: "nonpayable", type: "function" }
] as const

const USDC_ABI = [
  { inputs: [{ name: "spender", type: "address" }, { name: "amount", type: "uint256" }], name: "approve", outputs: [{ name: "", type: "bool" }], stateMutability: "nonpayable", type: "function" },
  { inputs: [{ name: "owner", type: "address" }, { name: "spender", type: "address" }], name: "allowance", outputs: [{ name: "", type: "uint256" }], stateMutability: "view", type: "function" }
] as const

export default function Home() {
  const { address, isConnected } = useAccount()
  const [isMounted, setIsMounted] = useState(false)
  const [saveAmount, setSaveAmount] = useState("5")

  const { data: balanceData, refetch: refetchBalance } = useReadContract({
    address: BASE_JAR_ADDRESS,
    abi: BASE_JAR_ABI,
    functionName: "userBalances",
    args: address ? [address] : undefined,
  })

  const { data: allowanceData, refetch: refetchAllowance } = useReadContract({
    address: USDC_ADDRESS,
    abi: USDC_ABI,
    functionName: "allowance",
    args: address ? [address, BASE_JAR_ADDRESS] : undefined,
  })

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  useEffect(() => {
    setIsMounted(true)
    if (isConfirmed) {
      const timer = setTimeout(() => {
        refetchBalance()
        refetchAllowance()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isConfirmed, refetchBalance, refetchAllowance])

  if (!isMounted) return null

  const currentAllowance = allowanceData ? formatUnits(allowanceData, 6) : "0"
  const isApproved = parseFloat(currentAllowance) >= parseFloat(saveAmount || "0")
  const displayBalance = balanceData ? formatUnits(balanceData, 6) : "0.00"

  const handleMainAction = () => {
    if (!address) return
    if (!isApproved) {
      writeContract({
        address: USDC_ADDRESS,
        abi: USDC_ABI,
        functionName: "approve",
        args: [BASE_JAR_ADDRESS, parseUnits("1000000", 6)],
      })
    } else {
      writeContract({
        address: BASE_JAR_ADDRESS,
        abi: BASE_JAR_ABI,
        functionName: "dailySave",
        args: [address, parseUnits(saveAmount, 6)],
      })
    }
  }

  const handleSmash = () => {
    writeContract({
      address: BASE_JAR_ADDRESS,
      abi: BASE_JAR_ABI,
      functionName: "smashJar",
    })
  }

  return (
    // Note the "font-sans" here, which now links to our new Inter font
    <main className="min-h-screen bg-[#030712] text-white relative overflow-hidden font-sans selection:bg-blue-500 selection:text-white">

      {/* Background Gradients */}
      <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* --- NAV BAR --- */}
      <nav className="relative z-10 flex justify-between items-center px-6 py-6 max-w-5xl mx-auto">
        <div className="flex items-center gap-3">
          {/* LOGO UPDATE: This now uses your uploaded image */}
          <img
            src="/logo-full.png"
            alt="BaseJar"
            className="h-10 w-auto object-contain"
          />
        </div>
        <ConnectButton showBalance={false} accountStatus="address" chainStatus="icon" />
      </nav>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 max-w-xl mx-auto mt-16 px-6 pb-20">

        {/* Total Saved Card */}
        <div className="relative group mb-8">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative bg-zinc-900/40 backdrop-blur-2xl border border-white/10 p-10 rounded-3xl text-center shadow-2xl">
            <p className="text-zinc-400 text-sm font-medium uppercase tracking-wider mb-2 font-mono">Total Saved</p>

            {/* Using the new Space Grotesk Font for the big number */}
            <h1 className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 tracking-tighter font-[family-name:var(--font-space)]">
              ${displayBalance}
            </h1>

            <div className="mt-5 flex justify-center gap-2 items-center text-emerald-400 bg-emerald-500/10 py-1.5 px-4 rounded-full mx-auto w-fit text-sm border border-emerald-500/20 font-medium">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-[pulse_3s_ease-in-out_infinite]" />
              Strategy: Aave V3 Lending (~4.5% APY)
            </div>
          </div>
        </div>

        {/* Status Messages */}
        <div className="mb-6 flex justify-center h-6 font-mono">
          {isPending && <p className="text-yellow-400 animate-pulse text-xs uppercase tracking-widest">Processing...</p>}
          {isConfirming && <p className="text-blue-400 animate-pulse text-xs uppercase tracking-widest">Confirming on Base...</p>}
          {isConfirmed && <p className="text-emerald-400 text-xs uppercase tracking-widest">Success! Funds Deposited.</p>}
        </div>

        {/* Action Card */}
        <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 p-8 rounded-3xl shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-white font-[family-name:var(--font-space)]">Add to Jar</h3>
            <div className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded border font-mono ${isApproved ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/10" : "text-zinc-500 border-white/5 bg-white/5"}`}>
              {isApproved ? "Access Granted" : "Approval Needed"}
            </div>
          </div>

          <div className="relative mb-6">
            <span className="absolute left-0 top-1 text-2xl text-zinc-500 font-[family-name:var(--font-space)]">$</span>
            <input
              type="number"
              value={saveAmount}
              onChange={(e) => setSaveAmount(e.target.value)}
              className="w-full bg-transparent border-b-2 border-white/10 focus:border-blue-500 outline-none text-white text-5xl pl-6 pb-2 placeholder-zinc-700 transition-colors font-[family-name:var(--font-space)]"
              placeholder="0.00"
            />
          </div>

          <button
            onClick={handleMainAction}
            disabled={!isConnected || isPending || !saveAmount}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all active:scale-[0.98] shadow-lg font-[family-name:var(--font-space)] ${isApproved
                ? "bg-[#0052FF] hover:bg-blue-600 text-white shadow-blue-500/25"
                : "bg-white text-black hover:bg-zinc-200"
              }`}
          >
            {isPending ? "Processing..." : isApproved ? `Save $${saveAmount} Now` : "Enable BaseJar"}
          </button>
        </div>

        {/* Smash Button */}
        <div className="mt-8">
          <button
            onClick={handleSmash}
            disabled={!isConnected || isPending}
            className="w-full py-4 bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 text-red-400/60 hover:text-red-400 rounded-2xl transition-all text-sm font-medium uppercase tracking-widest font-mono"
          >
            Smash Jar & Withdraw All
          </button>
        </div>

        <div className="mt-12 text-center text-zinc-600 text-xs font-mono">
          <p>Built on Base 🔵 | Vibecoded by 0xYou</p>
        </div>
      </div>
    </main>
  )
}