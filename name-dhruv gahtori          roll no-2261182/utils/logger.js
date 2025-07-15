const logs = [];

export function customLog(type, message, metadata = {}) {
  const timestamp = new Date().toISOString();
  logs.push({ type, message, metadata, timestamp });
}

export function getLogs() {
  return logs;
}
