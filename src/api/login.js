import request from '@/utils/request'

export function loginByUsername(adminName, adminPassword) {
  const data = {
    adminName,
    adminPassword
  }
  return request({
    url: '/account/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/account/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/shopAdmin/info',
    method: 'get',
    params: { token }
  })
}
