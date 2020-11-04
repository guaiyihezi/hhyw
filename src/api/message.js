import { fetchJavaEndPoint } from './WorkorderMessage'
import { fetchPost } from '../server/network'

// 未读消息
export const unReadMsg = () => fetchJavaEndPoint('/workOrderMessage/unRead', 'GET', false, {})

// 获取未读消息列表
export const unReadMsgList = () => fetchJavaEndPoint('/workOrderMessage/list', 'GET', false, {})

// 查询工单详情
export const workorderDetail = number => fetchJavaEndPoint('/workOrder', 'GET', true, number)

// 未读消息设置为已读
export const setReadMsg = id => fetchJavaEndPoint('/workOrderMessage/', 'PUT', true, id)

// 未读消息列表
export const unReadMessageList = (type, page) =>
  fetchPost('/hh/hh.message.list', {
    type: type, // 消息类型
    page: page, // 第N页
    size: 10
  })
// 未读消息数
export const unReadMsgNum = type =>
  fetchPost('/hh/hh.message.unreadNum', {
    type: type // 消息类型
  })
// 置未读为已读
export const saveMagAsReaded = type =>
  fetchPost('/hh/hh.message.read', {
    type: type // 消息类型
  })
// 检查消息是否已失效
export const checkMsgIsValid = (id, paipai_id) =>
  fetchPost('/hh/hh.message.checkNew', {
    id: id, // 消息id
    related_id: paipai_id // 拍拍id
  })
