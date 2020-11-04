import { fetchPost } from '../server/network'

// 帮助中心文章列表
export const articleList = (id, page, size) =>
  fetchPost('/hh/hh.article.list', {
    id: id, // 文章ID
    page: page, // 当前第几页
    size: size // 每页多少
  })
