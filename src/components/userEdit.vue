<template>

  <div>
    <header class="mui-bar mui-bar-nav">
      <a class="mui-icon mui-pull-left" href="javascript:history.back(-1)">
        <</a> <h1 class="mui-title">修改个人信息</h1>
    </header>
    <form class="mui-input-group">
      <div class="mui-input-row">
        <label>用户名</label>
        <input @change="changeName" v-model="userInfo.username" type="text" class="mui-input-clear" placeholder="请输入">
      </div>
      <div class="mui-input-row">
        <label>真实名字</label>
        <input v-model="userInfo.realname" type="text" class="mui-input-clear" placeholder="请输入">
      </div>

      <div class="mui-input-row">
        <label>密码</label>
        <input @change="changePass" v-model="userInfo.password" type="password" class="mui-input-clear" placeholder="请输入">
      </div>
      <div class="mui-input-row">
        <label>邮箱</label>
        <input v-model="userInfo.email" type="text" class="mui-input-clear" placeholder="请输入">
      </div>
      <div class="mui-input-row">
        <label>电话</label>
        <input v-model="userInfo.tel" type="text" class="mui-input-clear" placeholder="请输入">
      </div>
      <div style="background-color: green;" class="mui-input-row">
        <!-- <label>收货地址</label> -->
        <input type="button" @click="saveUser" class="mui-button-row" value="保存">
      </div>
    </form>


  </div>

</template>

<script>
  export default {
    name: '',
    data() {
      return {
        userInfo: {},
        isChangePass: false,
        oldPass: '',
        isChangeName:false,
        oldName:''
      }
    },
    methods: {
      toLogin: function() {
        this.$router.push({
          path: '/login'
        })
      },
      changePass: function() {
        this.isChangePass = (this.userInfo.password != this.oldPass)
      },
      changeName: function() {
        this.isChangeName = (this.userInfo.username != this.oldName)
      },
      saveUser: function() {
        var that = this

        this.$http({
          method: 'put',
          url: 'http://localhost:8080/updateTUser',
          data: that.userInfo
        }).then(function(res) {
          console.log(res.data.code)
          if (res.data.code == 200) {
            if (that.isChangePass||that.isChangeName) {
              that.$deleteCookie('userName')
              that.$router.push('/login')
              that.$mui.toast('用户名或者密码已经更改，请重新登录')
            } else {
              that.$mui.toast('修改成功')
              that.$router.push('/userCenter')
            }
          } else {
            that.$mui.toast('修改失败')
          }
        }).catch(function(err) {
          console.log(err)
        })
      }
    },
    mounted: function() {
      console.log("已经到了userEdit")
      console.log(this.$route.params.userInfo)
      this.userInfo = this.$route.params.userInfo
      this.oldName=this.userInfo.username
      this.oldPass = this.userInfo.password
    }

  }
</script>

<style scoped="scoped">
  @import url("../assets/css/mui.min.css");
  @import url("../assets/css/app.css");
</style>
