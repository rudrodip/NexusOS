"use client";

import { store } from "./store";
import { Provider } from "react-redux";
import { TooltipProvider } from "@/components/ui/tooltip";

export function ReduxProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
        <TooltipProvider>{children}</TooltipProvider>
    </Provider>
  );
}
