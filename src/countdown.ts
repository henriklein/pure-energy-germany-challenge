export function formatCountdown(now: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  const target = new Date(now);
  target.setHours(14, 45, 0, 0);
  if (target <= now) target.setDate(target.getDate() + 1);
  const diff = target.getTime() - now.getTime();
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}
