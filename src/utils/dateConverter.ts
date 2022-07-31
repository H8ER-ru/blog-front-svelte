
export const dateConverter = (time: string): string => {
  const date = new Date(Date.parse(time))
  return date.toLocaleDateString()
}
