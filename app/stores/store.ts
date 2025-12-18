import { configureStore } from "@reduxjs/toolkit"
import { farmerApi } from "./service/farmerApi"

export const store = configureStore({
  reducer: {
    [farmerApi.reducerPath]: farmerApi.reducer,
  },
  middleware: (getDefaultMiddleware: () => string | any[]) =>
    getDefaultMiddleware().concat(farmerApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
