// home 获取商品列表
export function getHomeProduct(fn) {
  let url = 'http://49.51.41.227/newlaadmin/index.php/goods/goodsShow'
  wx.request({
    url: url,
    method: 'GET',
    success: function (res) {
      fn(res)
    }
  })
}

// productDetail  获取商品详情
export function getProductDetail(id, fn) {
  let url = `?goodsId=${id}`
  wx.request({
    url: url,
    method: 'GET',
    success: function (res) {
      fn(res)
    }
  })
}