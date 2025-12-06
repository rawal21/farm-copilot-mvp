"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sprout, MapPin, Leaf, Droplet } from "lucide-react"

interface FarmProfileSetupProps {
  onComplete: (data: any) => void
}

export default function FarmProfileSetup({ onComplete }: FarmProfileSetupProps) {
  const [formData, setFormData] = useState({
    name: "Ramesh",
    phone: "+91 9876543210",
    village: "Aurangabad",
    district: "Aurangabad",
    crops: "Sugarcane, Cotton",
    acres: "5",
    irrigation: "Borewell",
    budget: "₹50,000",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onComplete(formData)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 animate-fade-in">
        <h2 className="text-3xl font-bold text-primary">Welcome to KrishiCopilot</h2>
        <p className="text-muted-foreground">Let's set up your farm profile to get personalized weekly guidance</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Form */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sprout className="w-5 h-5 text-primary" />
              Farm Information
            </CardTitle>
            <CardDescription>Share details about your farm and crops</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Farmer Name</label>
                <Input name="name" value={formData.name} onChange={handleChange} placeholder="Your name" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 XXXX XXXX XX" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Village</label>
                  <Input name="village" value={formData.village} onChange={handleChange} placeholder="Village" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">District</label>
                  <Input name="district" value={formData.district} onChange={handleChange} placeholder="District" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Main Crops (Comma separated)</label>
                <Input
                  name="crops"
                  value={formData.crops}
                  onChange={handleChange}
                  placeholder="e.g., Sugarcane, Cotton"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Farm Size (Acres)</label>
                  <Input name="acres" value={formData.acres} onChange={handleChange} placeholder="5" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Irrigation Type</label>
                  <Input name="irrigation" value={formData.irrigation} onChange={handleChange} placeholder="Borewell" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Annual Budget</label>
                <Input name="budget" value={formData.budget} onChange={handleChange} placeholder="₹50,000" />
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Continue to Crop Plan
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="space-y-4">
          <Card className="border-primary/20 bg-primary/5 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-sm">Weather Updates</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Get location-specific weather alerts and irrigation recommendations
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-secondary/20 bg-secondary/5 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Leaf className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-sm">Crop Planning</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Smart crop suggestions based on soil, weather, and market prices
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-accent/5 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Droplet className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-sm">Pest Alerts</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Upload leaf photos for AI-powered pest detection with treatment advice
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
