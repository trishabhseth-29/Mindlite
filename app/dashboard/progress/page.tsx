"use client"

import { useEffect, useState } from "react"
import { ProgressChart } from "@/components/progress-chart"
import { TrendingUp, TrendingDown, Minus, Brain, Target, Clock, Calendar } from "lucide-react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"

interface Score {
  id: number
  game: string
  score: number
  created_at: string
}

const gameIcons: Record<string, React.ElementType> = {
  "memory-match": Brain,
  "number-recall": Target,
  "word-recall": Clock,
}

export default function ProgressPage() {
  const [scores, setScores] = useState<Score[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      fetchScores(parsedUser.user_id)
    }
  }, [])

  const fetchScores = async (userId: number) => {
    try {
      const res = await fetch(`${API_URL}/scores/${userId}`)
      const data = await res.json()
      setScores(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Failed to fetch scores:", error)
    } finally {
      setLoading(false)
    }
  }

  const getScoresByGame = () => {
    const grouped: Record<string, Score[]> = {}
    scores.forEach((score) => {
      if (!grouped[score.game]) {
        grouped[score.game] = []
      }
      grouped[score.game].push(score)
    })
    return grouped
  }

  const getTrend = (gameScores: Score[]) => {
    if (gameScores.length < 2) return { direction: "stable", percentage: 0 }
    const recent = gameScores.slice(-5)
    const older = gameScores.slice(-10, -5)
    
    if (older.length === 0) return { direction: "stable", percentage: 0 }
    
    const recentAvg = recent.reduce((a, b) => a + b.score, 0) / recent.length
    const olderAvg = older.reduce((a, b) => a + b.score, 0) / older.length
    
    const change = ((recentAvg - olderAvg) / olderAvg) * 100
    
    if (Math.abs(change) < 5) return { direction: "stable", percentage: 0 }
    return {
      direction: change > 0 ? "up" : "down",
      percentage: Math.abs(Math.round(change)),
    }
  }

  const formatGameName = (id: string) => {
    return id.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
  }

  const scoresByGame = getScoresByGame()

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Progress Tracking</h1>
        <p className="mt-1 text-muted-foreground">
          Monitor your cognitive performance over time and track improvements.
        </p>
      </div>

      {/* Overall progress chart */}
      <div className="p-6 bg-card rounded-2xl border border-border mb-8">
        <h2 className="text-xl font-semibold text-foreground mb-6">Overall Performance</h2>
        <ProgressChart scores={scores} loading={loading} />
      </div>

      {/* Game-specific stats */}
      <h2 className="text-xl font-semibold text-foreground mb-4">Performance by Game</h2>
      
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      ) : Object.keys(scoresByGame).length === 0 ? (
        <div className="p-8 bg-card rounded-2xl border border-border text-center">
          <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg font-medium text-foreground">No games played yet</p>
          <p className="text-muted-foreground">Start playing to see your progress here</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(scoresByGame).map(([game, gameScores]) => {
            const trend = getTrend(gameScores)
            const avgScore = Math.round((gameScores.reduce((a, b) => a + b.score, 0) / gameScores.length) * 10) / 10
            const bestScore = Math.max(...gameScores.map((s) => s.score))
            const Icon = gameIcons[game] || Brain

            return (
              <div key={game} className="p-6 bg-card rounded-2xl border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{formatGameName(game)}</h3>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Average</span>
                    <span className="font-semibold text-foreground">{avgScore}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Best</span>
                    <span className="font-semibold text-foreground">{bestScore}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Games Played</span>
                    <span className="font-semibold text-foreground">{gameScores.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Trend</span>
                    <span className={`flex items-center gap-1 font-semibold ${
                      trend.direction === "up" ? "text-success" :
                      trend.direction === "down" ? "text-destructive" :
                      "text-muted-foreground"
                    }`}>
                      {trend.direction === "up" && <TrendingUp className="w-4 h-4" />}
                      {trend.direction === "down" && <TrendingDown className="w-4 h-4" />}
                      {trend.direction === "stable" && <Minus className="w-4 h-4" />}
                      {trend.percentage > 0 ? `${trend.percentage}%` : "Stable"}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
