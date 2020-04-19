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
						<span class="search_test">院&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;校&nbsp;:</span>
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
						<span class="search_test">专&nbsp;&nbsp;业&nbsp;&nbsp;(类)&nbsp;:</span>
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
						<span class="search_test">再&nbsp;选&nbsp;科&nbsp;目&#8197;:</span>
						   <el-select v-model="secondSubject" clearable placeholder="不提再选科目要求" filterable>
						     <el-option
						       v-for="item in secondSubjectList"
						       :key="item.subject2"
						       :label="item.subject2"
						       :value="item.subject2">
						     </el-option>
						   </el-select>
					</div>

					<div style="display: flex;">
						<el-button type="warning" class="search_btn" @click="seek()">查询</el-button>
						<el-button type="warning" class="search_btn" @click="seekPercentage()">统计</el-button>
					</div>
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
							<span v-show="!successQequest && radioStatic == 1">未选择院校或专业&nbsp;(&nbsp;类&nbsp;)</span>
							<span v-show="!successQequest && radioStatic == 2">未选择首选科目、再选科目</span>

							<span v-show="successQequest && radioStatic == 1">院校：{{school == '' ? "全部" : school}};
							专业(类)：{{profession == '' ? "全部" : profession}}</span>

							<span v-show="successQequest && radioStatic == 2">首选科目：{{firstSubject == '' ? "不提首选科目要求" : firstSubject}};
							再选科目：{{secondSubject == '' ? "不提再选科目要求" : secondSubject}}</span>
						</p>
					</div>
				</div>
				<p v-show="!successQequest && radioStatic == 1">请在上方输入院校或专业（类）进行查询</p>
				<p v-show="!successQequest && radioStatic == 2">请在上方输入首选科目、再选科目进行查询</p>

				<!-- 查询结果表格 -->
				<div v-show="successQequest == 1">
					<el-table
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

					<div class="block">
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

				<!-- 百分比查询结果 -->
				<div v-show="successQequest == 2">
					<div id="echartsId" style="width:970px;height:400px;"></div>

					<el-table
					:data="perData"
					stripe
					border
					style="width: 100%;margin-top: 40px;">
						<el-table-column
						  :prop="radioStatic == 1 ? 'subject1' : 'pro'"
						  :label="radioStatic == 1 ? '首选科目' : '专业'">
						</el-table-column>

						<el-table-column
						  :prop="radioStatic == 1 ? 'subject2' : 'sum'"
						  :label="radioStatic == 1 ? '再选科目' : '专业类条数'">
						</el-table-column>

						<el-table-column
						  :prop="radioStatic == 1 ? 'sum' : 'sumAll'"
						  :label="radioStatic == 1 ? '符合条件专业数' : '该专业类总条数'">
						</el-table-column>

						<el-table-column
						  prop="per"
						  :label="radioStatic == 1 ? '所占总专业百分比(%)' : '专业类占总专业类百分比(%)'">
						</el-table-column>
					</el-table>

					<div class="block">
						<el-pagination
							@size-change = "perCountSizeChange"
							@current-change= "perPageChange"
							:page-count = "perDataNum"
							:current-page="perCurrentPage"
							:page-sizes="[10, 30, 50, 100, 200]"
							:page-size="perCount"
							layout="total, sizes, prev, pager, next, jumper"
							:total="perDataNum"
							style="display:inline-block;">
						</el-pagination>
					</div>
				</div>

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
		successQequest: false, //控制搜索结果显示

		tableData: [],  //普通搜索结果
		currentPage: 1,  //当前页数
		dataNum: null, //表格数据总数
		count: 30,  //每页数据条数

		perData: [],  //百分比搜索结果
		perCurrentPage: 1,  //当前页数
		perDataNum: null, //表格数据总数
		perCount: 30,  //每页数据条数
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
		//操作百分比查询分页
		perPageChange(e){
			if(e > this.perCurrentPage){
				++this.perCurrentPage;
				this.seekPercentage();
			};
			if(e < this.perCurrentPage){
				--this.perCurrentPage;
				this.seekPercentage();
			};
			this.perCurrentPage = e;
		},
		//百分比查询
		seekPercentage(){
			if(this.radioStatic == 1 && this.school == '' && this.profession == ''){
				this.$message.error('院校或专业必须输入至少一项');
				return;
			}else if(this.radioStatic == 2 && this.firstSubject == '' && this.secondSubject == ''){
				this.$message.error('首选科目和再选科目必须输入至少一项');
				return;
			};
			let postData = {
				page: this.perCurrentPage,
				count: this.perCount
			};
			if (this.radioStatic == 1)
			{
				if(!util.isEmpty(this.school)) postData.school = this.school;
				if(!util.isEmpty(this.profession)) postData.profession =  this.profession;
				this.getSubjectPer(postData);
			}
			if (this.radioStatic == 2)
			{
				if(!util.isEmpty(this.firstSubject)) postData.subject1 = this.firstSubject;
				if(!util.isEmpty(this.secondSubject)) postData.subject2 =  this.secondSubject;
				this.getProfessionPer(postData);
			}
		},
		//制作柱状图
		getChat(sum, per, name, name1){
			let myChart = this.$echarts.init(document.getElementById('echartsId'));
			let option = {
					color: ['#3398DB'],
					tooltip: {
						trigger: 'axis',
						axisPointer: {            // 坐标轴指示器，坐标轴触发有效
							type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
						},
						show: true
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: [
						{
							type: 'category',
							data: name,
							axisTick: {
								alignWithLabel: true
							},
							axisLabel:{
								interval:0,//横轴信息全部显示
								                clickable:true,//并给图表添加单击事件  根据返回值判断点击的是哪里
								                formatter : function(params,index){
								                    if (index % 2 != 0) {
								                        return '\n\n' + params;
								                    }
								                    else {
								                        return params;
								                    }
								                }
							},
						}
					],
					yAxis: [
						{
							type: 'value'
						}
					],
					series: [
						{
							type: 'bar',
							barWidth: '60%',
							data: sum,
							name: '专业类条数'
						},
						{
							type: 'bar',
							barWidth: '0',
							barHeight: '0',
							data: per,
							name: '专业类占总专业类百分比',
							show: false
						}
					]
			};
			myChart.setOption(option);
		},
		//按学校或专业统计百分比
		getSubjectPer(data){
			let getSubject = [];  //存放首选科目和再选科目组装文字
			let getSum = [];   //存放符合条件专业数
			let getPer = [];  //存放所占总专业百分比
			api.getSubjectPer(data, (res)=>{
				this.perData = api.getData(res);
				this.perDataNum = res.data.total;
				let data = api.getData(res).slice(0, 10);  //获取前十条数据
				data.forEach((item, index) => {
					let sub = item.subject1 + "(" + item.subject2 + ")";  //组装科目名称
					getSubject.push(sub);   //添加科目
					getSum.push(item.sum);   //添加专业类条数
					getPer.push(parseFloat(item.per));  //添加所占总专业百分比
				});
				this.getChat(getSum, getPer, getSubject);
				this.successQequest = 2;
			});
		},
		//按首选和再选统计百分比
		getProfessionPer(data){
			let getName = [];  //存放专业名
			let getSum = [];   //存放专业类条数
			let getPer = [];  //存放专业类占总专业类百分比
			let newPer = [];  //存放组装数据
			api.getProfessionPer(data, (res)=>{
				let data = api.getData(res);
				let dataCopy = data.slice(0, 10) //获取前十条数据
				//处理前十条数据(柱状图用)
				dataCopy.forEach((item, index) => {
					getName.push(item.pro);   //添加专业名
					getSum.push(item.sum);   //添加专业类条数
					let num = (parseInt(item.sum) * 100 ) / parseInt(item.sumAll);  //计算专业类占总专业类百分比
					num = num.toFixed(2);  //保留二位小数(数据类型会被改变为string类型)
					getPer.push(parseFloat(num));  //数据类型转为number类型并添加
				});

				//处理全部数据(表格用)
				data.forEach((item, index) =>{
					let num = (parseInt(item.sum) * 100 ) / parseInt(item.sumAll);  //计算专业类占总专业类百分比
					num = num.toFixed(2);  //保留二位小数(数据类型会被改变为string类型)
					let newObj = {};
					newObj.pro = item.pro;
					newObj.sum = item.sum;
					newObj.sumAll = item.sumAll;
					newObj.per = parseFloat(num);
					newPer.push(newObj);
				});

				this.perData = newPer;
				this.perDataNum = res.data.total;
				this.getChat(getSum, getPer, getName);
				this.successQequest = 2;
			});
		},
		//查询可选的专业课程函数封装
		getSubject(){
			let postData = {
				page: this.currentPage,
				count: this.count
			};
			if (this.radioStatic == 1)
			{
				if(!util.isEmpty(this.school)) postData.school = this.school;
				if(!util.isEmpty(this.profession)) postData.profession =  this.profession;
			}
			if (this.radioStatic == 2)
			{
				if(!util.isEmpty(this.firstSubject)) postData.subject1 = this.firstSubject;
				if(!util.isEmpty(this.secondSubject)) postData.subject2 =  this.secondSubject;
			}
			api.getSubject(postData, (res)=>{
				let data = api.getData(res);
				this.tableData = data;
				this.dataNum = res.data.total;
			});
			this.successQequest = 1;
		},
		//每页数据条数改变
		countSizeChange(e){
			this.count = e;
			this.getSubject();
		},
		//百分比每页数据条数改变
		perCountSizeChange(e){
			this.perCount = e;
			this.seekPercentage();
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
	},
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
.block{
	display:flex;
	align-items: center;
	justify-content:flex-end;
	margin-top:20px;
}
</style>
