import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

const baseURL =
  typeof window !== "undefined"
    ? window.location.origin
    : process.env.EXPO_PUBLIC_BETTER_AUTH_URL;

export const authClient = createAuthClient({
  baseURL,
  plugins: [
    expoClient({
      scheme: "caroline",
      storagePrefix: "caroline",
      storage: SecureStore,
    }),
  ],
});
