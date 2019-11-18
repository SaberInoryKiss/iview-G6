/*
 * @Author: 夏开尧
 * @Description: file content
 * @Date: 2019-10-14 14:54:58
 * @LastEditTime: 2019-10-14 14:54:58
 * @LastEditors: 夏开尧
 * @UpdateLogs: logs
 */
/**
 * @author AlanChen
 * @module isFilter 用来过滤iview table组件显示内容的函数，决定devices的filter里return的条件
 * @param {Object} item devices的数组项
 * @param {Array} obj table组件props的colums数组
 * @param {String} str 搜索框绑定的searchText
 * @returns {Boolean} true/false 来决定devices的filter的条件
 */
const isFilter = (item,obj,str) => {
    let key = []
    obj.forEach(a => {
        if(a.key){
            key.push(a.key)
        } else if(a.columnData && a.columnData.length) {
            a.columnData.forEach(c => {
                if(c.key) {
                    key.push(c.key)
                }
            })
        }
    })
    let arr = [] 
    key.forEach(a => {
        arr.push(item[a])
    })
    return arr.some(a => {
        //string类型调用toString()会报错，注意区分
        if(a) {
            let b = typeof a != 'string'
                ? a.toString().toLowerCase()
                : a.toLowerCase()
            return b.includes(str.toLowerCase())
        }
    })
}

export default isFilter