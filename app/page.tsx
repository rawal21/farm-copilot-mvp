"use client"

import { useState } from "react"
import { Sprout } from "lucide-react"
import FarmProfileSetup from "@/components/farm-profile-setup"
import CropPlanSelection from "@/components/crop-plan-selection"
import WeeklyGuidanceFeed from "@/components/weekly-guidance-feed"
import PestDetection from "@/components/pest-detection"
import MarketAdvice from "@/components/market-advice"

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState<"setup" | "plan" | "guidance" | "pest" | "market">("setup")
  const [farmData, setFarmData] = useState<any>(null)
  const [selectedPlan, setSelectedPlan] = useState<any>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Sprout className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-primary">Farm Copilot</h1>
          </div>
          <p className="text-sm text-muted-foreground">MVP Demo</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {currentStep === "setup" && (
          <div className="animate-slide-in">
            <FarmProfileSetup
              onComplete={(data) => {
                setFarmData(data)
                setCurrentStep("plan")
              }}
            />
          </div>
        )}

        {currentStep === "plan" && farmData && (
          <div className="animate-slide-in">
            <CropPlanSelection
              farmData={farmData}
              onSelectPlan={(plan) => {
                setSelectedPlan(plan)
                setCurrentStep("guidance")
              }}
              onBack={() => setCurrentStep("setup")}
            />
          </div>
        )}

        {currentStep === "guidance" && farmData && selectedPlan && (
          <div className="animate-slide-in">
            <WeeklyGuidanceFeed
              farmData={farmData}
              selectedPlan={selectedPlan}
              onNextStep={() => setCurrentStep("pest")}
              onBack={() => setCurrentStep("plan")}
            />
          </div>
        )}

        {currentStep === "pest" && farmData && (
          <div className="animate-slide-in">
            <PestDetection
              farmData={farmData}
              onNextStep={() => setCurrentStep("market")}
              onBack={() => setCurrentStep("guidance")}
            />
          </div>
        )}

        {currentStep === "market" && farmData && selectedPlan && (
          <div className="animate-slide-in">
            <MarketAdvice farmData={farmData} selectedPlan={selectedPlan} onBack={() => setCurrentStep("pest")} />
          </div>
        )}
      </main>
    </div>
  )
}
