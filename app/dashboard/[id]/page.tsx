"use client"

import React from "react"

import {
  Droplet,
  Wind,
  Thermometer,
  TrendingUp,
  Leaf,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Sprout,
} from "lucide-react"
import { useGetFarmerByIdQuery } from "@/app/stores/service/farmerApi"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"

/* -------------------- Types -------------------- */

interface WeatherData {
  temperature: number
  conditions: string
  humidity: number
  wind: number
}

interface SoilData {
  texture: string
  moisture: number // decimal between 0-1
  temperature?: number
}

interface CropGuidance {
  crop: string
  status: "Good" | "Moderate" | "Risk"
  score: number // 0-100
  messages: string[]
  recommendation: string
}

interface RecommendedCrop {
  crop: string
  suitabilityScore: number
  profitPotential: "High" | "Medium" | "Low"
  initialInvestment: string
  reasons: string[]
  growingPeriod: string
  estimatedROI?: string // Added based on your API response
}

interface ApiResponse {
  data: {
    farmer: string
    location: {
      lat: number
      lon: number
    }
    weather: WeatherData
    soil: SoilData
    guidance: CropGuidance[]
    reccomandCrops?: RecommendedCrop[] // Note the typo in API response
  }
  message: string
  success: boolean
}

interface FarmerDashboardData {
  weather: WeatherData
  soil: SoilData
  guidance: CropGuidance[]
  recommendedCrops?: RecommendedCrop[]
}

interface FarmerDashboardProps {
  farmData: FarmerDashboardData
  onContinue: () => void
  onBack: () => void
}

/* -------------------- Constants & Helpers -------------------- */

const STATUS_VARIANTS = {
  Good: "bg-green-100 text-green-700 border-green-300",
  Moderate: "bg-yellow-100 text-yellow-700 border-yellow-300",
  Risk: "bg-red-100 text-red-700 border-red-300",
} as const

const PROFIT_COLORS = {
  High: "text-green-600",
  Medium: "text-yellow-600",
  Low: "text-gray-500",
} as const

/* -------------------- Components -------------------- */

