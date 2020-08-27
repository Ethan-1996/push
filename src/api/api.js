import request from '@/utils/request'


const Header = "https://www.taoliutui.com"

// const Header = "/api"

const getNickByPheUrl= Header + '/index/Login/getNickByPhe'; //通过手机号获取店铺名字
export function getNickByPhe(query) {
  return request({
    params:query,
    url: getNickByPheUrl,
    method: 'get'
  })
}




const indexUrl= Header + '/index/Homepage/index'; //获取首页数据
export function index(info) {
  return request({
    url: indexUrl,
    method: 'get',
    headers:{"user-info":info.user_info,"user-id":info.user_id}
  })
}



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


const checkCompeteGoodsUrl= Header + '/index/Goods/checkCompeteGoods'; //分析竞品数据
export function checkCompeteGoods(data,info) {
  return request({
    data:data,
    url: checkCompeteGoodsUrl,
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


const getUploadIntegralUrl= Header + '/index/Goods/getUploadIntegral'; //获取 要扣除的积分 
export function getUploadIntegral(info) {
  return request({
    url: getUploadIntegralUrl,
    method: 'get',
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



const checkoutCouponUrl= Header + '/index/goods_coupon_state/checkoutCoupon'; //下架前  检测优惠卷是否有效
export function checkoutCoupon(data,info) {
  return request({
    data:data,
    url: checkoutCouponUrl,
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


const getPlatformUrl= Header + '/index/Platform/getPlatform'; //获取 平台 类型
export function getPlatform(info) {
  return request({
    url: getPlatformUrl,
    method: 'get',
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
export function getSalesVolume(info) {
  return request({
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

// 2020.6。30  关注 竞品部分
const addAttentionUrl= Header + '/index/Attention/addAttention'; //关注  竞品 
export function addAttention(query,info) {
  return request({
    params:query,
    url: addAttentionUrl,
    method: 'get',
    headers:{"user-info":info.user_info,"user-id":info.user_id}
  })
}



const getAttentionUrl= Header + '/index/Attention/getAttention'; //关注 列表
export function getAttention(query,info) {
  return request({
    params:query,
    url: getAttentionUrl,
    method: 'get',
    headers:{"user-info":info.user_info,"user-id":info.user_id}
  })
}


const cancelAttentionUrl= Header + '/index/Attention/cancelAttention'; // 取消  关注
export function cancelAttention(query,info) {
  return request({
    params:query,
    url: cancelAttentionUrl,
    method: 'get',
    headers:{"user-info":info.user_info,"user-id":info.user_id}
  })
}


const getAttentionExtensionUrl= Header + '/index/Attention/getAttentionExtension'; // 获取单个 关注竞品的 数据
export function getAttentionExtension(query,info) {
  return request({
    params:query,
    url: getAttentionExtensionUrl,
    method: 'get',
    headers:{"user-info":info.user_info,"user-id":info.user_id}
  })
}
