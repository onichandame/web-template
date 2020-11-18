export const greet = (name: string) => {
  const greeting = [`hello`, name]
  const date = new Date()
  return { timestamp: date, message: greeting[date.getSeconds() % 2] }
}
