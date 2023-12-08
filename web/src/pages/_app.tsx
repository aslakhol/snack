import { type AppType } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import posthog from "posthog-js";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import { useEffect } from "react";
import { env } from "../env.mjs";

const MyApp: AppType = ({ Component, pageProps }) => {
  useEffect(() => {
    posthog.init(env.NEXT_PUBLIC_POSTHOG_API_KEY, {
      api_host: "https://app.posthog.com",
    });

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
