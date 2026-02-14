const LOCAL_DEV_BASE_URL = "http://localhost:3000";

export function getApiBaseUrl() {
  const configuredBaseUrl = process.env.NEXT_PUBLIC_APIDOMAIN?.replace(/\/$/, "");

  if (process.env.NODE_ENV === "development") {
    return LOCAL_DEV_BASE_URL;
  }

  return configuredBaseUrl || LOCAL_DEV_BASE_URL;
}
