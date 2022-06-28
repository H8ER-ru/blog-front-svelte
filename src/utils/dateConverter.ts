
export const dateConverter = (time: string): string => {
  const date = new Date(Date.parse(time))
  const day: string | number = String(date.getDay()).length < 2 ? `0${date.getDay()}` : date.getDay()
  const mounth: string | number = String(date.getMonth()).length < 2 ? `0${date.getMonth()}` : date.getMonth()
  return `${day}.${mounth}.${date.getFullYear()}`
}
