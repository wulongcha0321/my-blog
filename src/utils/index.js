
/* 格式化日期时间 */
export const formatDatetime = (time, format = 'yyyy-MM-dd') => {
  time = time || Date.now()
  const date = new Date(time)
  const arrWeek = [
    '星期日',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六'
  ]
  const o = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'h+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds() //秒
  }

  if (/(y+)/.test(format)) {
    format = format.replace(/(y+)/, str =>
      (date.getFullYear() + '').substring(4 - str.length)
    )
  }

  if (/(week|星期)/.test(format)) {
    format = format.replace(/(week|星期)/, () => arrWeek[date.getDay()])
  }

  for (const k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(new RegExp(`(${k})`), str =>
        str.length === 1 ? o[k] : `00${o[k]}`.substring(`${o[k]}`.length)
      )
    }
  }

  return format
}