import { Message } from 'element-ui'
import { Notification } from 'element-ui'
/**
 * 展示提示信息
 * @param {*} message 提示信息
 * @param {*} type 提示类型
 * @param {*} duration 显示时间
 */
export function showMsg(message, type = 'info', duration = 3000) {
  Message({
    message: message,
    type: type,
    duration: duration
  })
}

/**
 * 展示通知
 * @param {*} title 通知标题
 * @param {*} message 通知消息
 * @param {*} type 通知类型
 * @param {*} duration 显示时间
 */
export function showNotification(title, message, type = 'info', duration = 3000) {
  Notification({
    title: title,
    message: message,
    type: type,
    duration: duration
  })
}
