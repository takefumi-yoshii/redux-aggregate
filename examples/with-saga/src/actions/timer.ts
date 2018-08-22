function tick() {
  const date = new Date()
  const month = date.getMonth() + 1
  const _date = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return `${month}/${_date} ${hour}:${minute}:${second}`
}
function notifyMessage({ message }: { message: string }) {
  return { message }
}
export const TimerAC = { tick, notifyMessage }
