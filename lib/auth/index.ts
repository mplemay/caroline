import { expo } from "@better-auth/expo";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth";

import { db } from "@/lib/db";
import { account, session, user, verification } from "@/lib/db/schema";

const developmentTrustedOrigins = [
  "http://localhost:8081",
  "http://127.0.0.1:8081",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "exp://",
  "exp://**",
  "exp://192.168.*.*:*/**",
];

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { user, session, account, verification },
  }),
  advanced: {
    database: {
      generateId: false,
    },
  },
  plugins: [expo()],
  account: {
    storeStateStrategy: "cookie",
    storeAccountCookie: true,
  },
  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwe",
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  trustedOrigins: [
    "caroline://",
    ...(process.env.NODE_ENV === "development" ? developmentTrustedOrigins : []),
  ],
});
