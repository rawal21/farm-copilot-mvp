"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Building2, Calendar, MapPin } from "lucide-react"

interface MarketAdviceProps {
  farmData: any
  selectedPlan: any
  onBack: () => void
}

export default function MarketAdvice({ farmData, selectedPlan, onBack }: MarketAdviceProps) {
  const mandiData = [
    {
      name: "Aurangabad Mandi",
      distance: "12 km",
      price: "₹2,850/quintal",
      quality: "A Grade",
      lastUpdate: "2 hours ago",
      advantage: null,
      featured: false,
    },
    {
      name: "Parbhani Mandi",
      distance: "45 km",
      price: "₹3,050/quintal",
      quality: "A+ Grade",
      lastUpdate: "1 hour ago",
      advantage: "₹200/quintal more",
      featured: true,
    },
  ]

  const harvestTips = [
    {
      icon: Calendar,
      title: "Optimal Harvest Window",
      description: "Harvest in early morning (4-6 AM) for best quality and price",
    },
    {
      icon: Building2,
      title: "Mandi Selection",
      description: "Parbhani Mandi offers better rates. Transport cost ~₹1,500 for 5 acres",
    },
    {
      icon: TrendingUp,
      title: "Price Forecast",
      description: "Market trend is stable. Prices expected to hold for next 10-15 days",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-primary">Market Advice - Harvest Time</h2>
        <p className="text-muted-foreground">Best mandi prices and selling strategy for your {farmData.crops}</p>
      </div>

      {/* Mandi Comparison */}
      <div className="grid md:grid-cols-2 gap-6">
        {mandiData.map((mandi, idx) => (
          <Card
            key={idx}
            className={`border-2 transition-all duration-300 ${
              mandi.featured ? "border-secondary shadow-lg bg-secondary/5" : "border-border"
            }`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    {mandi.name}
                  </CardTitle>
                  <CardDescription>{mandi.distance}</CardDescription>
                </div>
                {mandi.featured && (
                  <div className="bg-secondary text-secondary-foreground text-xs font-bold px-2 py-1 rounded">
                    Recommended
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Current Price</span>
                  <span className="text-2xl font-bold text-primary">{mandi.price}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Quality Grade</span>
                  <span className="font-semibold">{mandi.quality}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Updated</span>
                  <span>{mandi.lastUpdate}</span>
                </div>
              </div>

              {mandi.advantage && (
                <div className="bg-secondary/20 border border-secondary/50 p-3 rounded-lg">
                  <p className="text-sm font-semibold text-secondary">Premium: {mandi.advantage}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Potential extra earning: {mandi.advantage === "₹200/quintal more" ? "₹10,000+" : ""}
                  </p>
                </div>
              )}

              <div className="space-y-2 text-sm">
                <p className="font-medium">Expected Earnings (5 acres):</p>
                <p className="text-primary font-bold">₹{mandi.price.includes("3,050") ? "3,80,000" : "2,80,000"}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Harvest Tips */}
      <div className="grid md:grid-cols-3 gap-4">
        {harvestTips.map((tip, idx) => {
          const Icon = tip.icon
          return (
            <Card key={idx} className="border-border/50">
              <CardContent className="pt-6">
                <div className="flex gap-3">
                  <Icon className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-sm">{tip.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{tip.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Summary */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-primary">Recommended Action</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm">
            <span className="font-semibold">1. Harvest Strategy:</span> Plan harvest for next 2-3 weeks (Window closes
            after 20 days)
          </p>
          <p className="text-sm">
            <span className="font-semibold">2. Choose Mandi:</span> Transport to Parbhani Mandi for ₹200/quintal premium
          </p>
          <p className="text-sm">
            <span className="font-semibold">3. Expected Revenue:</span> {selectedPlan.expectedYield} from{" "}
            {selectedPlan.crops}
          </p>
          <p className="text-sm">
            <span className="font-semibold">4. Next Alert:</span> WhatsApp reminder 7 days before optimal harvest window
          </p>
        </CardContent>
      </Card>

      <div className="flex gap-3 justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          onClick={() => alert("Demo complete! In production, this would sync with WhatsApp.")}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Complete Demo
        </Button>
      </div>
    </div>
  )
}
