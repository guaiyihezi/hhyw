import { ENUM } from '../../const/enum'

export const NAV = [
  {
    id: 0,
    name: '参与中', // 已报名未出价 + 竞价中
    status: [ENUM.C2B_STATUS.HAS_ENROLL, ENUM.C2B_STATUS.COMPETING]
  },
  {
    id: 1,
    name: '未中拍',
    status: ENUM.C2B_STATUS.MISSED
  },
  {
    id: 2,
    name: '已中拍',
    status: ENUM.C2B_STATUS.WINNING
  }
]

export const STATUS_TXT = {
  CONNOT_COMPETE: '当前无法出价',
  CON_COMPETE: '当前您可出价',
  IS_LEADING: '当前您已领先',
  NOT_LEADING: '当前您被超越，可继续加价',
  TIMEOUT: '订单超时',
  WIN: '恭喜您已中拍',
  SUCCESS: '恭喜您竞拍成功',
  ST_CANCEL: '商品已下架'
}
