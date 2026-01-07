export function convertTimeTextToMinutes(text: string): number {
  const match = text.match(/(오전|오후)\s*(\d+)시\s*(\d+)분/);
  if (!match) return 0;

  const [, period, hourStr, minuteStr] = match;
  let hour = Number(hourStr);
  const minute = Number(minuteStr);

  if (period === "오후" && hour !== 12) hour += 12;
  if (period === "오전" && hour === 12) hour = 0;

  return hour * 60 + minute;
}
// 서버(minutes) → UI(TimePicker 문자열)
export function convertMinutesToTimeText(
  minutes?: number
): string {
  if (minutes == null) return "";

  const h24 = Math.floor(minutes / 60);
  const m = minutes % 60;

  const isAm = h24 < 12;
  const period = isAm ? "오전" : "오후";

  let h12 = h24 % 12;
  if (h12 === 0) h12 = 12;

  return `${period} ${h12}시 ${m}분`;
}