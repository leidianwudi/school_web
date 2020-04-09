<template>
	<div>
		<header>
			<div class="header_test content">
				<img src="@/assets/header_tag.png" alt="">
				<span class="title">选课系统</span>
			</div>
		</header>
		<!-- 头部标题框 -->
		

        <div class="content main_position">
			<div class="path_now">
				<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item><a href="/">选课</a></el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<div class="main">
				<div class="search">
					<div class="search_box">
						<span class="search_test">查&nbsp;询&nbsp;方&nbsp;式&nbsp;:</span>
						<el-radio-group v-model="radio" @change="radioChange">
							 <el-radio v-model="radio" label="1">按院校或专业查询</el-radio>
							 <el-radio v-model="radio" label="2">按科目查询</el-radio>
						</el-radio-group>
					</div>
					
					<div class="search_box" v-show="radioStatic == 1">
						<span class="search_test">院&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;校&nbsp;&nbsp;:</span>
						   <el-select v-model="school" clearable placeholder="按院校查专业或科目" filterable @change="schoolSelect">
						     <el-option
						       v-for="item in schoolList"
						       :key="item.school"
						       :label="item.school"
						       :value="item.school">
						     </el-option>
						   </el-select>
					</div>
					
					<div class="search_box" v-show="radioStatic == 1">
						<span class="search_test">专业&nbsp;(&nbsp;类&nbsp;)&nbsp;&nbsp;:</span>
						   <el-select v-model="profession" clearable placeholder="按专业查院校或科目" filterable @change="majorSelect">
						     <el-option
						       v-for="item in majorList"
						       :key="item.profession"
						       :label="item.profession"
						       :value="item.profession">
						     </el-option>
						   </el-select>
					</div>
					
					<div class="search_box" v-show="radioStatic == 2">
						<span class="search_test">首&nbsp;选&nbsp;科&nbsp;目&nbsp;:</span>
						   <el-select v-model="firstSubject" clearable placeholder="物理或历史均可" filterable>
						     <el-option
						       v-for="item in firstSubjectList"
						       :key="item.subject1"
						       :label="item.subject1"
						       :value="item.subject1">
						     </el-option>
						   </el-select>
					</div>
					
					<div class="search_box" v-show="radioStatic == 2">
						<span class="search_test">再&nbsp;选&nbsp;科&nbsp;目&nbsp;:</span>
						   <el-select v-model="secondSubject" clearable placeholder="不提再选科目要求" filterable>
						     <el-option
						       v-for="item in secondSubjectList"
						       :key="item.subject2"
						       :label="item.subject2"
						       :value="item.subject2">
						     </el-option>
						   </el-select>
					</div>
					
					<el-button type="warning" class="search_btn" @click="seek()">立即查询</el-button>
					<p class="tips_test" v-show="radioStatic == 1">*&nbsp;院校或专业&nbsp;（&nbsp;类&nbsp;）任选其一即可直接查询</p>
					<p class="tips_test">*&nbsp;选课走班指南仅供参考，请根据实际情况进行选课</p>
				</div>
			</div>
			<div class="instruction">
				<span style="font-weight:700;">说明：</span>此次公布2021年拟在闽招生的普通高校及招生专业，届时实际招生的学校和专业以当年公布为准。
				各高校选考科目要求以本科专业为单位设定首选科目要求、再选科目以及再选科目要求。
				首选科目要求包括仅物理、仅历史、物理或历史均可3种；再选科目包括政治、地理、化学、生物4科，根据再选科目数量，
				选考要求分为“考生必须选考该科目方可报考”（1科）、“考生均须选考方可报考”（2科）、
				“考生选考其中1门即可报考”（2科）和“不提再选科目要求”。招生专业选考科目要求提供2018年进入高中一年级学生选科参考，
				学生可根据自身兴趣爱好及特长，结合拟报考高校及专业的选考科目要求，合理确定选考科目。
			</div>
			
			<div class="search-result">
				<div>
					<div style="font-size:14px;margin-bottom:20px;line-height:2em;">
						<p>
							<span>当前查询条件为&nbsp;&nbsp;&nbsp;</span>
							<span v-show="radioStatic == 1">未选择院校或专业&nbsp;(&nbsp;类&nbsp;)</span>
							<span v-show="radioStatic == 2">未选择首选科目、再选科目</span>
						</p>
					</div>
				</div>
				<p v-show="!successQequest && radioStatic == 1">请在上方输入院校或专业（类）进行查询</p>
				<p v-show="!successQequest && radioStatic == 2">请在上方输入首选科目、再选科目进行查询</p>
				
				<!-- 查询结果表格 -->
				  <el-table
					 v-show="successQequest"
					:data="tableData"
					stripe
					border
					style="width: 100%">
					<el-table-column
					  prop="school"
					  label="院校">
					</el-table-column>
					
					<el-table-column
					  prop="profession"
					  label="招生专业(类)">
					</el-table-column>
					
					<el-table-column
					  prop="professionSub"
					  label="包含专业"
					  width="350">
					</el-table-column>
					
					<el-table-column
					  prop="subject1"
					  label="首选科目要求">
					</el-table-column>
					
					<el-table-column
					  prop="subject2"
					  label="再选科目要求">
					</el-table-column>
				  </el-table>
				  
					<div class="block" v-show="successQequest">
						<el-pagination
							@size-change = "countSizeChange"
							@current-change= "pageChange"
							:page-count = "dataNum"
							:current-page="currentPage"
							:page-sizes="[10, 30, 50, 100, 200]"
							:page-size="count"
							layout="total, sizes, prev, pager, next, jumper"
							:total="dataNum"
							style="display:inline-block;">							
						</el-pagination>
					</div>
			</div>
			
			<div class="qrcode">
				<img src="@/assets/qrcode.png" alt="">
				<p>手机扫码获取选课走班指南</p>
			</div>
		</div>
		
		
		<footer>
			<div class="content">
				............... 
			</div>
		</footer>
		<!-- 底部框 -->
	</div>
