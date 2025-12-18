// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Check, TrendingUp, Zap } from "lucide-react"

// interface CropPlanSelectionProps {
//   farmData: any
//   onSelectPlan: (plan: any) => void
//   onBack: () => void
// }

// export default function CropPlanSelection({ farmData, onSelectPlan, onBack }: CropPlanSelectionProps) {
//   const [selectedPlan, setSelectedPlan] = useState<"plan1" | "plan2" | null>(null)

//   const plan1 = {
//     id: "plan1",
//     name: "Traditional Mix",
//     crops: ["Sugarcane (2 acres)", "Cotton (2 acres)", "Groundnut (1 acre)"],
//     seedCost: "₹12,500",
//     expectedYield: "₹2,80,000",
//     riskScore: "Low",
//     riskLevel: 2,
//     harvestTime: "150-180 days",
//     description: "Proven crop combination with stable market demand",
//   }

//   const plan2 = {
//     id: "plan2",
//     name: "High-Value Strategy",
//     crops: ["Sugarcane (3 acres)", "Turmeric (2 acres)"],
//     seedCost: "₹15,000",
//     expectedYield: "₹3,80,000",
//     riskScore: "Medium",
//     riskLevel: 5,
//     harvestTime: "180-210 days",
//     description: "Higher yield potential with better market prices",
//   }

//   const handleSelectPlan = (plan: any) => {
//     setSelectedPlan(plan.id)
//     setTimeout(() => {
//       onSelectPlan(plan)
//     }, 600)
//   }

//   return (
//     <div className="space-y-6">
//       <div className="space-y-2">
//         <h2 className="text-3xl font-bold text-primary">Select Your Crop Plan</h2>
//         <p className="text-muted-foreground">
//           Choose a plan based on your farm size ({farmData.acres} acres) and budget ({farmData.budget})
//         </p>
//       </div>

//       <div className="grid md:grid-cols-2 gap-6">
//         {/* Plan 1 */}
//         <Card
//           className={`cursor-pointer transition-all duration-300 border-2 ${
//             selectedPlan === "plan1"
//               ? "border-primary shadow-lg scale-105"
//               : "border-border hover:border-primary/50 hover:shadow-md"
//           }`}
//           onClick={() => handleSelectPlan(plan1)}
//         >
//           <CardHeader>
//             <div className="flex items-start justify-between">
//               <div>
//                 <CardTitle className="flex items-center gap-2">
//                   <TrendingUp className="w-5 h-5 text-primary" />
//                   {plan1.name}
//                 </CardTitle>
//                 <CardDescription>{plan1.description}</CardDescription>
//               </div>
//               {selectedPlan === "plan1" && (
//                 <div className="bg-primary text-primary-foreground rounded-full p-1 animate-slide-in-left">
//                   <Check className="w-5 h-5" />
//                 </div>
//               )}
//             </div>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div>
//               <h4 className="font-semibold text-sm mb-2">Crops to Plant:</h4>
//               <ul className="space-y-1">
//                 {plan1.crops.map((crop, idx) => (
//                   <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
//                     <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
//                     {crop}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div className="grid grid-cols-2 gap-3 text-sm">
//               <div className="bg-primary/5 p-3 rounded-lg border border-primary/20">
//                 <p className="text-muted-foreground text-xs">Seed Cost</p>
//                 <p className="font-bold text-primary">{plan1.seedCost}</p>
//               </div>
//               <div className="bg-secondary/5 p-3 rounded-lg border border-secondary/20">
//                 <p className="text-muted-foreground text-xs">Est. Yield</p>
//                 <p className="font-bold text-secondary">{plan1.expectedYield}</p>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <div className="flex items-center justify-between">
//                 <span className="text-sm font-medium">Risk Level</span>
//                 <span className="text-sm font-bold text-primary">{plan1.riskScore}</span>
//               </div>
//               <div className="flex gap-1">
//                 {[...Array(10)].map((_, i) => (
//                   <div
//                     key={i}
//                     className={`h-1 flex-1 rounded-full ${i < plan1.riskLevel ? "bg-accent" : "bg-muted"}`}
//                   ></div>
//                 ))}
//               </div>
//             </div>

//             <div className="text-sm text-muted-foreground">
//               <span className="font-medium">Harvest Time:</span> {plan1.harvestTime}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Plan 2 */}
//         <Card
//           className={`cursor-pointer transition-all duration-300 border-2 ${
//             selectedPlan === "plan2"
//               ? "border-primary shadow-lg scale-105"
//               : "border-border hover:border-primary/50 hover:shadow-md"
//           }`}
//           onClick={() => handleSelectPlan(plan2)}
//         >
//           <CardHeader>
//             <div className="flex items-start justify-between">
//               <div>
//                 <CardTitle className="flex items-center gap-2">
//                   <Zap className="w-5 h-5 text-accent" />
//                   {plan2.name}
//                 </CardTitle>
//                 <CardDescription>{plan2.description}</CardDescription>
//               </div>
//               {selectedPlan === "plan2" && (
//                 <div className="bg-primary text-primary-foreground rounded-full p-1 animate-slide-in-left">
//                   <Check className="w-5 h-5" />
//                 </div>
//               )}
//             </div>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div>
//               <h4 className="font-semibold text-sm mb-2">Crops to Plant:</h4>
//               <ul className="space-y-1">
//                 {plan2.crops.map((crop, idx) => (
//                   <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
//                     <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
//                     {crop}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div className="grid grid-cols-2 gap-3 text-sm">
//               <div className="bg-accent/5 p-3 rounded-lg border border-accent/20">
//                 <p className="text-muted-foreground text-xs">Seed Cost</p>
//                 <p className="font-bold text-accent">{plan2.seedCost}</p>
//               </div>
//               <div className="bg-secondary/5 p-3 rounded-lg border border-secondary/20">
//                 <p className="text-muted-foreground text-xs">Est. Yield</p>
//                 <p className="font-bold text-secondary">{plan2.expectedYield}</p>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <div className="flex items-center justify-between">
//                 <span className="text-sm font-medium">Risk Level</span>
//                 <span className="text-sm font-bold text-accent">{plan2.riskScore}</span>
//               </div>
//               <div className="flex gap-1">
//                 {[...Array(10)].map((_, i) => (
//                   <div
//                     key={i}
//                     className={`h-1 flex-1 rounded-full ${i < plan2.riskLevel ? "bg-accent" : "bg-muted"}`}
//                   ></div>
//                 ))}
//               </div>
//             </div>

