export const snooze = (ms: number) => new Promise((resolve, reject) => setTimeout(resolve, ms));
