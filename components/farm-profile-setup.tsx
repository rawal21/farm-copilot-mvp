"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation" // ✅ added
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sprout, MapPin, Leaf, Droplet } from "lucide-react"
import { useCreateFarmerProfileMutation } from "@/app/stores/service/farmerApi"

interface FarmProfileSetupProps {
  onComplete: (data: any) => void
}

export default function FarmProfileSetup() {
  const router = useRouter() // ✅ added
  const [createProfile, { isLoading }] = useCreateFarmerProfileMutation()

  const [errorMessage, setErrorMessage] = useState<string | null>(null) // ✅ added

  const [formData, setFormData] = useState({
    name: "Ramesh",
    phone: "+91 9876543210",
    crops: "Sugarcane, Cotton",
    acres: "5",
    irrigation: "Borewell",
    budget: "₹50,000",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const getLocation = (): Promise<{ lat: number; lon: number }> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          resolve({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          }),
        () => reject(new Error("Location permission denied"))
      )
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null) // reset error

    try {
      const location = await getLocation()

      const payload = {
        name: formData.name,
        phone: formData.phone,
        crops: formData.crops.split(",").map((c) => c.trim()),
        farmSize: Number(formData.acres),
        irrigation: formData.irrigation,
        budget: Number(formData.budget.replace(/[^\d]/g, "")),
        location,
      }

      const response = await createProfile(payload).unwrap()

      // onComplete(response.data)

      console.log("debbuging the data in farmer profile" ,response.data);
      const id = response.data?._id;

      // ✅ Redirect to dashboard
      router.push(`/dashboard/${id}`)
    } catch (error: any) {
      console.error("Profile creation failed:", error)

      // ✅ User-friendly error
      if (error?.message?.includes("Location")) {
        setErrorMessage("Please allow location access to continue.")
      } else {
        setErrorMessage(
          "Something went wrong while setting up your profile. Please try again."
        )
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-primary">Welcome to KrishiCopilot</h2>
        <p className="text-muted-foreground">
          We’ll auto-detect your location for weather, soil & market insights
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sprout className="w-5 h-5 text-primary" />
              Farm Information
            </CardTitle>
            <CardDescription>Basic details only, location is automatic</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input name="name" value={formData.name} onChange={handleChange} placeholder="Farmer Name" />
              <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" />
              <Input name="crops" value={formData.crops} onChange={handleChange} placeholder="Crops" />
              <Input name="acres" value={formData.acres} onChange={handleChange} placeholder="Acres" />
              <Input name="irrigation" value={formData.irrigation} onChange={handleChange} placeholder="Irrigation" />
              <Input name="budget" value={formData.budget} onChange={handleChange} placeholder="Budget" />

              {/* ✅ Friendly error message */}
              {errorMessage && (
                <p className="text-sm text-red-600 bg-red-50 p-2 rounded">
                  {errorMessage}
                </p>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Setting up your farm..." : "Continue"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Info cards remain unchanged */}
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6 flex gap-3">
              <MapPin className="text-primary" />
              <p className="text-sm text-muted-foreground">
                Location is used only for weather, soil & mandi prices
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 flex gap-3">
              <Leaf className="text-secondary" />
              <p className="text-sm text-muted-foreground">
                AI-based crop & profit recommendations
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 flex gap-3">
              <Droplet className="text-accent" />
              <p className="text-sm text-muted-foreground">
                Irrigation & pest alerts from real-time data
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
