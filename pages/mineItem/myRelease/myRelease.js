let dataList = require('../../../static/data/data.js')

Page({
  data: {
    releaseList: [],
    trans: 0,
    currentIndex: -1,
    shelfAc: false,
    deleteAc: false
  },
  prevent() { },
  _getData() {
    let _this = this
    _this.setData({
      releaseList: dataList.dataList.data.releaseList
    })
  },
  scrolled() {
    console.log('ok')
  },
  onLoad: function () {
    this._getData()
  },
  touchStart(ev) {
    this.touched = true
    this.disX = ev.changedTouches[0].pageX
    this.setData({
      currentIndex: ev.currentTarget.dataset.index,
      trans: 0
    })
  },
  touchMove(ev) {
    if (!this.touched) {
      return
    }
    let translateX = ev.changedTouches[0].pageX - this.disX
    if (translateX <= 0) {
      if (translateX <= -110) {
        translateX = -110
      }
      this.setData({
        trans: translateX
      })
    }
  },
  touchEnd(ev) {
    if (this.data.trans !== -110) {
      let timer = null
      let n = this.data.trans
      clearInterval(timer)
      timer = setInterval(() => {
        n++
        if (n >= 0) {
          clearInterval(timer)
          this.setData({
            trans: n
          })
        }
        this.setData({
          trans: n
        })
      }, 1)
    }
  },
  shelf() {
    if (this.data.releaseList[this.data.currentIndex].failAc) {
      wx.showToast({
        title: '发布后才能下架哦',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (this.data.releaseList[this.data.currentIndex].downAc) {
      wx.showToast({
        title: '已经下架了',
        icon: 'none',
        duration: 2000
      })
      return
    }
    this.setData({
      shelfAc: !this.data.shelfAc,
      deleteAc: false
    })
  },
  shelfTo() {
    let arr = this.data.releaseList
    arr[this.data.currentIndex].downAc = true
    this.setData({
      currentIndex: -1,
      shelfAc: !this.data.shelfAc,
      deleteAc: false,
      releaseList: arr
    })
    wx.showToast({
      title: '下架成功',
      icon: 'success',
      duration: 2000
    })
  },
  deletes() {
    this.setData({
      deleteAc: !this.data.deleteAc,
      shelfAc: false,
    })
  },
  deleteTo() {
    let arr = this.data.releaseList
    arr.splice(this.data.currentIndex, 1)
    this.setData({
      currentIndex: -1,
      deleteAc: !this.data.deleteAc,
      shelfAc: false,
      releaseList: arr
    })
    wx.showToast({
      title: '已删除',
      icon: 'success',
      duration: 2000
    })
  },
  modelHide() {
    this.setData({
      shelfAc: false,
      deleteAc: false
    })
  },
  toDetail() {
    wx.navigateTo({
      url: '../../../base/productDetail/productDetail',
    })
  }
})