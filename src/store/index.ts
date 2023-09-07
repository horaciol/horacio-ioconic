import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type QuoteType = {
  key: string;
  quote: string;
};

interface AuthState {
  username: string;
  password: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  setUserName: (name: string) => void;
}

interface QuotesState {
  data: QuoteType[];
  addQuote: (data: QuoteType) => void;
  deleteQuote: (key: string) => void;
  updateQuotes: (newData: QuoteType[]) => void;
}

export const useAuthStore = create<AuthState>(set => ({
  username: "",
  password: "",
  access_token: "",
  expires_in: 0,
  refresh_token: "",
  setUserName: (username: string) => set(() => ({ username }))
}));

export const useQuotesStore = create<QuotesState>()(
  persist(
    set => ({
      data: [],
      addQuote: (newQuote: QuoteType) => set(state => ({ data: [...state.data, newQuote] })),
      deleteQuote: (key: string) => set(state => ({ data: state.data.filter(item => item.key !== key) })),
      updateQuotes: (newData: QuoteType[]) => set(() => ({ data: newData }), false)
    }),
    {
      name: "quote-storage",
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
