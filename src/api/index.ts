export function env() {
  if (process.env.NODE_ENV === "development") return "development";
  return "production";
}
export function previewUrl() {
  if (env() === "development") {
    const arr = window.location.origin.split(":");
    return `${arr[0]}:${arr[1]}:9010`
  }
  return window.location.origin + "/form-design-h5"
}
export function previewOrigin() {
  if (env() === "development") {
    const arr = window.location.origin.split(":");
    return `${arr[0]}:${arr[1]}:9010`
  }
  return window.location.origin
}
export function apiUrl() {
  return "http://xxx.com/";
}