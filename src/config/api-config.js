const host = 'http://localhost:8140/'

module.exports = {
  gatewayAPI: host + 'gatewayApiDefine/gatewayApiDefineAjax', // 网关接口
  gatewayFindOne: host + 'gatewayApiDefine/findOne', // 根据编号查询网关信息
  editGateway: host + 'gatewayApiDefine/editGatewayApiDefine', // 修改网关接口
  deleteGateway: host + 'gatewayApiDefine/deleteByIds' // 删除网关接口
}
