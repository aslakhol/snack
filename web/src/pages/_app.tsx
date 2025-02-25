import { type AppType } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import { useEffect } from "react";
import { env } from "../env.mjs";
import { Router } from "next/router";

const MyApp: AppType = ({ Component, pageProps }) => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      void navigator.serviceWorker
        .register("/service-worker.js", { scope: "/" })
        .then((registration) => console.log("scope is: ", registration.scope));
    }
  }, []);

  useEffect(() => {
    if (env.NEXT_PUBLIC_POSTHOG_API_KEY === "local") {
      return;
    }

    posthog.init(env.NEXT_PUBLIC_POSTHOG_API_KEY, {
      api_host:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/ingest"
          : "https://snack.aslak.io/ingest",
      // Enable debug mode in development
      loaded: (posthog) => {
        if (process.env.NODE_ENV === "development") {
          posthog.debug();
        }
      },
    });

    const handleRouteChange = () => posthog?.capture("$pageview");

    Router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      Router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return (
    <PostHogProvider client={posthog}>
      <Analytics />
      <Component {...pageProps} />
    </PostHogProvider>
  );
};

export default api.withTRPC(MyApp);
