/* eslint-disable @typescript-eslint/no-explicit-any */
export const convertCityData = (response: any) => {
  return {
    city_short_code: response.data.env || "",
    service_type: response.data.service_type || "",
    tenant_id: response.data.tenant || "",
    region: response.data.region || "",
    city: response.data.city || "",
    country: response.data.country || "",
    languages: response.data.languages || "",
    schedule_type: response.data.scheduleType || "",
    ps: response.data.ps || "",
    pso: response.data.pso || "",
    psm: response.data.psm || "",
    web_app: response.data.webAppLink || "",
    app_name: response.data.name || "",
    app_image: response.data.imageUrl || "",
    ios_link: response.data.iosLink || "",
    ios_version: response.data.iosVersion || "",
    android_link: response.data.androidLink || "",
    android_version: response.data.androidVersion || "",
  };
};
