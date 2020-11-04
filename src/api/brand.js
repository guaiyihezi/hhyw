import { fetchPost } from '../server/network'

/**
 * Gets the brand list shown in home page
 *
 * @return     {Array}  a list with brand
 */
export const getHomeBrand = () => fetchPost('/hh/hh.home.recommend.brand')

/**
 * Gets the brand list with keyword
 *
 * @param      {String}  keyword  The keyword
 * @return     {Array}  The brand list.
 */
export const getBrandList = keyword =>
  fetchPost('/hh/hh.brand.list', {
    keyword: keyword
  })

/**
 * Gets the hot keyword list.
 *
 * @return     {Array}  The hot keyword list.
 */
export const getHotKeywordList = () => fetchPost('/hh/hh.brand.keyword.list')
