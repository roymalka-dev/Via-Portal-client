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

const VIA_EXPLORER_API =
  env === "DEV"
    ? "http://localhost:3001/api/v1"
    : import.meta.env.VITE_APP_VIA_EXPLORER_API ||
      process.env.VITE_APP_VIA_EXPLORER_API;

const appConfig = {
  env: env,
  apiPrefix: "/api",
  baseUrl: env === "DEV" ? devBaseUrl : prodBaseUrl,
  apiBaseUrl: env === "DEV" ? devApiBaseUrl : prodApiBaseUrl,
  googleClientId: googleClientId || "not-valid-client-id",
  authenticatedEntryPath: "/",
  unAuthenticatedEntryPath: "/auth/login",
  timeToVerifyAuthInMIn: 60,
  viaExplorerApi: VIA_EXPLORER_API,
};

export default appConfig;
