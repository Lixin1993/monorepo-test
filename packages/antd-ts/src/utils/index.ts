/**
 *  formatDate
 *  @param date (new Date（时间戳）)
 *  format (yyyy:MM:dd:HH:mm:ss) 任意一种你想要的格式
 *  showZero (月和日只有一位数时，前面是否需要添一个0， 默认有0)
 */
export function formatDate(dateParam: number, format = 'yyyy年MM月dd日', showZero = true): string {
  const date: Date = new Date(dateParam)
  let newDate = ''
  if (showZero) {
    newDate = format.replace('yyyy', date.getFullYear().toString())
      .replace('MM', ((date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : `0${date.getMonth() + 1}`).toString())
      .replace('dd', ((date.getDate()) >= 10 ? (date.getDate()) : `0${date.getDate()}`).toString())
      .replace('HH', ((date.getHours()) >= 10 ? (date.getHours()) : `0${date.getHours()}`).toString())
      .replace('mm', ((date.getMinutes()) >= 10 ? (date.getMinutes()) : `0${date.getMinutes()}`).toString())
      .replace('ss', ((date.getSeconds()) >= 10 ? (date.getSeconds()) : `0${date.getSeconds()}`).toString())
  } else {
    newDate = format.replace('yyyy', date.getFullYear().toString())
      .replace('MM', (date.getMonth() + 1).toString())
      .replace('dd', date.getDate().toString())
      .replace('HH', ((date.getHours()) >= 10 ? (date.getHours()) : `0${date.getHours()}`).toString())
      .replace('mm', ((date.getMinutes()) >= 10 ? (date.getMinutes()) : `0${date.getMinutes()}`).toString())
      .replace('ss', ((date.getSeconds()) >= 10 ? (date.getSeconds()) : `0${date.getSeconds()}`).toString())
  }
  return newDate
}