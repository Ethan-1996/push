import request from '@/utils/request'


// const Header = "http://business.com"
// const Header = "http://tlt.yanxuandan.com"

const Header = "/api"

const IndexUrl= Header + '/index/Login/sendCode'; //发送手机验证码
export function sendCode(query) {
  return request({
    params:query,
    url: IndexUrl,
    method: 'get'
  })
}

const addUserUrl= Header + '/index/Login/addUser'; //用户注册
export function addUser(data) {
  return request({
    data:data,
    url: addUserUrl,
    method: 'post'
  })
}

const forgetPassUrl= Header + '/index/Login/forgetPass'; //忘记密码
export function forgetPass(data) {
  return request({
    data:data,
    url: forgetPassUrl,
    method: 'post'
  })
}

const checkUserUrl= Header + '/index/Login/checkUser'; //用户登录
export function checkUser(data) {
  return request({
    data:data,
    url: checkUserUrl,
    method: 'post'
  })
}

const goodsIndexUrl= Header + '/index/Goods/index'; //数据分析获取数据
export function goodsIndex(data,info) {
  return request({
    data:data,
    url: goodsIndexUrl,
    method: 'post',
    headers:{"user-info":info.user_info,"user-id":info.user_id}
  })
}

const checkCouponUrl= Header + '/index/Goods/checkCoupon'; //检测优惠券
export function checkCoupon(data,info) {
  return request({
    data:data,
    url: checkCouponUrl,
    method: 'post',
    headers:{"user-info":info.user_info,"user-id":info.user_id}
  })
}

const saveGoodsCouponUrl= Header + '/index/Goods/saveGoodsCoupon'; //保存商品信息，优惠券信息
export function saveGoodsCoupon(data,info) {
  return request({
    data:data,
    url: saveGoodsCouponUrl,
    method: 'post',
    headers:{"user-info":info.user_info,"user-id":info.user_id}
  })
}

const getStateNumUrl= Header + '/index/goods_coupon_state/getStateNum'; //获取各状态数量
export function getStateNum(info) {
  return request({
    url: getStateNumUrl,
    method: 'post',
    headers:{"user-info":info.user_info,"user-id":info.user_id}
  })
}

const getGoodsListUrl= Header + '/index/goods_coupon_state/getGoodsList'; //获取各状态数量
export function getGoodsList(data,info) {
  return request({
    data:data,
    url: getGoodsListUrl,
    method: 'post',
    headers:{"user-info":info.user_info,"user-id":info.user_id}
  })
}

const editLowerUrl= Header + '/index/goods_coupon_state/editLower'; //下架
export function editLower(data,info) {
  return request({
    data:data,
    url: editLowerUrl,
    method: 'post',
    headers:{"user-info":info.user_info,"user-id":info.user_id}
  })
}


const editRemarkUrl= Header + '/index/goods_coupon_state/editRemark'; //备注
export function editRemark(data,info) {
  return request({
    data:data,
    url: editRemarkUrl,
    method: 'post',
    headers:{"user-info":info.user_info,"user-id":info.user_id}
  })
}

const editDeleteUrl= Header + '/index/goods_coupon_state/editDelete'; //删除
export function editDelete(data,info) {
  return request({
    data:data,
    url: editDeleteUrl,
    method: 'post',
    headers:{"user-info":info.user_info,"user-id":info.user_id}
  })
}


const getSingleGoodsUrl= Header + '/index/goods_coupon_state/getSingleGoods'; //查看
export function getSingleGoods(data,info) {
  return request({
    data:data,
    url: getSingleGoodsUrl,
    method: 'post',
    headers:{"user-info":info.user_info,"user-id":info.user_id}
  })
}


const getCouponUrl= Header + '/index/goods_coupon_state/getCoupon'; //获取优惠劵领取数量
export function getCoupon(data,info) {
  return request({
    data:data,
    url: getCouponUrl,
    method: 'post',
    headers:{"user-info":info.user_info,"user-id":info.user_id}
  })
}


const getShowGoodsListUrl= Header + '/index/effect/getGoodsList'; //获取show页面列表数据
export function getShowGoodsList(data,info) {
  return request({
    data:data,
    url: getShowGoodsListUrl,
    method: 'post',
    headers:{"user-info":info.user_info,"user-id":info.user_id}
  })
}


const getSalesVolumeUrl= Header + '/index/effect/getSalesVolume'; //获取show页面图表信息
export function getSalesVolume(data,info) {
  return request({
    data:data,
    url: getSalesVolumeUrl,
    method: 'post',
    headers:{"user-info":info.user_info,"user-id":info.user_id}
  })
}


const showInfoUrl= Header + '/index/Center/showInfo'; //获取 个人中心 信息
export function showInfo(info) {
  return request({
    url: showInfoUrl,
    method: 'get',
    headers:{"user-info":info.user_info,"user-id":info.user_id}
  })
}


const getRechargeUrl= Header + '/index/Order/getRecharge'; //获取 充值 类型
export function getRecharge(info) {
  return request({
    url: getRechargeUrl,
    method: 'get',
    headers:{"user-info":info.user_info,"user-id":info.user_id}
  })
}


const getOrderListUrl= Header + '/index/Order/getOrderList'; //获取 充值 列表
export function getOrderList(query,info) {
  return request({
    params:query,
    url: getOrderListUrl,
    method: 'get',
    headers:{"user-info":info.user_info,"user-id":info.user_id}
  })
}

const addInvoiceUrl= Header + '/index/Invoice/addInvoice'; //申请发票
export function addInvoice(data,info) {
  return request({
    data:data,
    url: addInvoiceUrl,
    method: 'post',
    headers:{"user-info":info.user_info,"user-id":info.user_id}
  })
}

const getInvoiceListUrl= Header + '/index/Invoice/getInvoiceList'; //获取 发票 列表
export function getInvoiceList(query,info) {
  return request({
    params:query,
    url: getInvoiceListUrl,
    method: 'get',
    headers:{"user-info":info.user_info,"user-id":info.user_id}
  })
}

const editInvoiceUrl= Header + '/index/Invoice/editInvoice'; //修改发票信息
export function editInvoice(data,info) {
  return request({
    data:data,
    url: editInvoiceUrl,
    method: 'post',
    headers:{"user-info":info.user_info,"user-id":info.user_id}
  })
}


const receivedInvoiceUrl= Header + '/index/Invoice/receivedInvoice'; //确认收到发票
export function receivedInvoice(query,info) {
  return request({
    params:query,
    url: receivedInvoiceUrl,
    method: 'get',
    headers:{"user-info":info.user_info,"user-id":info.user_id}
  })
}
