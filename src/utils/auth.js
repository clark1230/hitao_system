import Cookies from 'js-cookie'

const TokenKey = 'token'
const PermissionKey = 'permission'
var currentDate = new Date()
currentDate.setTime(currentDate.getTime() + 2 * 60 * 60 * 1000)

export function getToken() {
  return Cookies.get(TokenKey)
}

export function getPermissions() {
  return Cookies.get(PermissionKey)
}
export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: currentDate })
}

export function setPersmissions(permission) {
  return Cookies.set(PermissionKey, permission, { expires: currentDate })
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}

