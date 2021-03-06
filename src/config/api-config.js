const host = 'http://localhost:8200/'

module.exports = {
  // 系统账号
  loginAPI: host + 'authc/account/login',
  logoutAPI: host + ' authc/account/logout',

  // 网关接口
  gatewayAPI: host + 'system/gatewayApiDefine/gatewayApiDefineAjax', // 网关接口
  gatewayFindOne: host + 'system/gatewayApiDefine/findOne', // 根据编号查询网关信息
  addGateway: host + 'system/gatewayApiDefine/addGatewayApiDefine', // 添加网关
  editGateway: host + 'system/gatewayApiDefine/editGatewayApiDefine', // 修改网关接口
  deleteGateway: host + 'system/gatewayApiDefine/deleteByIds', // 删除网关接口
  refreshRoute: host + 'refreshRoute', // 动态刷新路由接口

  // 系统角色接口
  removeShopRole: host + 'authc/shopRole/remove', // 删除系统角色接口
  removeBatchShopRole: host + 'authc/shop/removeBatch', // 批量删除系统角色接口

  // 系统用户接口
  addShopAdmin: host + 'authc/shopAdmin/addShopAdmin', // 添加系统用户接口
  shopAdminFindOne: host + 'authc/shopAdmin/findOne', // 查找系统用户接口
  editShopAdmin: host + 'authc/shopAdmin/editShopAdmin', // 编辑系统用户接口
  deleteShopAdmin: host + 'authc/shopAdmin/deleteById', // 删除系统用户接口
  shopAdminCheckExists: host + 'authc/shopAdmin/checkExists', // 检查用户是否存在接口

  // 菜单接口
  shopMenuAPI: host + 'authc/shopMenu/shopMenuData',
  saveShopMenu: host + 'authc/shopMenu/save', // 保存系统菜单接口
  findShopMenu: host + 'authc/shopMenu/findOne',
  updateShopMenu: host + 'authc/shopMenu/update', // 编辑权限信息
  removeShopMenu: host + 'authc/shopMenu/remove', // 删除权限
  removeBatchShopMenu: host + 'authc/shopMenu/removeBatch', // 批量删除权限

  // 商品接口
  shopGoodsAPI: host + 'system/shopGoods/shopGoodsAjax',

  // 品牌接口
  shopBrandAPI: host + 'system/shopBrand/shopBrandAjax',

  // 类目接口
  shopGoodsCategoryAPI: host + 'system/shopGoodsCategory/ajaxCate'
}
