"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Building2, Calendar, MapPin } from "lucide-react"
import { useGetMarketAdviceQuery } from "../../stores/service/farmerApi"
import { useParams } from "next/navigation"

interface MarketAdviceProps {
  selectedPlan: any
  onBack: () => void
}

export default function MarketAdvice({ selectedPlan, onBack }: MarketAdviceProps) {
   const params = useParams<{ id: string }>()

  const { data, isLoading, isError } = useGetMarketAdviceQuery(params?.id)

  if (isLoading) {
    return <p className="text-center text-muted-foreground">Loading market advice…</p>
  }

  if (isError || !data?.data) {
    return <p className="text-center text-red-500">Failed to load market data</p>
  }

  const { farm, mandiResults, harvestTips } = data.data ;
  const flatMandiResults = mandiResults.flat();


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-primary">
          Market Advice – Harvest Time
        </h2>
        <p className="text-muted-foreground">
          Best mandi prices and selling strategy for your {farm.crops.join(", ")}
        </p>
      </div>

      {/* Mandi Comparison */}
      <div className="grid md:grid-cols-2 gap-6">
        {flatMandiResults.map((mandi: any, idx: number) => (
          <Card
            key={idx}
            className={`border-2 transition-all ${
              mandi.featured
                ? "border-secondary shadow-lg bg-secondary/5"
                : "border-border"
            }`}
          >
            <CardHeader>
              <div className="flex justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    {mandi.name}
                  </CardTitle>
                  <CardDescription>{mandi.distance}</CardDescription>
                </div>

                {mandi.featured && (
                  <span className="text-xs bg-secondary px-2 py-1 rounded font-bold">
                    Recommended
                  </span>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between">
                  <span>Current Price</span>
                  <span className="text-xl font-bold text-primary">
                    {mandi.price}
                  </span>
                </div>
                <div className="text-sm flex justify-between">
                  <span>Quality</span>
                  <span>{mandi.quality}</span>
                </div>
              </div>

              {mandi.advantage && (
                <div className="bg-secondary/20 p-3 rounded-lg text-sm font-semibold">
                  Premium: {mandi.advantage}
                </div>
              )}

              <p className="text-sm font-medium">
                Expected Earnings: ₹{mandi.expectedEarnings}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Harvest Tips */}
      <div className="grid md:grid-cols-3 gap-4">
        {harvestTips.map((tip: any, idx: number) => (
          <Card key={idx}>
            <CardContent className="pt-6">
              <h4 className="font-semibold text-sm">{tip.title}</h4>
              <p className="text-xs text-muted-foreground mt-1">
                {tip.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={() => alert("Demo complete!")}>
          Complete Demo
        </Button>
      </div>
    </div>
  )
}
