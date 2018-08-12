import request from '@/utils/request'
var api = window.g.api
export function loginByUsername(adminName, adminPassword) {
  const data = {
    adminName,
    adminPassword
  }
  return request({
    url: api.loginAPI,
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: api.logoutAPI,
    method: 'get'
  })
}

export function getUserInfo(token) {
  return request({
    url: api.shopAdminInfo,
    method: 'get'
  })
}
