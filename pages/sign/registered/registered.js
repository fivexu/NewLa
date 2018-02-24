Page({
  data: {
    topData: {
      currentIndex: 0,
      first: '输入邮箱号',
      next: '输入验证码',
      last: '设置密码'
    },
    passwordShow: false,
    getAgin: false,
    getAginTime: 60,
    error: false,
    userEmail: '',
    errorText: '',
    protocol: false,
    email: false,
    code: false,
    codeTrue: false,
    passwordSame: false,
    passwordText: '',
    password: false,
    confirmPassword: false,
    confirmPasswordText: '',
    currentIndex: 0,
    verify: ''
  },
  toProtocol() {
    wx.navigateTo({
      url: '../../../base/protocol/protocol',
    })
  },
  userEmail(ev) {
    let val = ev.detail.value
    let rel = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
    if (rel.test(val)) {
      this.setData({
        email: true,
        userEmail: ev.detail.value
      })
    } else {
      this.setData({
        email: false
      })
    }
  },
  pact() {
    this.setData({
      protocol: !this.data.protocol
    })
  },
  timeoutAgin() {
    this.setData({
      getAgin: false,
      getAginTime: 60
    })
    let timer = null
    clearInterval(timer)
    timer = setInterval(() => {
      this.data.getAginTime--
      this.setData({
        getAginTime: this.data.getAginTime
      })
      if (this.data.getAginTime <= 0) {
        clearInterval(timer)
        this.setData({
          getAgin: true
        })
      }
    }, 1000)
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
    let _this = this
    if (!this.data.email) {
      this.setData({
        error: true,
        errorText: '请填写正确的邮箱地址'
      })
    } else if (!this.data.protocol) {
      this.setData({
        error: true,
        errorText: '请勾选并阅读同意用户协议'
      })
    } else {
      wx.showLoading({
        title: '正在发送邮件'
      })
      wx.request({
        url: 'http://49.51.41.227/newlaAdmin/index.php/login/send_verify',
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
          email: _this.data.userEmail
        },
        success: function (res) {
          let data = res.data
          wx.hideLoading()
          if (data.code == 200) {
            _this.setData({
              currentIndex: 1,
              'topData.currentIndex': 1,
              verify: data.verify
            })
          } else if (data.code == 405 || data.code == 401) {
            _this.setData({
              error: true,
              errorText: '该用户已存在,请直接登录或重新注册'
            })
            _this.timeoutError()
          } else {
            _this.setData({
              error: true,
              errorText: '注册失败,请稍后重试'
            })
            _this.timeoutError()
          }
        },
        fail: function (res) {
          console.log(res)
        }
      })
      this.timeoutAgin()
    }
    this.timeoutError()
  },
  getAginBtn() {
    if (!this.data.getAgin) {
      return
    }
    let _this = this
    wx.showLoading({
      title: '正在重新发送邮件'
    })
    wx.request({
      url: 'http://49.51.41.227/newlaAdmin/index.php/login/send_verify',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        email: _this.data.userEmail
      },
      success: function (res) {
        let data = res.data
        wx.hideLoading()
        if (data.code == 200) {
          _this.setData({
            currentIndex: 1,
            'topData.currentIndex': 1,
            verify: data.verify
          })
        }
        if (data.code == 405) {
          _this.setData({
            error: true,
            errorText: '该用户已存在,请直接登录或重新注册'
          })
          _this.timeoutError()
        }
      },
      fail: function (res) {
      }
    })
    this.timeoutAgin()
  },
  userCode(ev) {
    let val = ev.detail.value
    if (this.data.verify == '') {
      return
    }
    if (val.length === 4) {
      this.setData({
        code: true
      })
    } else {
      this.setData({
        code: false
      })
    }
    if (parseInt(val) === this.data.verify) {
      this.setData({
        codeTrue: true
      })
    } else {
      this.setData({
        codeTrue: false
      })
    }
  },
  lastTo() {
    if (!this.data.codeTrue) {
      this.setData({
        error: true,
        errorText: '请填写正确的验证码'
      })
    } else {
      this.setData({
        currentIndex: 2,
        'topData.currentIndex': 2
      })
    }
    this.timeoutError()
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
        passwordSame: true,
        confirmPasswordText: ev.detail.value
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
    let _this = this
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
        title: '正在注册...'
      })
      wx.request({
        url: 'http://49.51.41.227/newlaAdmin/index.php/login/register',
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
          confirmPassword: _this.data.confirmPasswordText,
          password: _this.data.passwordText,
          email: _this.data.userEmail
        },
        success: function (res) {
          wx.hideLoading()
          if (res.data.code === 412) {
            _this.setData({
              error: true,
              errorText: '密码不一致，请再次确认'
            })
          } else if (res.data.code === 403) {
            _this.setData({
              error: true,
              errorText: '该用户已经存在'
            })
          } else if (res.data.code === 200) {
            wx.showToast({
              title: '注册成功',
              icon: 'success',
              duration: 1000
            })
            setTimeout(() => {
              wx.switchTab({
                url: '../../mine/mine',
              })
            }, 1000)
          } else {
            wx.showToast({
              title: '注册失败,请重新注册',
              icon: 'none',
              duration: 1000
            })
          }
          _this.timeoutError()
        }
      })
    }
  }
})