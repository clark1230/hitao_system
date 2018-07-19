import request from '@/utils/request'

export function loginByUsername(adminName, adminPassword) {
  const data = {
    adminName,
    adminPassword
  }
  return request({
    url: '/authc/account/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/authc/account/logout',
    method: 'get'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/authc/shopAdmin/info',
    method: 'get'
  })
}
