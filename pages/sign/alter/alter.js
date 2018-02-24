import { postLogin, postAlter } from '../../../api/post.js'

Page({
  data: {
    topData: {
      currentIndex: 0,
      first: '输入旧密码',
      next: '输入新密码'
    },
    currentIndex: 0,
    oldPassword: false,
    oldPasswordText: '',
    errorText: '',
    error: false,
    passwordSame: false,
    passwordText: '',
    password: false,
    confirmPassword: false,
    confirmPasswordText: '',
    passwordShow: false,
  },
  inputIn(ev) {
    let val = ev.detail.value
    let n = false
    n = val !== '' ? true : false
    this.setData({
      oldPassword: n,
      oldPasswordText: val
    })
  },
  timeoutError() {
    let timer = null
    clearTimeout(timer)
    timer = setTimeout(() => {
      this.setData({
        error: false
      })
    }, 3000)
  },
  nextTo() {
    console.log(wx.getStorageSync('email'), this.data.oldPasswordText)
    postLogin({
      email: wx.getStorageSync('email'),
      password: this.data.oldPasswordText
    },
      (res) => {
        console.log(res)
        if (res.data.code === 200) {
          this.setData({
            currentIndex: 1,
            'topData.currentIndex': 1
          })
        } else {
          this.setData({
            errorText: '密码错误,请重试',
            error: true
          })
          setTimeout(() => {
            this.setData({
              error: false,
              errorText: ''
            })
          }, 3000)
        }
      })
  },
  userPassword(ev) {
    let val = ev.detail.value
    let rel = /[a-zA-Z]\w{5,17}$/
    if (rel.test(val)) {
      this.setData({
        password: true,
        passwordText: val
      })
    } else {
      this.setData({
        password: false,
        passwordText: ''
      })
    }
  },
  userConfirmPassword(ev) {
    let val = ev.detail.value
    console.log(val)
    if (this.data.passwordText === val && this.data.passwordText.length === val.length) {
      this.setData({
        confirmPassword: true,
        passwordSame: true,
        confirmPasswordText: val
      })
    } else {
      this.setData({
        confirmPassword: false,
        passwordSame: false
      })
    }
  },
  showPassword() {
    this.setData({
      passwordShow: !this.data.passwordShow
    })
  },
  finish() {
    if (!this.data.password) {
      this.setData({
        error: true,
        errorText: '请输入6-18位字符、数字或下滑线'
      })
    } else if (!this.data.confirmPassword) {
      this.setData({
        error: true,
        errorText: '密码不一致，请再次确认'
      })
    } else {
      wx.showLoading({
        title: '修改中',
      })
      postAlter({
        email: wx.getStorageSync('email'),
        password: this.data.oldPasswordText,
        confirmPassword: this.data.confirmPasswordText
      },
        (res) => {
          wx.hideLoading()
          console.log(res)
          if (res.data.code === 200) {
            wx.redirectTo({
              url: '../../user/user',
            })
          } else if (res.data.code === 401) {
            this.setData({
              error: true,
              errorText: '密码不一致，请再次确认'
            })
          } else {
            this.setData({
              error: true,
              errorText: '服务器繁忙,请稍后重试'
            })
          }
        })
    }
    this.timeoutError()
  }
})