import { createClient, type ClientConfig } from "@sanity/client";
import { env } from "../env.mjs";

const config: ClientConfig = {
  projectId: env.SANITY_PROJECT_ID,
  dataset: env.SANITY_DATASET,
  useCdn: true,
  apiVersion: "2023-05-03",
};

export const sanity = createClient(config);
