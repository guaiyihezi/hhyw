import { fetchPost } from '../server/network'
import utils from '../util/util'

export const sendBuryingPointInfo = ({
  click_position = '',
  referer = document.referrer,
  url = document.location.href,
  deviceID = utils.getDeviceID()
}) =>
  process.env.NODE_ENV === 'production' &&
  fetchPost('/hh/hh.page.view.info', {
    click_position: click_position,
    referer: referer,
    url: url,
    deviceID: deviceID
  })
