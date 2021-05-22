<template>

  <div>
    <header class="mui-bar mui-bar-nav">
      <a class="mui-icon mui-pull-left" @click="toIndex">
        <</a> <h1 class="mui-title">修改用户信息</h1>
    </header>
    <form class="mui-input-group">
      <div class="mui-input-row">
        <label>登录名</label>
        <input v-model="usersInfo.username" type="text" class="mui-input-clear" placeholder="请输入">
      </div>
      <div class="mui-input-row">
        <label>真实名字</label>
        <input v-model="usersInfo.realname" type="text" class="mui-input-clear" placeholder="请输入">
      </div>

      <div class="mui-input-row">
        <label>电话</label>
        <input v-model="usersInfo.tel" type="text" class="mui-input-clear" placeholder="请输入">
      </div>
      <div class="mui-input-row">
        <label>邮箱</label>
        <input v-model="usersInfo.email" type="text" class="mui-input-clear" placeholder="请输入">
      </div>
      <div class="mui-input-row">
        <label>身份</label>
        <select style="margin-left:-130px;" v-model="usersInfo.gender">
          <option value="1">管理员</option>
          <option value="2">用户</option>
          <option value="3">商家</option>
        </select>
        <span class="mui-icon mui-icon-arrowdown" style="margin-top: 5px;"></span>
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
        usersInfo: {}
      }
    },
    methods: {
      toIndex: function() {
        this.$router.push({
          path: '/category'
        })
      },
      getUserById:function(id){
        this.$http('http://localhost:8080/getTUserById/' + id).then(res => {
          console.log(res)
          this.usersInfo = res.data.content
        })
      },
      saveUser: function() {
        var that = this

        this.$http({
          method: 'put',
          url: 'http://localhost:8080/updateTUser',
          data: that.usersInfo
        }).then(function(res) {
          console.log(res)
          if (res.data.code == 200) {
            that.$mui.alert('修改成功')
            that.$router.push('/categoryUser')
          } else {
            that.$mui.toast('修改失败')
          }
        }).catch(function(err) {
          console.log(err)
        })
      }
    },
    mounted: function() {
      console.log("已经到了categoryUserEdit")
      console.log(this.$route.query.id)
      this.getUserById(this.$route.query.id)
    }

  }
</script>

<style scoped="scoped">
  @import url("../assets/css/mui.min.css");
  @import url("../assets/css/app.css");
</style>
