import { type AppType } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import posthog from "posthog-js";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import { useEffect } from "react";
import { env } from "../env.mjs";

if (typeof window !== "undefined") {
  posthog.init(env.NEXT_PUBLIC_POSTHOG_API_KEY, {
    api_host:
      process.env.NODE_ENV === "development"
        ? "localhost:3000/ingest"
        : "https://snack.aslak.io/ingest",
    loaded: (posthog) => {
      if (process.env.NODE_ENV === "development") posthog.debug();
    },
  });
}

const MyApp: AppType = ({ Component, pageProps }) => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      void navigator.serviceWorker
        .register("/service-worker.js", { scope: "/" })
        .then((registration) => console.log("scope is: ", registration.scope));
    }
  }, []);

  return (
    <>
      <Analytics />
      <Component {...pageProps} />
    </>
  );
};

export default api.withTRPC(MyApp);
