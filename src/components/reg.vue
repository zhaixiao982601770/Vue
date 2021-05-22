<template>
  <div>


    <header class="mui-bar mui-bar-nav">
      <a href="javascript:history.back()" class="backFont mui-icon mui-pull-left">
        <</a> <h1 class="mui-title">注册</h1>
    </header>
    <div class="mui-content">
      <form class="mui-input-group">
        <div class="mui-input-row">
          <label>账号</label>
          <input id='account' @change="userNameIsReged" type="text" v-model="username" class="mui-input-clear mui-input"
            placeholder="请输入账号">
        </div>
        <div class="mui-input-row">
          <label>密码</label>
          <input id='password' v-model="password" type="password" class="mui-input-clear mui-input" placeholder="请输入密码">
        </div>
        <div class="mui-input-row">
          <label>确认密码</label>
          <input id='password_confirm' v-model="password_confirm" type="password" class="mui-input-clear mui-input"
            placeholder="请确认密码">
        </div>

        <div class="mui-input-row">
          <label>邮箱</label>
          <input id='email' v-model="email" type="email" class="mui-input-clear mui-input" placeholder="请输入邮箱">
        </div>

        <div class="mui-input-row">
          <label>真實名字</label>
          <input id='email' v-model="realname" type="text" class="mui-input-clear mui-input" placeholder="请输入真實名字">
        </div>

        <div class="mui-input-row">
          <label>电话</label>
          <input id='tel' v-model="tel" type="text" class="mui-input-clear mui-input" placeholder="请输入电话">
        </div>
      </form>
      <div class="mui-content-padded">
        <button id='reg' @click="reg()" class="mui-btn mui-btn-block mui-btn-primary">注册</button>
      </div>
      <div class="mui-content-padded">
        <p>请牢记自己的账户和密码，不要告诉他人，以防泄露造成财产安全。</p>
      </div>
    </div>


  </div>


</template>

<script>
  export default {
    name: 'reg',
    data() {
      return {
        username: '',
        password: '',
        password_confirm: '',
        email: '',
        tel:'',
        realname:''
      }
    },
    methods: {
      userNameIsReged: function() { // 用户输入完用户名  立马去后台查询是否被注册
        /* var a =document.getElementById('account')
        console.log(a) */
        var that = this
        this.$http({
            method: 'post',
            url: 'http://localhost:8080/reg/userNameIsReged/' + that.username,
            data: {
              // userName: that.userName,
              // password: that.password
            }
          }).then(function(res) {
            console.log(res);
            if (res.data.code == 200) {
              // that.$setCookie('token',res.data.content)
              // that.$mui.toast('登录成功')
              // that.$router.push('/')
            } else {
              that.$mui.alert('用户名已经被占用')
              that.username = ''
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      reg: function() {
        //if(){} // 对注册信息进行非空校验  以及邮箱格式  密码数字字母长度
        if (this.password != this.password_confirm) {
          this.$mui.alert('两次密码输入的不一致')
          this.password_confirm = ''
          return
        }

        var that = this
        this.$http({
            method: 'post',
            url: 'http://localhost:8080/reg/user',
            data: {
              username: that.username,
              password: that.password,
              email: that.email,
              tel:that.tel,
              realname:that.realname
            }
          }).then(function(res) {
            console.log(res);
            if (res.data.code == 200) {
              // that.$setCookie('token',res.data.content)
              that.$mui.alert('注册成功，请登录')
              that.$router.push('/login')
            } else {
              that.$mui.alert('注册失败，原因：' + res.data.msg)
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }
  }
</script>

<style scoped="scoped">
  @import url("../assets/css/mui.min.css");
  @import url("../assets/css/style.css");
  @import url("../assets/css/reg.css");
</style>
