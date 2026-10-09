export function fillYears(past = 15): string[] {
  const currentYear = new Date().getFullYear() + 1;
  const years = ["All"];

  for (let i = 0; i <= past; i++) {
    years.push(String(currentYear - i));
  }

  return years;
}
