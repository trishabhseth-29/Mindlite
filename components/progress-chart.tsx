"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface Score {
  id: number
  game: string
  score: number
  created_at: string
}

interface ProgressChartProps {
  scores: Score[]
  loading: boolean
}

export function ProgressChart({ scores, loading }: ProgressChartProps) {
  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  if (scores.length === 0) {
    return (
      <div className="h-64 flex flex-col items-center justify-center text-muted-foreground">
        <p className="text-lg font-medium">No data yet</p>
        <p className="text-sm">Play some games to see your progress</p>
      </div>
    )
  }

  // Group scores by date and calculate daily average
  const groupedData = scores.reduce((acc, score) => {
    const date = new Date(score.created_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
    if (!acc[date]) {
      acc[date] = { total: 0, count: 0 }
    }
    acc[date].total += score.score
    acc[date].count++
    return acc
  }, {} as Record<string, { total: number; count: number }>)

  const chartData = Object.entries(groupedData)
    .map(([date, { total, count }]) => ({
      date,
      score: Math.round((total / count) * 10) / 10,
    }))
    .slice(-14) // Last 14 days

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            className="text-muted-foreground"
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 12 }}
            className="text-muted-foreground"
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "0.75rem",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
            labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
            itemStyle={{ color: "hsl(var(--primary))" }}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={{ fill: "hsl(var(--primary))", strokeWidth: 0, r: 4 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
