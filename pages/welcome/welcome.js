Page({
  data: {
    time: 3
  },
  timeToHome() {
    this.timer = null
    clearInterval(this.timer)
    this.timer = setInterval(() => {
      this.data.time--
      if (this.data.time <= 0) {
        clearInterval(this.timer)
        wx.switchTab({
          url: '../../pages/home/home'
        })
      }
      this.setData({
        time: this.data.time
      })
    }, 1000)
  },
  onLoad: function () {
    this.timeToHome()
  },
  toHome() {
    clearInterval(this.timer)
    wx.switchTab({
      url: '../../pages/home/home'
    })
  }
})