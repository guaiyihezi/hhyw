import { fetchPost } from '../server/network'

// 热门关键词
export const searchKeywordList = () => fetchPost('/hh/hh.search.keyword.list')
