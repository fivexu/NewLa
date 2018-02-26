let dataList = require('../../static/data/data.js')
import { timeObj, getDays, getHours, oponCamare, GetDate } from '../../common/js/public.js'
import { postRelease, releaseUrl } from '../../api/post.js'

// 下架默认加一天
let addOneDate = new Date()
let addOneDate2 = new Date(addOneDate)
addOneDate2.setDate(addOneDate.getDate() + 1);

Page({
  data: {
    errorText: '',
    imageSrc: [],
    currentLabel: 0,
    wechatAc: false,
    modalShow: false,
    spikeShow: false,
    spikeShowTime: false,
    spikeShowAc: false,
    productShow: false,
    productShowAc: false,
    productClass: [],
    titleVal: '',
    descriptionVal: '',
    nowPriceVal: '',
    oldPriceVal: '',
    statusVal: '',
    wechatVal: '',
    phoneVal: '',
    labelList: [],
    statusNumber: false,
    address: '请选择您的位置',
    productText: '商品种类',
    years: timeObj.years,
    months: timeObj.months,
    days: timeObj.days,
    hours: timeObj.hours,
    year: addOneDate2.getFullYear(),
    month: (addOneDate2.getMonth() + 1) < 9 ? `0${addOneDate2.getMonth() + 1}` : (addOneDate2.getMonth() + 1),
    day: addOneDate2.getDate() < 9 ? `0${addOneDate2.getDate()}` : addOneDate2.getDate(),
    hour: timeObj.date.getHours() + 1 < 9 ? `0${timeObj.date.getHours() + 1}:00` : `${timeObj.date.getHours() + 1}:00`,
    value: [0, 0, 0, 0]
  },
  onShow: function () {
    if (!wx.getStorageSync('userId')) {
      wx.showModal({
        title: '注意',
        content: '您还未邮箱登录,现在登录?',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../sign/login/login'
            })
          } else if (res.cancel) {
          }
        }
      })
    }
    if (wx.getStorageSync('address')) {
      this.setData({
        address: wx.getStorageSync('address').school
      })
    }
  },
  bindChange: function (e) {
    const val = e.detail.value
    const date = new Date()
    this.setData({
      days: getDays(this.data.months[val[1]], this.data.years[val[0]]),
      hours: (this.data.months[val[1]] > (date.getMonth() + 1)) ? getHours(999) : getHours(this.data.days[val[2]]),
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
      hour: this.data.hours[val[3]]
    })
  },
  statusInput(ev) {
    if (ev.detail.value <= 10) {
      this.setData({
        statusNumber: true
      })
    } else {
      this.setData({
        statusNumber: false
      })
    }
  },
  toAddress() {
    wx.navigateTo({
      url: '../../base/address/address',
    })
  },
  prevent() { },
  _getproductList: function () {
    let _this = this
    _this.setData({
      productClass: dataList.dataList.data.productClass,
      labelList: dataList.dataList.data.labelList
    })
  },
  onLoad: function () {
    this._getproductList()
  },
  close() {
    this.setData({
      modalShow: false
    })
  },
  spike() {
    this.setData({
      spikeShow: !this.data.spikeShow,
      spikeShowTime: !this.data.spikeShowTime
    })
  },
  product() {
    this.setData({
      spikeShowTime: false,
      modalShow: true,
      productShow: true,
      productShowAc: false
    })
    setTimeout(() => {
      this.setData({
        productShowAc: true
      })
    }, 20)
  },
  selectProduct(ev) {
    this.setData({
      productShow: false,
      modalShow: false,
      productText: ev.target.dataset.product,
      productShowAc: false
    })
  },
  setTime() {
    this.setData({
      modalShow: true,
      spikeShowTime: true,
      productShow: false,
      spikeShowAc: false
    })
    setTimeout(() => {
      this.setData({
        spikeShowAc: true
      })
    }, 20)
  },
  openImg(ev) {
    wx.previewImage({
      current: this.data.imageSrc[ev.target.dataset.index],
      urls: this.data.imageSrc
    })
  },
  openCamera() {
    let _this = this
    oponCamare((res) => {
      _this.setData({
        imageSrc: this.data.imageSrc.concat(res)
      })
    }, 8 - this.data.imageSrc.length)
  },
  openCameraWeChart() {
    let _this = this
    oponCamare((res) => {
      this.setData({
        wechatAc: true
      })
    }, 1)
  },
  labelChange(ev) {
    this.setData({
      currentLabel: ev.target.dataset.index,
      label: ev.target.dataset.item
    })
  },
  testFrom(val) {
    if (val.description === '' || val.nowPrice === '' || val.oldPrice === '' || val.title === '' || val.status === '') {
      this.setData({
        errorText: '请填写完整宝贝信息'
      })
    } else if (this.data.imageSrc.length < 3) {
      this.setData({
        errorText: '至少上传3张宝贝照片'
      })
    } else if (this.data.address === '请选择您的位置') {
      this.setData({
        errorText: '请选择您的位置'
      })
    } else if (parseInt(val.status) > 10 || parseInt(val.status) <= 0) {
      this.setData({
        errorText: '新旧程度:请填写1-10之间的数字'
      })
    } else if (val.phone === '') {
      this.setData({
        errorText: '请输入联系电话'
      })
    } else {
      wx.showLoading({
        title: '正在提交',
      })
      if (wx.getStorageSync('address')) {
        wx.removeStorageSync('address')
      }
      this.fromContent(val)
    }
    setTimeout(() => {
      this.setData({
        errorText: ''
      })
    }, 3000)
  },
  fromContent(val) {
    let spikeTime = `${this.data.year}-${this.data.month}-${this.data.day} ${this.data.hour}`
    spikeTime = this.data.spikeShow ? spikeTime : ''
    let labelText = this.data.label
    let imgSrc = this.data.imageSrc
    let _this = this
    let n = 0
    for (let i = 0; i < imgSrc.length; i++) {
      wx.uploadFile({
        url: releaseUrl,
        filePath: imgSrc[i],
        header: {
          "Content-Type": "multipart/form-data"
        },
        name: 'images',
        formData: {
          'id': wx.getStorageSync('userId')
        },
        success: function (res) {
          n++
        }
      })
    }
    if (val.label !== '' && this.data.currentLabel === 'other') {
      labelText = val.label
    }
    postRelease({
      userId: wx.getStorageSync('userId'),
      title: val.title,
      content: val.description,
      address: _this.data.address,
      newPrice: val.nowPrice,
      oldPrice: val.oldPrice,
      types: _this.data.productText,
      spikeTime: spikeTime,
      status: val.status,
      phone: val.phone,
      wechat: val.wechat,
      label: labelText
    },
      (res) => {
        wx.hideLoading()
        wx.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 1000
        })
        _this.setData({
          errorText: '',
          imageSrc: [],
          currentLabel: 0,
          wechatAc: false,
          modalShow: false,
          spikeShow: false,
          spikeShowTime: false,
          spikeShowAc: false,
          productShow: false,
          productShowAc: false,
          productClass: [],
          titleVal: '',
          descriptionVal: '',
          nowPriceVal: '',
          oldPriceVal: '',
          statusVal: '',
          wechatVal: '',
          phoneVal: '',
          statusNumber: false,
          address: '请选择您的位置',
          productText: '商品种类',
          years: timeObj.years,
          months: timeObj.months,
          days: timeObj.days,
          hours: timeObj.hours,
          year: addOneDate2.getFullYear(),
          month: (addOneDate2.getMonth() + 1) < 9 ? `0${addOneDate2.getMonth() + 1}` : (addOneDate2.getMonth() + 1),
          day: addOneDate2.getDate() < 9 ? `0${addOneDate2.getDate()}` : addOneDate2.getDate(),
          hour: timeObj.date.getHours() + 1 < 9 ? `0${timeObj.date.getHours() + 1}:00` : `${timeObj.date.getHours() + 1}:00`,
          value: [0, 0, 0, 0]
        })
      })
  },
  formSubmit(ev) {
    let val = ev.detail.value
    this.testFrom(val)
  },
  deleteImg(ev) {
    let arrs = []
    for (let i = 0; i < this.data.imageSrc.length; i++) {
      if (i !== ev.target.dataset.index) {
        arrs.push(this.data.imageSrc[i])
      }
    }
    this.setData({
      imageSrc: arrs
    })
  }
})