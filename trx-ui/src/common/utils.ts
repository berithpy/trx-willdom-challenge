export function addDays(date: Date, days: number) {
  const copy = new Date(Number(date));
  copy.setDate(date.getDate() + days);
  return copy;
}

export function getIsoString(date: Date) {
  return date.toISOString().split('T')[0];
}
export function getApiDate(date: string) {
  return date.replace(/-/g, '/');
}
