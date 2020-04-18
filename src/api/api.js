import httpUtil from '@/utils/http.js';

//网络操作封装
const api = {
	//取返回数据内,code数据
	getCode: function(res) {return res.data.code},
	
	//取返回数据内,msg数据
	getMsg: function(res) {return res.data.msg},
	
	//取返回数据内,data数据
	getData: function(res) {return res.data.data},
	
	//查询再选科目
	getSubject2: function(postData, funSuccess) {httpUtil.post('school/getSubject2', postData, funSuccess);},
	
	//查询专业
	getProfession: function(postData, funSuccess) {httpUtil.post('school/getProfession', postData, funSuccess);},
	
	//查询学校
	getSchool: function(postData, funSuccess) {httpUtil.post('school/getSchool', postData, funSuccess);},
	
	//查询首选科目
	getSubject1: function(postData, funSuccess) {httpUtil.post('school/getSubject1', postData, funSuccess);},
	
	//查询可选的专业课程
	getSubject: function(postData, funSuccess) {httpUtil.post('subject/getSubject', postData, funSuccess);},
	
	//按学校或专业统计百分比
	getSubjectPer: function(postData, funSuccess) {httpUtil.post('subject/getSubjectPer', postData, funSuccess);},
	
	//按首选和再选统计百分比
	getProfessionPer: function(postData, funSuccess) {httpUtil.post('subject/getProfessionPer', postData, funSuccess);},
}
export default api;