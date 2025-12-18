import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const farmerApi = createApi({
  reducerPath: "farmerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api", // change in prod
  }),
  endpoints: (builder) => ({
    // 🔹 Create farmer profile
    createFarmerProfile: builder.mutation<any, any>({
      query: (body) => ({
        url: "/user",
        method: "POST",
        body,
      }),
    }),

    // 🔹 Get farmer dashboard data by ID
    getFarmerById: builder.query<any, string>({
      query: (id) => ({
        url: `/user/dashboard/${id}`,
        method: "GET",
      }),
    }),

     getMarketAdvice: builder.query<any, string>({
      query: (id) => `/market/market-advice/${id}`,
    }),
  }),
})

export const {
  useCreateFarmerProfileMutation,
  useGetFarmerByIdQuery, // ✅ hook to use in dashboard
  useGetMarketAdviceQuery
} = farmerApi
