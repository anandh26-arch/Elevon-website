export function calculateProjectStatus(startTime: string, endTime: string) {
  const now = new Date().getTime();
  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();

  if (now < start) {
    return 'upcoming';
  } else if (now >= start && now <= end) {
    return 'live';
  } else {
    return 'ended';
  }
}