</template>

<script>
import api from "@/api/api.js";
import util from "@/utils/util.js";
  export default {
    data () {
      return {
        radio: '1',  //单选框
		schoolList: [],  //院校列表
		schoolListCopy: [],  //院校列表备份
		majorList: [], //专业列表
		majorListCopy: [], //专业列表备份
		
		firstSubjectList: [],  //首选科目
		secondSubjectList: [], //再选科目
				
		radioStatic: 1, //单选框状态
		school: '',  //院校输入框的值
		profession: '',  //专业输入框的值
		firstSubject: '',  //首选科目输入框的值
		secondSubject: '', //再选科目输入框的值
		successQequest: false, //控制搜索结果表格显示
		tableData: [],  //搜索结果
		currentPage: 1,  //当前页数
		dataNum: null, //表格数据总数
		count: 30,  //每页数据条数
      };
    },
	methods:{
		//搜索按钮
		seek(){
			if(this.radioStatic == 1 && this.school == '' && this.profession == ''){
				this.$message.error('院校或专业必须输入至少一项');
				return;
			}else if(this.radioStatic == 2 && this.firstSubject == '' && this.secondSubject == ''){
				this.$message.error('首选科目和再选科目必须输入至少一项');
				return;
			};
			this.getSubject();
		},
		//操作分页
		pageChange(e){
			if(e > this.currentPage){
				++this.currentPage;
				this.getSubject();
			};
			if(e < this.currentPage){
				--this.currentPage;
				this.getSubject();
			};
			this.currentPage = e;
		},
		//查询可选的专业课程函数封装
		getSubject(){
			let postData = {
				page: this.currentPage,
				count: this.count
			};
			if(!util.isEmpty(this.school)) postData.school = this.school;
			if(!util.isEmpty(this.profession)) postData.profession =  this.profession;
			if(!util.isEmpty(this.firstSubject)) postData.subject1 = this.firstSubject;
			if(!util.isEmpty(this.secondSubject)) postData.subject2 =  this.secondSubject;
			api.getSubject(postData, (res)=>{
				let data = api.getData(res);
				this.tableData = data;
				this.dataNum = res.data.total;
			});
			this.successQequest = true;
		},
		//每页数据条数改变
		countSizeChange(e){
			this.count = e;
			this.getSubject();
		},
		//单选框点击
		radioChange(v){
			this.radioStatic = v;
		},
		//按院校查询专业
		schoolSelect(e){
			this.getMajorList();
		},
		//按专业查询院校
		majorSelect(e){
			this.getSchoolList();
		},
		//获取院校列表
		getSchoolList(){
			let postData = {
				page: 1, 
				count: 9999
			};
			if(!util.isEmpty(this.school)) postData.school = this.school;
			if(!util.isEmpty(this.profession)) postData.profession =  this.profession;
			api.getSchool(postData, (res)=>{
				let data = api.getData(res);
				this.schoolList = data;
				this.schoolListCopy = data;
			});
		},
		//获取专业列表
		getMajorList(){
			let postData = {
				page: 1, 
				count: 9999
			};
			if(!util.isEmpty(this.school)) postData.school = this.school;
			if(!util.isEmpty(this.profession)) postData.profession = this.profession;
			api.getProfession(postData, (res)=>{
				let data = api.getData(res);
				this.majorList = data;
				this.majorListCopy = data;
			});
		},
		//获取首选科目列表
		getfirstSubjectList(){
			let postData = {
				page: 1, 
				count: 9999
			};
			api.getSubject1(postData, (res)=>{
				let data = api.getData(res);
				data.forEach((item, index) => {
					this.firstSubjectList.push(item);
					this.firstSubjectListCopy = this.firstSubjectList;
				})
			});
		},
		//获取再选科目列表
		getSecondSubjectList(){
			let postData = {
				page: 1, 
				count: 9999
			};
			api.getSubject2(postData, (res)=>{
				let data = api.getData(res);
				data.forEach((item, index) => {
					this.secondSubjectList.push(item);
					this.secondSubjectListCopy = this.secondSubjectList;
				})
			});
		},
	},
	created() {
		this.getSchoolList();   //获取院校列表
		this.getMajorList();	//获取专业列表
		this.getfirstSubjectList();  //获取首选科目列表
		this.getSecondSubjectList();  //获取再选科目列表
	}
  }
