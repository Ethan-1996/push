import request from '@/utils/request'


const Header = "http://www.taoliutui.com"

// const Header = "/api"

// const IndexUrl= Header + '/index/Login/sendCode'; //发送手机验证码
// export function sendCode(query) {
//   return request({
//     params:query,
//     url: IndexUrl,
//     method: 'get'
//   })
// }

const checkUserUrl= Header + '/admin/Login/checkUser'; //用户登录
export function checkUser(data) {
  return request({
    data:data,
    url: checkUserUrl,
    method: 'post'
  })
}


const getRoleTreeUrl= Header + '/admin/Role/getRoleTree'; //获取 权限列表
export function getRoleTree(info) {
  return request({
    url: getRoleTreeUrl,
    method: 'post',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}

const addRoleUrl= Header + '/admin/Role/addRole'; //新增权限列表
export function addRole(data,info) {
  return request({
    data:data,
    url: addRoleUrl,
    method: 'post',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}



const getAllRoleTreeUrl= Header + '/admin/Role/getAllRoleTree'; //新增权限列表
export function getAllRoleTree(info) {
  return request({
    url: getAllRoleTreeUrl,
    method: 'post',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


const startRoleUrl= Header + '/admin/Role/startRole'; //启用权限列表
export function startRole(data,info) {
  return request({
    data,
    url: startRoleUrl,
    method: 'post',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}

const stopRoleUrl= Header + '/admin/Role/stopRole'; //停用权限列表
export function stopRole(data,info) {
  return request({
    data,
    url: stopRoleUrl,
    method: 'post',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}



const editRoleUrl= Header + '/admin/Role/editRole'; //修改权限列表
export function editRole(data,info) {
  return request({
    data,
    url: editRoleUrl,
    method: 'post',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}

const getRegistIntegUrl= Header + '/admin/Setting/getRegistInteg'; //获取 注册成功积分
export function getRegistInteg(info) {
  return request({
    url: getRegistIntegUrl,
    method: 'post',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}

const getInvitationIntegUrl= Header + '/admin/Setting/getInvitationInteg'; //获取 商家邀请商家 成功积分
export function getInvitationInteg(info) {
  return request({
    url: getInvitationIntegUrl,
    method: 'post',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}

const getUploadIntegUrl= Header + '/admin/Setting/getUploadInteg'; //获取 发布产品 扣除积分
export function getUploadInteg(info) {
  return request({
    url: getUploadIntegUrl,
    method: 'post',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


const addRegistIntegUrl= Header + '/admin/Setting/addRegistInteg'; //添加 注册成功积分
export function addRegistInteg(data,info) {
  return request({
    data,
    url: addRegistIntegUrl,
    method: 'post',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}

const addInvitationIntegUrl= Header + '/admin/Setting/addInvitationInteg'; //添加 商家邀请商家成功积分
export function addInvitationInteg(data,info) {
  return request({
    data,
    url: addInvitationIntegUrl,
    method: 'post',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


const addUploadIntegUrl= Header + '/admin/Setting/addUploadInteg'; //添加 发布成功扣除积分
export function addUploadInteg(data,info) {
  return request({
    data,
    url: addUploadIntegUrl,
    method: 'post',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


const editRegistIntegUrl= Header + '/admin/Setting/editRegistInteg'; //修改 注册成功积分
export function editRegistInteg(data,info) {
  return request({
    data,
    url: editRegistIntegUrl,
    method: 'post',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}



const editInvitationIntegUrl= Header + '/admin/Setting/editInvitationInteg'; //修改 商家邀请商家成功积分
export function editInvitationInteg(data,info) {
  return request({
    data,
    url: editInvitationIntegUrl,
    method: 'post',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


const editUploadIntegUrl= Header + '/admin/Setting/editUploadInteg'; //修改 发布成功扣除积分
export function editUploadInteg(data,info) {
  return request({
    data,
    url: editUploadIntegUrl,
    method: 'post',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


const addAdminUrl= Header + '/admin/Admin/addAdmin'; //添加管理员
export function addAdmin(data,info) {
  return request({
    data,
    url: addAdminUrl,
    method: 'post',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


const getAdminListUrl= Header + '/admin/Admin/getAdminList'; //获取管理员列表
export function getAdminList(data,info) {
  return request({
    params:data,
    url: getAdminListUrl,
    method: 'post',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


const enableAdminUrl= Header + '/admin/Admin/enableAdmin'; //启用管理员
export function enableAdmin(data,info) {
  return request({
    data,
    url: enableAdminUrl,
    method: 'post',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


const editAdminUrl= Header + '/admin/Admin/editAdmin'; //修改管理员
export function editAdmin(data,info) {
  return request({
    data,
    url: editAdminUrl,
    method: 'post',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


const disableAdminUrl= Header + '/admin/Admin/disableAdmin'; //禁用管理员
export function disableAdmin(data,info) {
  return request({
    data,
    url: disableAdminUrl,
    method: 'post',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}

  // 从这里开始 是 管理员设置 业绩总览 的接口 
const bnRegistMonthNumUrl= Header + '/admin/Admin/bnRegistMonthNum'; //获取本月数据
export function bnRegistMonthNum(info) {
  return request({
    url: bnRegistMonthNumUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


const bnRegistMonthNumHtUrl= Header + '/admin/Admin/bnRegistMonthNumHt'; //获取月数据  全年
export function bnRegistMonthNumHt(data,info) {
  return request({
    params:data,
    url: bnRegistMonthNumHtUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}

const bnRegistYearNumHtUrl= Header + '/admin/Admin/bnRegistYearNumHt'; //获取年数据
export function bnRegistYearNumHt(data,info) {
  return request({
    params:data,
    url: bnRegistYearNumHtUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}

const getAllStateAdminsUrl= Header + '/admin/Admin/getAllStateAdmins'; //商家所属列表搜索
export function getAllStateAdmins(data,info) {
  return request({
    params:data,
    url: getAllStateAdminsUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}

const bnRegistMonthNumHtOfAdUrl= Header + '/admin/Admin/bnRegistMonthNumHtOfAd'; //按照月份 
export function bnRegistMonthNumHtOfAd(data,info) {
  return request({
    params:data,
    url: bnRegistMonthNumHtOfAdUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}
const bnRegistYearNumHtOfAdUrl= Header + '/admin/Admin/bnRegistYearNumHtOfAd'; //按照年份 
export function bnRegistYearNumHtOfAd(data,info) {
  return request({
    params:data,
    url: bnRegistYearNumHtOfAdUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


const achieveMentMonthAdminUrl= Header + '/admin/Admin/achieveMentMonth'; // 获取 管理员当月业绩
export function achieveMentMonthAdmin(data,info) {
  return request({
    params:data,
    url: achieveMentMonthAdminUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}

const achieveMentMonthHtUrl= Header + '/admin/Admin/achieveMentMonthHt'; // 获取 管理员年业绩
export function achieveMentMonthHt(data,info) {
  return request({
    params:data,
    url: achieveMentMonthHtUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}








const getAdminAllRoleTreeUrl= Header + '/admin/Admin/getAllRoleTree'; //获取权限
export function getAdminAllRoleTree(info) {
  return request({
    url: getAdminAllRoleTreeUrl,
    method: 'post',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


const getAllAdminsUrl= Header + '/admin/Admin/getAllAdmins'; //获取权限
export function getAllAdmins(info) {
  return request({
    url: getAllAdminsUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}



const getAdminRoleUrl= Header + '/admin/Admin/getAdminRole'; //获取 管理员 已有权限
export function getAdminRole(data,info) {
  return request({
    params:data,
    url: getAdminRoleUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


const addOrEditAdminRoleUrl= Header + '/admin/Admin/addOrEditAdminRole'; //更改 管理员 已有权限
export function addOrEditAdminRole(data,info) {
  return request({
    data:data,
    url: addOrEditAdminRoleUrl,
    method: 'post',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


const getOpenSeaPhonesUrl= Header + '/admin/Callcenter/getOpenSeaPhones'; //获取 公海 未认领电话 列表
export function getOpenSeaPhones(data,info) {
  return request({
    params:data,
    url: getOpenSeaPhonesUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


const claimPhoneUrl= Header + '/admin/Callcenter/claimPhone'; // 认领 公海电话
export function claimPhone(data,info) {
  return request({
    data:data,
    url: claimPhoneUrl,
    method: 'post',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


const getOnePhoneLogUrl= Header + '/admin/Callcenter/getOnePhoneLog'; //获取 电话 联系记录
export function getOnePhoneLog(data,info) {
  return request({
    params:data,
    url: getOnePhoneLogUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}

const awaitPhonesUrl= Header + '/admin/Callcenter/awaitPhones'; //获取 待处理 电话列表
export function awaitPhones(info) {
  return request({
    url: awaitPhonesUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


const backOpenSeaUrl= Header + '/admin/Callcenter/backOpenSea'; //退回 公海
export function backOpenSea(data,info) {
  return request({
    data:data,
    url: backOpenSeaUrl,
    method: 'post',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


const addCallLogUrl= Header + '/admin/Callcenter/addCallLog'; //添加通话记录 
export function addCallLog(data,info) {
  return request({
    data:data,
    url: addCallLogUrl,
    method: 'post',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


const myCalledPhonesUrl= Header + '/admin/Callcenter/myCalledPhones'; //获取 我拨打的 电话 列表
export function myCalledPhones(data,info) {
  return request({
    params:data,
    url: myCalledPhonesUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


const editCalledResultUrl= Header + '/admin/Callcenter/editCalledResult'; // 更改通话记录 
export function editCalledResult(data,info) {
  return request({
    data:data,
    url: editCalledResultUrl,
    method: 'post',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


const getBusinessListUrl= Header + '/admin/Business/getBusinessList'; // 获取商家列表 
export function getBusinessList(data,info) {
  return request({
    params:data,
    url: getBusinessListUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}

const startBusinessUrl= Header + '/admin/Business/startBusiness'; // 启用商家
export function startBusiness(data,info) {
  return request({
    params:data,
    url: startBusinessUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


const stopBusinessUrl= Header + '/admin/Business/stopBusiness'; // 禁用商家
export function stopBusiness(data,info) {
  return request({
    params:data,
    url: stopBusinessUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


const businessEffectUrl= Header + '/admin/Business/businessEffect'; // 获取商家效果展示数据 
export function businessEffect(data,info) {
  return request({
    params:data,
    url: businessEffectUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


const getBusinessAllUrl= Header + '/admin/Business/getBusinessAll'; // 搜索商家 
export function getBusinessAll(data,info) {
  return request({
    params:data,
    url: getBusinessAllUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}



const getGoodsListUrl= Header + '/admin/Goods/getGoodsList'; // 获取 商品列表
export function getGoodsList(data,info) {
  return request({
    data:data,
    url: getGoodsListUrl,
    method: 'post',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


const getSingleGoodsUrl= Header + '/admin/Goods/getSingleGoods'; // 获取 商品 查看 可视化图表信息
export function getSingleGoods(data,info) {
  return request({
    params:data,
    url: getSingleGoodsUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}



const editLowerUrl= Header + '/admin/Goods/editLower'; // 下架商品
export function editLower(data,info) {
  return request({
    params:data,
    url: editLowerUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}

const getCouponUrl= Header + '/admin/Goods/getCoupon'; // 查看领券量
export function getCoupon(data,info) {
  return request({
    params:data,
    url: getCouponUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


const editDeleteUrl= Header + '/admin/Goods/editDelete'; // 删除商品
export function editDelete(data,info) {
  return request({
    params:data,
    url: editDeleteUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


const reviewUrl= Header + '/admin/Goods/review'; // 审核商品
export function review(data,info) {
  return request({
    params:data,
    url: reviewUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}




const getAppealListUrl= Header + '/admin/Appeal/getAppealList'; // 获取申诉列表
export function getAppealList(data,info) {
  return request({
    params:data,
    url: getAppealListUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


const appealAdoptUrl= Header + '/admin/Appeal/appealAdopt'; // 申诉通过
export function appealAdopt(data,info) {
  return request({
    params:data,
    url: appealAdoptUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


const appealFailUrl= Header + '/admin/Appeal/appealFail'; // 申诉不通过
export function appealFail(data,info) {
  return request({
    params:data,
    url: appealFailUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


const deletePlatformWebGoodsUrl= Header + '/admin/Goods/deletePlatformWeb'; // 获取平台
export function deletePlatformWebGoods(data,info) {
  return request({
    params:data,
    url: deletePlatformWebGoodsUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


const getInvoiceListAdUrl= Header + '/admin/Invoice/getInvoiceListAd'; // 获取发票列表
export function getInvoiceListAd(data,info) {
  return request({
    params:data,
    url: getInvoiceListAdUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}

const handleInvoiceUrl= Header + '/admin/Invoice/handleInvoice'; // 开具发票
export function handleInvoice(data,info) {
  return request({
    params:data,
    url: handleInvoiceUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}

const mailInvoiceUrl= Header + '/admin/Invoice/mailInvoice'; // 邮寄发票
export function mailInvoice(data,info) {
  return request({
    data:data,
    url: mailInvoiceUrl,
    method: 'post',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}

const getOrderListAdUrl= Header + '/admin/Order/getOrderListAd'; // 获取充值列表
export function getOrderListAd(data,info) {
  return request({
    params:data,
    url: getOrderListAdUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


const surveyMonthUrl= Header + '/admin/Order/surveyMonth'; // 充值数据 按照月份展示
export function surveyMonth(data,info) {
  return request({
    params:data,
    url: surveyMonthUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


const surveyYearUrl= Header + '/admin/Order/surveyYear'; // 充值数据 按照年份展示
export function surveyYear(data,info) {
  return request({
    params:data,
    url: surveyYearUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


// wode 

const getAccountInfoUrl= Header + '/admin/Center/getAccountInfo'; // 我的信息
export function getAccountInfo(info) {
  return request({
    url: getAccountInfoUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


const myCustomerUrl= Header + '/admin/Center/myCustomer'; // 我的客户
export function myCustomer(data,info) {
  return request({
    params:data,
    url: myCustomerUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


const customerSourceUrl= Header + '/admin/Center/customerSource'; // 客户归属
export function customerSource(data,info) {
  return request({
    params:data,
    url: customerSourceUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


const achieveMentMonthUrl= Header + '/admin/Center/achieveMentMonth'; // 本月业绩
export function achieveMentMonth(info) {
  return request({
    url: achieveMentMonthUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}

const achieveMentHistoryUrl= Header + '/admin/Center/achieveMentHistory'; // 历史业绩
export function achieveMentHistory(data,info) {
  return request({
    params:data,
    url: achieveMentHistoryUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}



// 平台管理
const addPlatformUrl= Header + '/admin/Platform/addPlatform'; // 添加平台类型
export function addPlatform(data,info) {
  return request({
    data:data,
    url: addPlatformUrl,
    method: 'post',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


const getPlatformUrl= Header + '/admin/Platform/getPlatform'; // 获取平台类型
export function getPlatform(info) {
  return request({
    url: getPlatformUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


const editPlatformUrl= Header + '/admin/Platform/editPlatform'; // 修改平台类型
export function editPlatform(data,info) {
  return request({
    data:data,
    url: editPlatformUrl,
    method: 'post',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


const deletePlatformUrl= Header + '/admin/Platform/deletePlatform'; // 删除平台类型
export function deletePlatform(data,info) {
  return request({
    params:data,
    url: deletePlatformUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}




// const addPlatformWebUrl= Header + '/admin/Platformweb/addPlatformWeb'; // 添加平台
// export function addPlatformWeb(data,info) {
//   return request({
//     data:data,
//     url: addPlatformWebUrl,
//     method: 'post',
//     headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
//   })
// }


const getPlatformWebUrl= Header + '/admin/Platformweb/getPlatformWeb'; // 获取平台
export function getPlatformWeb(info) {
  return request({
    url: getPlatformWebUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


const editPlatformWebUrl= Header + '/admin/Platformweb/editPlatformWeb'; // 修改平台
export function editPlatformWeb(data,info) {
  return request({
    data:data,
    url: editPlatformWebUrl,
    method: 'post',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


const deletePlatformWebUrl= Header + '/admin/Platformweb/deletePlatformWeb'; // 删除平台
export function deletePlatformWeb(data,info) {
  return request({
    params:data,
    url: deletePlatformWebUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


// 2020.8.1 新增  商品类目管理


const getCatLeafNameListUrl= Header + '/admin/Catleafname/getCatLeafNameList'; // 类目管理
export function getCatLeafNameList(data,info) {
  return request({
    params:data,
    url: getCatLeafNameListUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


const addSonUrl= Header + '/admin/Catleafname/addSon'; // 新增二级类目 别名
export function addSon(data,info) {
  return request({
    data:data,
    url: addSonUrl,
    method: 'post',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}

const editSonUrl= Header + '/admin/Catleafname/editSon'; // 修改 更正 二级类目 别名
export function editSon(data,info) {
  return request({
    data:data,
    url: editSonUrl,
    method: 'post',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}

const deleteSonUrl= Header + '/admin/Catleafname/deleteSon'; // 删除二级类目 别名
export function deleteSon(data,info) {
  return request({
    data:data,
    url: deleteSonUrl,
    method: 'post',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


/// 转化率部份 

const getCatNameRatioListUrl= Header + '/admin/Catnameratio/getCatNameRatioList'; // 获取 转化率列表
export function getCatNameRatioList(data,info) {
  return request({
    params:data,
    url: getCatNameRatioListUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


const addEditCatNameRatioUrl= Header + '/admin/Catnameratio/addEditCatNameRatio'; // 修改 转化率
export function addEditCatNameRatio(data,info) {
  return request({
    params:data,
    url: addEditCatNameRatioUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}


// 更改平台类型时的 二维数组 
export function addPlatformWeb(data,info) {
  return request({
    url:Header + `/admin/Goods/addPlatformWeb` + data,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}




//获取某个商品已上传的平台
const getPlatformWebGoodsUrl= Header + '/admin/Goods/getPlatformWeb'; 
export function getPlatformWebGoods(data,info) {
  return request({
    params:data,
    url: getPlatformWebGoodsUrl,
    method: 'get',
    headers:{"admin-info":info.admin_info,"admin-id":info.admin_id}
  })
}