//             <div className="text-sm text-muted-foreground">
//               <span className="font-medium">Harvest Time:</span> {plan2.harvestTime}
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="flex gap-3 justify-between">
//         <Button variant="outline" onClick={onBack}>
//           Back
//         </Button>
//         <Button
//           onClick={() => selectedPlan && handleSelectPlan(selectedPlan === "plan1" ? plan1 : plan2)}
//           disabled={!selectedPlan}
//           className="bg-primary hover:bg-primary/90 text-primary-foreground"
//         >
//           Confirm Plan
//         </Button>
//       </div>
//     </div>
//   )
// }

// "use client"

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { CheckCircle, Leaf, AlertTriangle, TrendingUp } from "lucide-react"

// interface Props {
//   data: any
// }

// export default function CropRecommendationsDashboard({ data }: Props) {
//   // const { farmer, reccomandCrops, guidance } = data
//   console.log("data debbuging " , data)

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="space-y-1">
//         <h2 className="text-3xl font-bold text-primary">
//           Crop Recommendations 🌱
//         </h2>
//         <p className="text-muted-foreground">
//           Personalized suggestions for <span className="font-semibold">{}</span> based on soil & weather
//         </p>
//       </div>

//       {/* Recommended Crops */}
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {reccomandCrops.map((crop: any, idx: number) => (
//           <Card
//             key={idx}
//             className="border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
//           >
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Leaf className="w-5 h-5 text-primary" />
//                 {crop.crop}
//               </CardTitle>
//               <CardDescription>
//                 Profit Potential: <span className="font-semibold">{crop.profitPotential}</span>
//               </CardDescription>
//             </CardHeader>

//             <CardContent className="space-y-4">
//               {/* Metrics */}
//               <div className="grid grid-cols-2 gap-3 text-sm">
//                 <div className="bg-primary/5 p-3 rounded-lg border border-primary/20">
//                   <p className="text-xs text-muted-foreground">Estimated ROI</p>
//                   <p className="font-bold text-primary">{crop.estimatedROI}</p>
//                 </div>
//                 <div className="bg-secondary/5 p-3 rounded-lg border border-secondary/20">
//                   <p className="text-xs text-muted-foreground">Investment</p>
//                   <p className="font-bold text-secondary">{crop.initialInvestment}</p>
//                 </div>
//               </div>

//               {/* Suitability Score */}
//               <div className="space-y-2">
//                 <div className="flex justify-between text-sm">
//                   <span>Suitability</span>
//                   <span className="font-bold text-primary">{crop.suitabilityScore}%</span>
//                 </div>
//                 <div className="flex gap-1">
//                   {[...Array(10)].map((_, i) => (
//                     <div
//                       key={i}
//                       className={`h-1 flex-1 rounded-full ${
//                         i < Math.round(crop.suitabilityScore / 10)
//                           ? "bg-primary"
//                           : "bg-muted"
//                       }`}
//                     />
//                   ))}
//                 </div>
//               </div>

//               {/* Reasons */}
//               <ul className="space-y-1 text-sm text-muted-foreground">
//                 {crop.reasons.map((reason: string, i: number) => (
//                   <li key={i} className="flex gap-2 items-start">
//                     <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
//                     {reason}
//                   </li>
//                 ))}
//               </ul>

//               <Button className="w-full mt-2 bg-primary text-primary-foreground hover:bg-primary/90">
//                 Select Crop
//               </Button>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Guidance Section */}
//       <div className="space-y-4">
//         <h3 className="text-2xl font-bold text-primary flex items-center gap-2">
//           <TrendingUp className="w-6 h-6" />
//           Crop Guidance
//         </h3>

//         <div className="grid md:grid-cols-2 gap-6">
//           {guidance.map((item: any, idx: number) => (
//             <Card key={idx} className="border border-border">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <AlertTriangle
//                     className={`w-5 h-5 ${
//                       item.status === "Good" ? "text-primary" : "text-accent"
//                     }`}
//                   />
//                   {item.crop} — {item.status}
//                 </CardTitle>
//                 <CardDescription>Suitability Score: {item.score}</CardDescription>
//               </CardHeader>

//               <CardContent className="space-y-3 text-sm">
//                 <ul className="space-y-1 text-muted-foreground">
//                   {item.messages.map((msg: string, i: number) => (
//                     <li key={i}>• {msg}</li>
//                   ))}
//                 </ul>

//                 <div className="bg-muted/40 p-3 rounded-lg border">
//                   <p className="font-semibold">Recommendation</p>
//                   <p className="text-muted-foreground">{item.recommendation}</p>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

