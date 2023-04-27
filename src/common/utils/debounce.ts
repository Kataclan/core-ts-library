export async function debounce(ms) {
  return new Promise((res) => setTimeout(res, ms));
}