</script>

<style>
body{
	background-color: #e8e8e8;
	color: rgba(0,0,0,.65);
	background-image:url(../../assets/background_img.png);
}
.content{
	width: 1002px;
	margin:auto;
}
.main_position{
	position:relative;
}
header{
	box-sizing: border-box;
	height: 55px;
	line-height: 44px;
	border-top: 2px solid #e8312d;
	border-bottom: 1px solid #cccccc;
	font-size: 20px;
	font-family: '微软雅黑 Bold', '微软雅黑';
	background-color: #fff;
}
.header_test{
	height: 55px;
	font-weight: 700;
	display:flex;
	align-items:center;
}
.title{
	margin-left:10px;
}
footer{
	width:100%;
	height: 60px;
	line-height: 60px;
	font-size: 14px;
	color: #fff;
	background-color: #e8312d;
	text-align:center;
	margin-top:237px;
}
.path_now{
	height:46px;
	font-size: 14px;
	display:flex;
	align-items:center;
}
.main{
	width:100%;
	height: 348px;
	background: url(../../assets/main_img.png) no-repeat;
	color: #fff;
	font-size:14px;
}
.search{
	height:348px;
	width: 352px;
	float: right;
	margin-right: 197px;
	padding-top:78px;
	box-sizing:border-box;
}
.search_box{
	margin-bottom:20px;
}
.search_test{
	margin-right:10px;
	font-weight: 700;
}
.search_btn{
	padding:10px;
	font-size: 14px;
	background-color:#EF891E;
	width:100%;
}
.tips_test{
	margin-top:7px;
}
.el-radio__input.is-checked + .el-radio__label {
  color: #fd7624 !important;
}
.el-radio__input.is-checked .el-radio__inner {
  background: #fd7624 !important;
  border-color: #fd7624 !important;
}
.instruction{
	height: 110px;
	background-color: #33a5f3;
	color: #fff;
	line-height: 2em;
	padding-top: 6px;
	padding-right: 20px;
	padding-left: 20px;
	word-break: break-all;
	word-wrap: break-word;
	font-size:12px;
}
.search-result{
	background-color: #fff;
	padding: 20px 20px 30px;
	margin-bottom: 35px;
	box-sizing: border-box;
	font-size:14px;
}
.qrcode{
	position: absolute;
	left: 1030px;
	top: 327px;
	width: 130px;
	padding: 20px;
	background-color: rgba(0,0,0,0.1);
	color: #fff;
	font-size: 14px;
	text-align: center;
	border-radius: 4px;
}
.qrcode>img{
	width:90px;
	height:90px;
}
.qrcode>p{
	padding:5px 17px 0;
}
.block{
	display:flex;
	align-items: center;
	justify-content:flex-end;
	margin-top:20px;
}
</style>
