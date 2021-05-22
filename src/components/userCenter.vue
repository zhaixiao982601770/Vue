<template>

	<div v-if="">
		<header class="mui-bar mui-bar-nav">
			<a class="mui-icon mui-pull-left" @click="toIndex()"><</a>
			<a style="font-size: 0.9375rem;line-height: 1.5625rem;" class="mui-icon mui-pull-right" @click="toEditUser()">编辑</a>
			<h1 class="mui-title">个人中心</h1>
		</header>
		<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<a class="">
						用户名:{{userInfo.username}}
					</a>
				</li>
        <li class="mui-table-view-cell">
        	<a class="">
        		 真实名字:{{userInfo.realname}}
        	</a>
        </li>
				<li class="mui-table-view-cell">
					<a class="">
						 密码:{{userInfo.password | castToPass}}
					</a>
				</li>
				<li class="mui-table-view-cell">
					<a class="">
						 邮箱:{{userInfo.email}}
					</a>
				</li>
				<li class="mui-table-view-cell">
					<a class="">
						 电话:{{userInfo.tel}}
					</a>
				</li>
				<li @click="toOrder" class="mui-table-view-cell">
					<a class="">
						 你的订单
					</a>
				</li>
				<button @click="logOut" type="button" class="mui-btn-block mui-btn mui-btn-blue">安全退出</button>
			</ul>


	</div>

</template>

<script>

	export default{
		name: '',
		data() {
			return {
				userInfo: {}
			}
		},
		methods: {
			logOut: function() {
				this.$deleteCookie('userName')
				this.$mui.toast('安全退出')
				this.$router.push('/')
			},
			toEditUser: function() {
				// this.$router.push({
				// 	name: 'userEdit',params:userInfo
				// })
				//console.log('test')
				//console.log(this.userInfo)
				this.$router.push({
					name: 'userEdit',
					params: {
						"userInfo": this.userInfo
					}
				})
			},
			toIndex: function() {
				this.$router.push({
					path: '/'
				})
			},
			getUserInfo: function() {
				var that = this

				this.$http({
					url: "http://localhost:8080/getTUserByName/"+that.$getCookie('userName'),
					method: 'post',
					data: {
            username:that.username,
            realname:that.realname,
            password:that.password,
            email:that.email,
            tel:that.tel
          }

				}).then(function(res) {
					console.log(res.data.content)
					that.userInfo = res.data.content
				}).catch(function(err) {
					that.$mui.toast('获取用户信息失败')
					console.log(err)
				})

			}
		},
		filters: {
			castToPass: function(value) {
				var len = value.length
				var res = ''
				for (var i = 0; i < len; i++) {
					res += '*'
				}
				return res
			}
		},
		mounted: function() {

      if(this.$getCookie('userName')==null){
        this.$mui.alert('你还没有登录')
        this.$router.push('/')
      }else{
        this.getUserInfo()
      }
		}
}

</script>

<style scoped="scoped">
	@import url("../assets/css/mui.min.css");
	@import url("../assets/css/app.css");
</style>
