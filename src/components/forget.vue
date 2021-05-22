<template>

	<div>

		<header class="mui-bar mui-bar-nav">
			<a class="mui-icon mui-pull-left" @click="toIndex"><</a>
			<h1 class="mui-title">找回密码</h1>
		</header>
		<div class="mui-content">
			<form class="mui-input-group">
				<!--
				<div class="mui-input-row">
					<label>账号</label>
					<input id='account' type="text" class="mui-input-clear mui-input" placeholder="请输入账号">
				</div>
		        -->
				<div class="mui-input-row">
					<label>邮箱</label>
					<input id='email' v-model="email" type="email" class="mui-input-clear mui-input" placeholder="请输入注册邮箱">
				</div>
			</form>
			<div class="mui-content-padded">
				<button id='sendMail' @click="sendEmail" class="mui-btn mui-btn-block mui-btn-primary">提交</button>
			</div>
		</div>


	</div>

</template>

<script>

	export default{
		name:'forget',
		data(){
			return{

			}
		},
		methods:{
      toIndex: function() {
        this.$router.push({
          path: '/'
        })
      },
      sendEmail:function(){
        var that =this
        this.$http('http://localhost:8080/email/sendPasswordToEmail/'+that.email).then(function(res){
          console.log(res)
          if(res.data.code=200){
            that.$mui.alert(res.data.msg)
            that.$router.push('/login')
          }
        }
        )

      }
		}

	}

</script>

<style>

	@import url("../assets/css/mui.min.css");
	@import url("../assets/css/style.css");
	@import url("../assets/css/forget.css");

</style>
