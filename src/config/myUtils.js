// import tMap from 'tMap'
/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return
  return window.localStorage.getItem(name)
}
/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}

/**
 *  获取自身位置
 */
//获取本地地址
// export const myposition = () => {
//   let geolocation = new qq.map.Geolocation('OAABZ-D6BH6-PMJST-M5MET-56X4E-T3BY5', 'myapp')
//   let options = {timeout: 1000}
//   let positionNum = 0
//   let position = []
//   geolocation.getLocation((res) => {
//     position = res
//   }, () => {
//     console.log('定位失败')
//   }, options)
//   return position
// }
