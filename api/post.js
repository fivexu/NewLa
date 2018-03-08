// 图片url
export const releaseUrl = 'http://49.51.41.227/newlaAdmin/index.php/goods/uploadGoodsImg'
export const userUrl = 'http://49.51.41.227/newlaAdmin/index.php/login/change'

// getback 找回
export function postGetBackVerify(data, fn) {
  let url = 'http://49.51.41.227/Newlaadmin/index.php/login/backPwd'
  wx.request({
    url: url,
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    data: data,
    success: function (res) {
      fn(res)
    }
  })
}
export function postGetBack(data, fn) {
  let url = 'http://49.51.41.227/Newlaadmin/index.php/login/savePwd'
  wx.request({
    url: url,
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    data: data,
    success: function (res) {
      fn(res)
    }
  })
}
// registered  注册
export function posRegisteredVerify(data, fn) {
  let url = 'http://49.51.41.227/newlaAdmin/index.php/login/send_verify'
  wx.request({
    url: url,
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    data: data,
    success: function (res) {
      fn(res)
    }
  })
}

// bind 绑定
export function postBindVerify(data, fn) {
  let url = 'http://49.51.41.227/newlaAdmin/index.php/Login/send_verify'
  wx.request({
    url: url,
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    data: data,
    success: function (res) {
      fn(res)
    }
  })
}
export function postBind(data, fn) {
  let url = 'http://49.51.41.227/newlaAdmin/index.php/Login/bind'
  wx.request({
    url: url,
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    data: data,
    success: function (res) {
      fn(res)
    }
  })
}
export function postBindRegister(data, fn) {
  let url = 'http://49.51.41.227/newlaAdmin/index.php/Login/register'
  wx.request({
    url: url,
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    data: data,
    success: function (res) {
      fn(res)
    }
  })
}

// login 登录
export function postLogin(data, fn) {
  let url = 'http://49.51.41.227/Newlaadmin/index.php/login/userLogin'
  wx.request({
    url: url,
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    data: data,
    success: function (res) {
      fn(res)
    }
  })
}

// user 用户信息
export function postUserGet(data, fn) {
  let url = 'http://49.51.41.227/newlaAdmin/index.php/login/userInfo'
  wx.request({
    url: url,
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    data: data,
    success: function (res) {
      fn(res)
    }
  })
}

export function postUser(data, fn) {
  let url = 'http://49.51.41.227/newlaAdmin/index.php/login/change'
  wx.request({
    url: url,
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    data: data,
    success: function (res) {
      fn(res)
    }
  })
}

// alter 找回
export function postAlter(data, fn) {
  let url = 'http://49.51.41.227/newlaadmin/index.php/login/changePwd'
  wx.request({
    url: url,
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    data: data,
    success: function (res) {
      fn(res)
    }
  })
}

// mine 我的
export function postMineWechatLogin(data, fn) {
  let url = 'http://49.51.41.227/newlaAdmin/index.php/Login/weChatCheck'
  wx.request({
    url: url,
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    data: data,
    success: function (res) {
      fn(res)
    }
  })
}

// release 发布
export function postRelease(data, fn) {
  let url = 'http://49.51.41.227/newlaAdmin/index.php/goods/uploadGoods'
  wx.request({
    url: url,
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    data: data,
    success: function (res) {
      fn(res)
    }
  })
}

// productDetail 商品详情
export function postDetailTalk(data, fn) {
  let url = 'http://49.51.41.227/newlaadmin/index.php/goods/messageTo'
  wx.request({
    url: url,
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    data: data,
    success: function (res) {
      fn(res)
    }
  })
}
