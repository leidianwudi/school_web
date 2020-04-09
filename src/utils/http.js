import axios from 'axios';
import config from '@/api/config.js';

axios.defaults.timeout = 5000;
axios.defaults.baseURL ='';


const httpUtil = {
	//进行http的post请求
	post: function(url, postData, funSuccess) {
	    return new Promise((resolve,reject) => {
			axios.post(url = config.BASE_URL + '/api/' + url, postData)
			.then((res) => {
				resolve(funSuccess(res.data));
			},(err) => {
				reject(err)
			})
	   })
	}
}
export default httpUtil;





/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

// export function fetch(url,params={}){
//   return new Promise((resolve,reject) => {
//     axios.get(url,{
//       params:params
//     })
//     .then(response => {
//       resolve(response.data);
//     })
//     .catch(err => {
//       reject(err)
//     })
//   })
// }


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

 // export function post(url,data = {}){
 //   return new Promise((resolve,reject) => {
 //     axios.post(url,data)
 //          .then(response => {
 //            resolve(response.data);
 //          },err => {
 //            reject(err)
 //          })
 //   })
 // }

 /**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

// export function patch(url,data = {}){
//   return new Promise((resolve,reject) => {
//     axios.patch(url,data)
//          .then(response => {
//            resolve(response.data);
//          },err => {
//            reject(err)
//          })
//   })
// }

 /**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

// export function put(url,data = {}){
//   return new Promise((resolve,reject) => {
//     axios.put(url,data)
//          .then(response => {
//            resolve(response.data);
//          },err => {
//            reject(err)
//          })
//   })
// }