const StatusBadge = ({ status }: { status: "Good" | "Moderate" | "Risk" }) => {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold border ${STATUS_VARIANTS[status]}`}
    >
      {status}
    </span>
  )
}

const ProgressBar = ({ value }: { value: number }) => (
  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
    <div
      className="h-full bg-green-500 transition-all duration-300"
      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
    />
  </div>
)

const LoadingSkeleton = () => (
  <div className="space-y-8 animate-pulse">
    <div>
      <div className="h-8 w-64 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 w-96 bg-gray-200 rounded"></div>
    </div>
    
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[1,2,3,4].map(i => (
        <div key={i} className="rounded-xl border bg-gray-100 p-4 h-24"></div>
      ))}
    </div>
    
    <div className="space-y-4">
      <div className="h-6 w-48 bg-gray-200 rounded"></div>
      <div className="grid md:grid-cols-2 gap-4">
        {[1,2].map(i => (
          <div key={i} className="rounded-xl border bg-gray-100 p-4 h-48"></div>
        ))}
      </div>
    </div>
  </div>
)

const ErrorDisplay = ({ message }: { message: string }) => (
  <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
    <h3 className="text-lg font-semibold text-red-700 mb-2">Unable to Load Data</h3>
    <p className="text-red-600">{message}</p>
    <p className="text-sm text-red-500 mt-2">Please check your connection and try again</p>
  </div>
)

/* -------------------- Main Component -------------------- */

export default function FarmerDashboard({ farmData, onContinue, onBack }: FarmerDashboardProps) {
  const params = useParams<{ id: string }>()
  const { 
    data: apiResponse, 
    isLoading, 
    isError, 
    error 
  } = useGetFarmerByIdQuery(params?.id || "", {
    skip: !params?.id,
    refetchOnMountOrArgChange: true,
  })

  const router = useRouter()


  // Debug logging with conditional checks
  React.useEffect(() => {
    if (apiResponse) {
      console.log("✅ API Response received:", {
        hasData: !!apiResponse.data,
        farmerName: apiResponse.data?.farmer,
        weatherData: !!apiResponse.data?.weather,
        soilData: !!apiResponse.data?.soil,
        guidanceCount: apiResponse.data?.guidance?.length || 0,
        recommendedCropsCount: apiResponse.data?.reccomandCrops?.length || 0,
        fullResponse: apiResponse
      })
    }
    
    if (isError) {
      console.error("❌ Error loading farmer data:", error)
    }
  }, [apiResponse, isError, error])

  // Transform API data to match dashboard structure
  const dashboardData = React.useMemo((): FarmerDashboardData => {
    // If we have API data, use it
    if (apiResponse?.data) {
      return {
        weather: apiResponse.data.weather,
        soil: apiResponse.data.soil,
        guidance: apiResponse.data.guidance || [],
        recommendedCrops: apiResponse.data.reccomandCrops?.map(crop => ({
          ...crop,
          profitPotential: crop.profitPotential as "High" | "Medium" | "Low"
        })) || []
      }
    }
    
    // Otherwise use the fallback prop data
    console.log("⚠️ Using fallback prop data")
    return farmData
  }, [apiResponse, farmData])

  // Loading state
  if (isLoading) {
    return <LoadingSkeleton />
  }

  // Error state
  if (isError) {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-green-700">Your Farm Dashboard</h2>
          <p className="text-gray-600 mt-1">Real-time insights for your farm</p>
        </div>
        <ErrorDisplay message={error?.toString() || "Failed to load data"} />
        <div className="flex justify-end gap-3 pt-6 border-t">
          <button
            onClick={onBack}
            className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100"
          >
            Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-green-700">Your Farm Dashboard</h2>
        <p className="text-gray-600 mt-1">
          Real-time insights for your farm
          {apiResponse?.data?.farmer && (
            <span className="ml-2 text-green-700 font-semibold">
              • Farmer: {apiResponse.data.farmer}
            </span>
          )}
        </p>
      </div>

      {/* Weather & Soil */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Temperature */}
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Temperature</p>
              <p className="text-2xl font-bold">
                {dashboardData.weather?.temperature?.toFixed(1) ?? "N/A"}°C
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {dashboardData.weather?.conditions?.replace(/_/g, ' ')?.toLowerCase() ?? "Unknown"}
              </p>
            </div>
            <Thermometer className="w-8 h-8 text-green-600" />
          </div>
        </div>

        {/* Humidity */}
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Humidity</p>
              <p className="text-2xl font-bold">
                {dashboardData.weather?.humidity ?? "N/A"}%
              </p>
            </div>
            <Droplet className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        {/* Wind */}
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Wind Speed</p>
              <p className="text-2xl font-bold">
                {dashboardData.weather?.wind?.toFixed(1) ?? "N/A"} m/s
              </p>
            </div>
            <Wind className="w-8 h-8 text-orange-500" />
          </div>
        </div>

        {/* Soil */}
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Soil Type</p>
              <p className="text-2xl font-bold">
                {dashboardData.soil?.texture ?? "N/A"}
              </p>
              <p className="text-xs text-gray-500">
                Moisture: {dashboardData.soil?.moisture !== undefined 
                  ? `${(dashboardData.soil.moisture * 100).toFixed(1)}%`
                  : "N/A"
                }
                {dashboardData.soil?.temperature !== undefined && (
                  <span className="block">
                    Temp: {dashboardData.soil.temperature.toFixed(1)}°C
                  </span>
                )}
              </p>
            </div>
            <Leaf className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Current Crop Guidance */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Sprout className="w-5 h-5 text-green-600" />
          Current Crop Guidance
        </h3>

        {dashboardData.guidance?.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {dashboardData.guidance.map((crop: CropGuidance, index: number) => (
              <div key={index} className="rounded-xl border bg-white p-4 shadow-sm space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-semibold">{crop.crop}</h4>
                  <StatusBadge status={crop.status} />
                </div>

                <p className="text-sm text-gray-600">Health Score: {crop.score}/100</p>
                <ProgressBar value={crop.score} />

                <div className="space-y-2">
                  {crop.messages?.map((msg: string, i: number) => (
                    <div key={i} className="flex gap-2 text-sm text-gray-600">
                      {crop.status === "Good" ? (
                        <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                      )}
                      <span>{msg}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t text-sm">
                  <span className="font-medium">Recommendation:</span>{" "}
                  <span className="text-gray-600">{crop.recommendation}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center">
            <p className="text-gray-500">No crop guidance available</p>
          </div>
        )}
      </div>

      {/* Recommended Crops */}
      {dashboardData.recommendedCrops && dashboardData.recommendedCrops.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Recommended Crops
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dashboardData.recommendedCrops.map((crop: RecommendedCrop, index: number) => (
              <div key={index} className="rounded-xl border bg-white p-4 shadow-sm space-y-3">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-semibold">{crop.crop}</h4>
                    <p className="text-xs text-gray-500">{crop.growingPeriod}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">{crop.suitabilityScore}</p>
                    <p className="text-xs text-gray-500">Score</p>
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Profit</span>
                  <span className={`font-semibold ${PROFIT_COLORS[crop.profitPotential]}`}>
                    {crop.profitPotential}
                  </span>
                </div>

                <div className="text-sm text-gray-600">
                  <div>Investment: <span className="font-medium">{crop.initialInvestment}</span></div>
                  {crop.estimatedROI && (
                    <div>ROI: <span className="font-medium text-green-600">{crop.estimatedROI}</span></div>
                  )}
                </div>

                <ul className="text-xs text-gray-600 space-y-1 pt-2 border-t">
                  {crop.reasons?.map((reason: string, i: number) => (
                    <li key={i}>• {reason}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between items-center pt-6 border-t">
        <div className="text-sm text-gray-500">
          {apiResponse?.data 
            ? `Data loaded from API: ${apiResponse.data.farmer || "Unknown Farmer"}` 
            : "Using fallback data"}
        </div>
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Back
          </button>

          <button
            onClick={() => router.push(`/market/${params?.id}`)}
            className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 flex items-center gap-2 transition-colors"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}