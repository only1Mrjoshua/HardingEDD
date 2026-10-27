export function delay(ms = 350) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function clone(data) {
  return JSON.parse(JSON.stringify(data));
}