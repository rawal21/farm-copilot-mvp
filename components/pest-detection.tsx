"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, AlertTriangle, CheckCircle, Leaf, Zap } from "lucide-react"

interface PestDetectionProps {
  farmData: any
  onNextStep: () => void
  onBack: () => void
}

export default function PestDetection({ farmData, onNextStep, onBack }: PestDetectionProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)

  const mockPestResults = {
    pestName: "Early Shoot Borer",
    confidence: "87%",
    severity: "Medium",
    needsSpray: true,
    molecule: "Chlorantraniliprole 0.4% SC",
    dose: "500 mL per 100L water",
    sprayTiming: "In early morning (6-9 AM)",
    precautions: [
      "Wear protective gear while spraying",
      "Do not spray during rain",
      "Keep away from water bodies",
      "Wash hands after handling",
    ],
    marketPrice: "₹450-550 per liter",
  }

  const mockHealthResult = {
    status: "Healthy",
    message: "No pests detected. Leaves look healthy!",
    molecule: null,
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string)
        // Simulate analysis
        setIsAnalyzing(true)
        setTimeout(() => {
          setIsAnalyzing(false)
          setAnalysisResult(Math.random() > 0.4 ? mockPestResults : mockHealthResult)
        }, 2000)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-primary">Pest Detection</h2>
        <p className="text-muted-foreground">Upload a photo of your crop leaves for AI-powered pest analysis</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Upload Section */}
        <Card className="border-2 border-dashed border-primary/30 hover:border-primary/60 transition-colors">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <label className="flex flex-col items-center justify-center cursor-pointer">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">Click to upload leaf photo</span>
                <span className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>

              {selectedImage && (
                <div className="space-y-3 animate-slide-in">
                  <div className="relative w-full h-48 bg-muted rounded-lg overflow-hidden">
                    <img
                      src={selectedImage || "/placeholder.svg"}
                      alt="Uploaded crop leaf"
                      className="w-full h-full object-cover"
                    />
                    {isAnalyzing && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-2"></div>
                          <p className="text-sm text-white">Analyzing...</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setSelectedImage(null)
                      setAnalysisResult(null)
                    }}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Clear image
                  </button>
                </div>
              )}

              {!selectedImage && (
                <div className="space-y-2 text-center py-4">
                  <Leaf className="w-10 h-10 text-primary/40 mx-auto" />
                  <p className="text-xs text-muted-foreground">
                    Take a close-up photo of affected leaf area for best results
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <div className="space-y-4">
          {analysisResult ? (
            <>
              {analysisResult.needsSpray ? (
                <Card className="border-accent/50 bg-accent/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-accent">
                      <AlertTriangle className="w-5 h-5" />
                      {analysisResult.pestName}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-accent/10 p-3 rounded-lg">
                        <p className="text-muted-foreground text-xs">Confidence</p>
                        <p className="font-bold text-accent">{analysisResult.confidence}</p>
                      </div>
                      <div className="bg-accent/10 p-3 rounded-lg">
                        <p className="text-muted-foreground text-xs">Severity</p>
                        <p className="font-bold text-accent">{analysisResult.severity}</p>
                      </div>
                    </div>

                    <div className="bg-foreground/5 p-3 rounded-lg space-y-2">
                      <p className="font-semibold text-sm">Treatment:</p>
                      <p className="text-sm text-foreground">{analysisResult.molecule}</p>
                      <p className="text-xs text-muted-foreground">
                        Dose: <span className="font-medium">{analysisResult.dose}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        When: <span className="font-medium">{analysisResult.sprayTiming}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Cost: <span className="font-medium">{analysisResult.marketPrice}</span>
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold text-sm mb-2">Precautions:</p>
                      <ul className="space-y-1">
                        {analysisResult.precautions.map((p: string, idx: number) => (
                          <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-primary/50 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary">
                      <CheckCircle className="w-5 h-5" />
                      {analysisResult.status}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground">{analysisResult.message}</p>
                    <p className="text-xs text-muted-foreground mt-3">Keep monitoring regularly.</p>
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <Card className="border-border/50 bg-muted/30">
              <CardContent className="pt-6">
                <div className="flex gap-3">
                  <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">AI-Powered Analysis</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Upload a leaf photo to get instant pest detection, treatment recommendations, and market pricing
                      for pesticides.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Example Pests */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-sm">Common Pests Detected</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {["Early Shoot Borer", "Leaf Roller", "Whitefly", "Scale Insect"].map((pest, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span className="text-muted-foreground">{pest}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex gap-3 justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNextStep} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          Continue to Market Advice
        </Button>
      </div>
    </div>
  )
}
