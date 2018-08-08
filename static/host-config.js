var host = 'http://192.168.3.146:8200/'
var imageHost = 'http://192.168.3.146:8096/'
window.g = {
  AXIOS_TIMEOUT: 10000, // 配置网络超时
  ApiUrl: host, // 配置服务器地址,
  ImageHost: imageHost + 'static/',
  api: {
    // 系统账号
    loginAPI: host + 'authc/account/login', // 系统登陆接口
    logoutAPI: host + ' authc/account/logout', // 系统注销接口

    // 网关接口
    gatewayAPI: host + 'system/gatewayApiDefine/gatewayApiDefineAjax', // 网关接口
    gatewayFindOne: host + 'system/gatewayApiDefine/findOne', // 根据编号查询网关信息
    addGateway: host + 'system/gatewayApiDefine/addGatewayApiDefine', // 添加网关
    editGateway: host + 'system/gatewayApiDefine/editGatewayApiDefine', // 修改网关接口
    deleteGateway: host + 'system/gatewayApiDefine/deleteByIds', // 删除网关接口
    refreshRoute: host + 'refreshRoute', // 动态刷新路由接口

    // 系统角色接口
    removeShopRole: host + 'authc/shopRole/remove', // 删除系统角色接口
    removeBatchShopRole: host + 'authc/shopRole/removeBatch', // 批量删除系统角色接口
    shopRoleAPI: host + 'authc/shopRole/showData',
    shopRoleFindOne: host + 'authc/shopRole/findOne',
    addShopRole: host + 'authc/shopRole/save',
    updateShopRole: host + 'authc/shopRole/update',
    findAllShopRole: host + 'authc/shopRole/findAll', // 查询系统角色信息接口

    // 系统用户接口
    shopAdminAPI: host + 'authc/shopAdmin/showData', // 获取管理员分页数据
    addShopAdmin: host + 'authc/shopAdmin/save', // 添加系统用户接口
    shopAdminFindOne: host + 'authc/shopAdmin/findOne', // 查找系统用户接口
    editShopAdmin: host + 'authc/shopAdmin/update', // 编辑系统用户接口
    deleteShopAdmin: host + 'authc/shopAdmin/remove', // 删除系统用户接口
    deleteBatchShopAdmin: host + 'authc/shopAdmin/removeBatch', // 批量删除系统用户接口
    shopAdminCheckExists: host + 'authc/shopAdmin/checkExists', // 检查用户是否存在接口
    shopAdminGrantRole: host + 'authc/shopAdmin/grantRole', // 授予角色
    shopAdminFindRole: host + 'authc/shopAdmin/findRoleByAdmindId', //  获取角色编号接口

    // 菜单接口
    shopMenuTreeData: host + 'authc/shopMenu/menuTreeData',
    shopMenuAPI: host + 'authc/shopMenu/shopMenuData',
    saveShopMenu: host + 'authc/shopMenu/save', // 保存系统菜单接口
    findShopMenu: host + 'authc/shopMenu/findOne',
    updateShopMenu: host + 'authc/shopMenu/update', // 编辑权限信息
    removeShopMenu: host + 'authc/shopMenu/remove', // 删除权限
    removeBatchShopMenu: host + 'authc/shopMenu/removeBatch', // 批量删除权限

    // 商品接口
    shopGoodsAPI: host + 'system/shopGoods/shopGoodsAjax', // 获取商品信息接口
    saveShopGoods: host + 'system/shopGoods/save', // 保存商品信息接口
    findShopGoods: host + 'system/shopGoods/findOne', // 查询商品信息接口
    updateShopGoods: host + 'system/shopGoods/update', // 编辑商品接口

    // 品牌接口
    shopBrandAPI: host + 'system/shopBrand/shopBrandAjax', // 品牌列表接口
    saveShopBrand: host + 'system/shopBrand/save', // 保存品牌信息接口
    uploadShopBrand: host + 'fileupload/shopBrand/uploadPic', // 品牌图片上传接口
    updateShopBrand: host + 'system/shopBrand/update', // 编辑品牌信息接口
    findShopBrand: host + 'system/shopBrand/findOne', // 获取品牌信息接口
    removeShopBrand: host + 'system/shopBrand/remove', // 删除品牌信息
    removeBatchShopBrand: host + 'system/shopBrand/removeBatch', // 批量删除品牌信息
    shopBrandFindByClassId: host + 'system/shopBrand/findByClassId', // 根据类目编号查询品牌信息

    // 类目接口
    shopGoodsCategoryAPI: host + 'system/shopGoodsCategory/shopGoodsCategoryAjax',
    shopGoodsCategory: host + 'system/shopGoodsCategory/treeData',
    shopGoodsTreeData: host + 'system/shopGoodsCategory/treeData',
    catetoryFindByPId: host + 'system/shopGoodsCategory/findByPId',
    removeShopCategory: host + 'system/shopGoodsCategory/remove',
    saveShopCategory: host + 'system/shopGoodsCategory/save',
    findShopCategory: host + 'system/shopGoodsCategory/findOne',
    updateShopCategory: host + 'system/shopGoodsCategory/update',
    uploadShopCategory: host + 'fileupload/shopGoodsCategory/uploadCategory',

    // 属性模板
    shopGoodsAttrTemp: host + 'system/shopGoodsAttrTemplate/save',
    shopGoodsAttrTemplateAPI: host + 'system/shopGoodsAttrTemplate/findAttr', // 根据类目编号查询模板信息

    // 文件上传接口
    uploadBrandPic: host + 'fileupload/shopBrand/uploadPic', // 上传商品品牌图片

    // 会员信息接口

    shopMemberAPI: host + 'system/shopMember/shopMemberAjax',
    removeShopMember: host + 'system/shopMember/remove',

    // 收货地址接口
    shopAddressAPI: host + 'system/shopAddress/shopAddressAjax',

    // 区域信息接口
    shopAreaAPI: host + 'system/shopArea/shopAreaAjax', // 获取区域信息接口
    saveShopArea: host + 'system/shopArea/save', // 保存区域信息接口
    findParentShopArea: host + 'system/shopArea/findShopArea', // 根据区域名称查询区域信息接口
    findShopArea: host + 'system/shopArea/findOne', // 根据id查询区域信息接口
    updateShopArea: host + 'system/shopArea/update' // 编辑区域信息接口
  }
}
