// import { request } from '../config/axios.back';

// /**
//  * @param { appid secrect code grant_type	}
//  * 获取关注用户openId
//  */
// export const getOpenId = (params) => request('https://api.weixin.qq.com/sns/oauth2/access_token',params,'get');

// export const wechatShareAPI = (params) => request('/common/verification/mobile',params,'get');

// export const mock = (params) => request('/info',params,'get')

// export const getIndexBannar = () => request('/client/index/index_bannar', params, 'get')

// import {get, post} from '../config/fetch'
import  http from '../config/axios'

export const getIndexBannar = (params) => http.get('/client/index/index_bannar', params)

export const getGoodsInfo = (params) => http.get('/client/index/goods_info', params)

export const getUserinfo = (params) => http.get('/client/user/userinfo', params)

export const getOrders = (params) => http.get('/client/user/orders', params)

export const cardActive = (params) => http.post('/client/order/active', params)

export const getDirectlyRecommended= (params) => http.get('/client/user/down', params)

export const getIndirectRecommended= (params) => http.get('/client/user/all_down', params)

export const getRebateLog= (params) => http.get('/client/user/rebate_log', params)

export const getBlob = (url) => http.getBlob(url)