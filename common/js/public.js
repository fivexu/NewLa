let timeObj = {}

export function GetDate(year, month) {
  let d = new Date(year, month, 0);
  return d.getDate();
}

let date = new Date()
let date2 = new Date(date)
date2.setDate(date.getDate() + 90);
let years = []
let months = []
let days = []
let hours = []

for (let i = date.getFullYear(); i <= date2.getFullYear(); i++) {
  years.push(i)
}

for (let i = date.getMonth() + 1; i <= date2.getMonth() + 1; i++) {
  if (i < 10) {
    i = `0${i}`
  }
  months.push(i)
}

for (let i = date.getDate(); i <= GetDate(date.getFullYear(), date.getMonth() + 1); i++) {
  if (i < 10) {
    i = `0${i}`
  }
  days.push(i)
}

for (let i = date.getHours() + 1; i <= 23; i++) {
  if (i < 10) {
    i = `0${i}`
  }
  hours.push(`${i}:00`)
}



timeObj = {
  date: date,
  years: years,
  months: months,
  days: days,
  hours: hours
}
export {
  timeObj
}

export function getDays(month, year) {
  days = []
  if (month > date.getMonth() + 1) {
    for (let i = 1; i <= GetDate(year, month); i++) {
      if (i < 10) {
        i = `0${i}`
      }
      days.push(i)
    }
  } else {
    for (let i = date.getDate(); i <= GetDate(year, month); i++) {
      if (i < 10) {
        i = `0${i}`
      }
      days.push(i)
    }
  }
  return days
}
export function getHours(hour) {
  hours = []
  if (hour > date.getDate()) {
    for (let i = 0; i <= 23; i++) {
      if (i < 10) {
        i = `0${i}`
      }
      hours.push(`${i}:00`)
    }
  } else {
    for (let i = date.getHours() + 1; i <= 23; i++) {
      if (i < 10) {
        i = `0${i}`
      }
      hours.push(`${i}:00`)
    }
  }
  return hours
}
export function oponCamare(fn, num = 8) {
  wx.chooseImage({
    count: num,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      let tempFilePaths = res.tempFilePaths
      fn(tempFilePaths)
    }
  })
}
export function getTimes(year, month, day, hour, fn) {
  let date1 = new Date(year, month - 1, day, hour).getTime()
  let date2 = new Date().getTime()
  let obj = {}
  console.log(Math.floor((date1 - date2) / (60 * 60 * 24 * 1000 * 30)))
  obj.differ = date1 - date2
  obj.disMSe = Math.floor(date1 - date2) % 100
  obj.disSec = Math.floor((date1 - date2) / (1000)) % 60
  obj.disMin = Math.floor((date1 - date2) / (60 * 1000)) % 60
  obj.disHour = Math.floor((date1 - date2) / (60 * 60 * 1000)) % 24
  obj.disDay = Math.floor((date1 - date2) / (60 * 60 * 24 * 1000))
  obj.disMonth = Math.floor((date1 - date2) / (60 * 60 * 24 * 1000 * 30))
  fn(obj)
}
