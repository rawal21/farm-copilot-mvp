"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CloudRain, Droplet, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react"

interface WeeklyGuidanceFeedProps {
  farmData: any
  selectedPlan: any
  onNextStep: () => void
  onBack: () => void
}

export default function WeeklyGuidanceFeed({ farmData, selectedPlan, onNextStep, onBack }: WeeklyGuidanceFeedProps) {
  const [expandedWeek, setExpandedWeek] = useState(0)

  const weeklyGuidance = [
    {
      week: 1,
      title: "Soil Preparation Week",
      status: "completed",
      guidance: [
        {
          type: "irrigation",
          message: "Rain expected in 3-4 days. Prepare field for sowing in next 2-day window.",
          icon: CloudRain,
          color: "text-blue-500",
        },
        {
          type: "action",
          message: "Apply 2-3 tons organic manure per acre for sugarcane",
          icon: CheckCircle,
          color: "text-primary",
        },
      ],
    },
    {
      week: 2,
      title: "Sowing & Germination",
      status: "active",
      guidance: [
        {
          type: "irrigation",
          message: "No irrigation this week. Natural rain will suffice.",
          icon: Droplet,
          color: "text-primary",
        },
        {
          type: "action",
          message: "Monitor field for weeds. Light weeding if required.",
          icon: CheckCircle,
          color: "text-primary",
        },
      ],
    },
    {
      week: 3,
      title: "Growth Monitoring",
      status: "upcoming",
      guidance: [
        {
          type: "irrigation",
          message: "Irrigate 4 hours on Wednesday morning. Moisture critical now.",
          icon: Droplet,
          color: "text-accent",
        },
        {
          type: "alert",
          message: "Watch for early shoot borer. Apply neem spray if spotted.",
          icon: AlertTriangle,
          color: "text-accent",
        },
      ],
    },
    {
      week: 4,
      title: "Pest Prevention",
      status: "upcoming",
      guidance: [
        {
          type: "action",
          message: "Schedule field inspection for leaf roller pests",
          icon: CheckCircle,
          color: "text-primary",
        },
        {
          type: "irrigation",
          message: "Standard irrigation schedule: Every 7-10 days",
          icon: Droplet,
          color: "text-primary",
        },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-primary">Weekly Guidance</h2>
        <p className="text-muted-foreground">
          {selectedPlan.name} plan for {farmData.crops} - {selectedPlan.harvestTime}
        </p>
      </div>

      {/* Timeline */}
      <div className="space-y-3">
        {weeklyGuidance.map((week, idx) => {
          const IconComponent = week.guidance[0]?.icon || CloudRain
          const isActive = expandedWeek === idx

          return (
            <Card
              key={idx}
              className={`cursor-pointer transition-all duration-300 border-2 ${
                isActive ? "border-primary shadow-lg" : week.status === "active" ? "border-primary/50" : "border-border"
              }`}
              onClick={() => setExpandedWeek(isActive ? -1 : idx)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        week.status === "completed"
                          ? "bg-primary/20"
                          : week.status === "active"
                            ? "bg-accent/20"
                            : "bg-muted"
                      }`}
                    >
                      <span
                        className={`font-bold ${
                          week.status === "completed"
                            ? "text-primary"
                            : week.status === "active"
                              ? "text-accent"
                              : "text-muted-foreground"
                        }`}
                      >
                        W{week.week}
                      </span>
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{week.title}</CardTitle>
                      <p
                        className={`text-sm mt-1 ${
                          week.status === "active" ? "text-accent font-semibold" : "text-muted-foreground"
                        }`}
                      >
                        {week.status === "completed" && "Completed"}
                        {week.status === "active" && "Current Week"}
                        {week.status === "upcoming" && "Upcoming"}
                      </p>
                    </div>
                  </div>
                  <div className={`transition-transform duration-300 ${isActive ? "rotate-180" : ""}`}>
                    <ArrowRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
              </CardHeader>

              {isActive && (
                <CardContent className="space-y-3 animate-slide-in">
                  {week.guidance.map((item, itemIdx) => {
                    const Icon = item.icon
                    return (
                      <div key={itemIdx} className="flex gap-3 p-3 bg-muted/50 rounded-lg">
                        <Icon className={`w-5 h-5 ${item.color} flex-shrink-0 mt-0.5`} />
                        <p className="text-sm text-foreground">{item.message}</p>
                      </div>
                    )
                  })}
                </CardContent>
              )}
            </Card>
          )
        })}
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <p className="text-sm text-foreground">
          <span className="font-semibold">Next Alert:</span> Week 3 - Pest monitoring required. We'll send you a
          WhatsApp reminder 2 days before.
        </p>
      </div>

      <div className="flex gap-3 justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNextStep} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          Continue to Pest Detection
        </Button>
      </div>
    </div>
  )
}
