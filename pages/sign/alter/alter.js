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
    if (this.data.oldPasswordText !== '123456') {
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
    } else {
      this.setData({
        currentIndex: 1,
        'topData.currentIndex': 1
      })
    }
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
    if (this.data.passwordText === val && this.data.passwordText.length === val.length) {
      this.setData({
        confirmPassword: true,
        passwordSame: true
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
      wx.redirectTo({
        url: '../../user/user',
      })
    }
    this.timeoutError()
  }
})