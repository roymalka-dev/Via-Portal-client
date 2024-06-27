const env = import.meta.env.VITE_APP_ENV || process.env.VITE_APP_ENV;

const googleClientId =
  import.meta.env.VITE_APP_GOOGLE_CLIENT_ID ||
  process.env.VITE_APP_GOOGLE_CLIENT_ID;

const devBaseUrl =
  import.meta.env.VITE_APP_DEV_BASE_URL || process.env.VITE_APP_DEV_BASE_URL;

const prodBaseUrl =
  import.meta.env.VITE_APP_PROD_BASE_URL || process.env.VITE_APP_PROD_BASE_URL;

const devApiBaseUrl =
  import.meta.env.VITE_APP_DEV_API_BASE_URL ||
  process.env.VITE_APP_DEV_API_BASE_URL;
const prodApiBaseUrl =
  import.meta.env.VITE_APP_PROD_BASE_URL || process.env.VITE_APP_PROD_BASE_URL;

const appConfig = {
  apiPrefix: "/api",
  baseUrl: env === "DEV" ? devBaseUrl : prodBaseUrl,
  apiBaseUrl: env === "DEV" ? devApiBaseUrl : prodApiBaseUrl,
  googleClientId: googleClientId || "client-id",
  authenticatedEntryPath: "/",
  unAuthenticatedEntryPath: "/auth/login",
};

export default appConfig;
