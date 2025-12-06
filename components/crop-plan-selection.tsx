"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, TrendingUp, Zap } from "lucide-react"

interface CropPlanSelectionProps {
  farmData: any
  onSelectPlan: (plan: any) => void
  onBack: () => void
}

export default function CropPlanSelection({ farmData, onSelectPlan, onBack }: CropPlanSelectionProps) {
  const [selectedPlan, setSelectedPlan] = useState<"plan1" | "plan2" | null>(null)

  const plan1 = {
    id: "plan1",
    name: "Traditional Mix",
    crops: ["Sugarcane (2 acres)", "Cotton (2 acres)", "Groundnut (1 acre)"],
    seedCost: "₹12,500",
    expectedYield: "₹2,80,000",
    riskScore: "Low",
    riskLevel: 2,
    harvestTime: "150-180 days",
    description: "Proven crop combination with stable market demand",
  }

  const plan2 = {
    id: "plan2",
    name: "High-Value Strategy",
    crops: ["Sugarcane (3 acres)", "Turmeric (2 acres)"],
    seedCost: "₹15,000",
    expectedYield: "₹3,80,000",
    riskScore: "Medium",
    riskLevel: 5,
    harvestTime: "180-210 days",
    description: "Higher yield potential with better market prices",
  }

  const handleSelectPlan = (plan: any) => {
    setSelectedPlan(plan.id)
    setTimeout(() => {
      onSelectPlan(plan)
    }, 600)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-primary">Select Your Crop Plan</h2>
        <p className="text-muted-foreground">
          Choose a plan based on your farm size ({farmData.acres} acres) and budget ({farmData.budget})
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Plan 1 */}
        <Card
          className={`cursor-pointer transition-all duration-300 border-2 ${
            selectedPlan === "plan1"
              ? "border-primary shadow-lg scale-105"
              : "border-border hover:border-primary/50 hover:shadow-md"
          }`}
          onClick={() => handleSelectPlan(plan1)}
        >
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  {plan1.name}
                </CardTitle>
                <CardDescription>{plan1.description}</CardDescription>
              </div>
              {selectedPlan === "plan1" && (
                <div className="bg-primary text-primary-foreground rounded-full p-1 animate-slide-in-left">
                  <Check className="w-5 h-5" />
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm mb-2">Crops to Plant:</h4>
              <ul className="space-y-1">
                {plan1.crops.map((crop, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    {crop}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-primary/5 p-3 rounded-lg border border-primary/20">
                <p className="text-muted-foreground text-xs">Seed Cost</p>
                <p className="font-bold text-primary">{plan1.seedCost}</p>
              </div>
              <div className="bg-secondary/5 p-3 rounded-lg border border-secondary/20">
                <p className="text-muted-foreground text-xs">Est. Yield</p>
                <p className="font-bold text-secondary">{plan1.expectedYield}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Risk Level</span>
                <span className="text-sm font-bold text-primary">{plan1.riskScore}</span>
              </div>
              <div className="flex gap-1">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full ${i < plan1.riskLevel ? "bg-accent" : "bg-muted"}`}
                  ></div>
                ))}
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              <span className="font-medium">Harvest Time:</span> {plan1.harvestTime}
            </div>
          </CardContent>
        </Card>

        {/* Plan 2 */}
        <Card
          className={`cursor-pointer transition-all duration-300 border-2 ${
            selectedPlan === "plan2"
              ? "border-primary shadow-lg scale-105"
              : "border-border hover:border-primary/50 hover:shadow-md"
          }`}
          onClick={() => handleSelectPlan(plan2)}
        >
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-accent" />
                  {plan2.name}
                </CardTitle>
                <CardDescription>{plan2.description}</CardDescription>
              </div>
              {selectedPlan === "plan2" && (
                <div className="bg-primary text-primary-foreground rounded-full p-1 animate-slide-in-left">
                  <Check className="w-5 h-5" />
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm mb-2">Crops to Plant:</h4>
              <ul className="space-y-1">
                {plan2.crops.map((crop, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    {crop}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-accent/5 p-3 rounded-lg border border-accent/20">
                <p className="text-muted-foreground text-xs">Seed Cost</p>
                <p className="font-bold text-accent">{plan2.seedCost}</p>
              </div>
              <div className="bg-secondary/5 p-3 rounded-lg border border-secondary/20">
                <p className="text-muted-foreground text-xs">Est. Yield</p>
                <p className="font-bold text-secondary">{plan2.expectedYield}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Risk Level</span>
                <span className="text-sm font-bold text-accent">{plan2.riskScore}</span>
              </div>
              <div className="flex gap-1">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full ${i < plan2.riskLevel ? "bg-accent" : "bg-muted"}`}
                  ></div>
                ))}
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              <span className="font-medium">Harvest Time:</span> {plan2.harvestTime}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-3 justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          onClick={() => selectedPlan && handleSelectPlan(selectedPlan === "plan1" ? plan1 : plan2)}
          disabled={!selectedPlan}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Confirm Plan
        </Button>
      </div>
    </div>
  )
}
