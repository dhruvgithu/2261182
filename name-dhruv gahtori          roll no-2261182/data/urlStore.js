let store = {};

export function saveUrl(shortcode, data) {
  store[shortcode] = data;
}

export function getUrl(shortcode) {
  return store[shortcode];
}

export function getAllUrls() {
  return Object.entries(store).map(([shortcode, data]) => ({ shortcode, ...data }));
}

export function addClick(shortcode, clickData) {
  if (store[shortcode]) {
    store[shortcode].clicks.push(clickData);
  }
}
