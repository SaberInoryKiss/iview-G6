import HttpRequest from '@/libs/axios'
import config from '@/config'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
console.log('=========process.env.NODE_ENV==============')
console.log(process)
console.log(process.env)
console.log(process.env.NODE_ENV)
const axios = new HttpRequest(baseUrl)
export default axios
