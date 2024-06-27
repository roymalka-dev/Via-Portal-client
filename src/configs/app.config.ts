const googleClientId =
  import.meta.env.VITE_APP_GOOGLE_CLIENT_ID ||
  process.env.VITE_APP_GOOGLE_CLIENT_ID;

const appConfig = {
  apiPrefix: "/api",
  baseUrl: "http://localhost:3000",
  apiBaseUrl: "http://localhost:3000",
  googleClientId: googleClientId || "client-id",
  authenticatedEntryPath: "/",
  unAuthenticatedEntryPath: "/auth/login",
};

export default appConfig;
