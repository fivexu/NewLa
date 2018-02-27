// home 获取商品列表
export function getHomeProduct(fn) {
  let url = 'http://192.106.0.104/newlaadmin/index.php/goods/goodsShow'
  wx.request({
    url: url,
    method: 'GET',
    success: function (res) {
      fn(res)
    }
  })
}