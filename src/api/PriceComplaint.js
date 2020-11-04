import { fetchJavaHdEndPoint } from './WorkorderMessage'
// 价格投诉详情
export const priceDetail = id => fetchJavaHdEndPoint('/hd/priceComplaint/front/detail/', 'GET', true, id)

//平台一览
export const getPlatformInfo = id => fetchJavaHdEndPoint('/hd/pricePlatform/front/v1/all', 'GET', true, id)

//提交价格投诉
export const postComplaint = params => fetchJavaHdEndPoint('/hd/priceComplaint/front/complaint', 'POST', false, params)
