Page({
  data: {
    passwordShow: false
  },
  showPassword() {
    this.setData({
      passwordShow: !this.data.passwordShow
    })
  },
  registered() {
    wx.redirectTo({
      url: '../registered/registered',
    })
  },
  getBack() {
    wx.redirectTo({
      url: '../getback/getback',
    })
  }
})