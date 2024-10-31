export default function getBackendUrl() {
  return import.meta.env.VITE_BASEURL_BACKEND ?? "";
}
