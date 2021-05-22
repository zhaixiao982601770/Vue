<template>

  <div>


    <header class="mui-bar mui-bar-nav">
      <a @click="toIndex" class="backFont mui-icon mui-pull-left">
        <</a> <h1 class="mui-title">登录</h1>
    </header>
    <div class="mui-content">
      <form id='login-form' class="mui-input-group">
        <div class="mui-input-row">
          <label>账号</label>
          <input id='account' v-model="userName" type="text" class="mui-input-clear mui-input" placeholder="请输入账号">
        </div>
        <div class="mui-input-row">
          <label>密码</label>
          <input id='password' v-model="password" type="password" class="mui-input-clear mui-input" placeholder="请输入密码">
        </div>

        <div class="mui-input-row">
          <label>身份:</label>
          <select id='gender' style="margin-left:-130px;" v-model="gender">
            <option value="1">管理员</option>
            <option value="2">用户</option>
            <option value="3">商家</option>
          </select>
          <span class="mui-icon mui-icon-arrowdown" style="margin-top: 5px;"></span>
        </div>

        <!-- <div class="mui-input-row login_input">
          <label>验证码</label>
          <input type="text" id="verifital_input" class="mui-input" placeholder="请输入验证码">
        </div>
 -->
      </form>

      <div class="mui-content-padded">
        <button id='login' @click="login()" class="mui-btn mui-btn-block mui-btn-primary">登录</button>
        <div class="link-area"><a id='reg' @click="toReg">注册账号</a> <span class="spliter">|</span> <a @click="toForget"
            id='forgetPassword'>忘记密码</a>
        </div>
      </div>
              <!-- 引入验证码组件 -->
      <!-- <div @click="changeCode()" class="mui-input-row">
        <s-identify :identifyCode="identifyCode"></s-identify>
        <a>{{identifyCode}}</a>
      </div> -->
    </div>


  </div>

</template>

<script>
  import sidentify from '@/components/identify'
  export default {
    name: 'login',
    data() {
      return {
        userName: '',
        password: '',
        gender: '',
        // 验证码初始值
        identifyCode: '1234',
        // 验证码的随机取值范围
        identifyCodes: '1234567890'
      }
    },
    methods: {
      login: function() {
        var that = this

        console.log(that.userName + '-' + that.password + '-' + that.gender)
        //实现ajax请求
        this.$http({
            method: 'post',
            url: 'http://localhost:8080/login/user',
            data: {
              username: that.userName,
              password: that.password,
              gender: that.gender
            }
          }).then(function(res) {
            console.log(res);
            if (res.data.code == 200) { //如果返回200，保存网站页面token，并跳转
              console.log(res.data.content)
              that.$setCookie('userName', that.userName)
              that.$userReg = res.data.content
              console.log('打印id');
              console.log(that.$userReg.id)

              that.$mui.toast('登录成功')
              that.$router.push('/')
            } else {
              that.$mui.alert('用户名或者密码错误')
              //that.$mui.toast('登录失败')
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      toReg: function() {
        this.$router.push({
          path: '/reg'
        })
      },
      toForget: function() {
        this.$router.push({
          path: '/forget'
        })
      },
      toIndex: function() {
        this.$router.push({
          path: '/'
        })
      },
      changeCode: function() {
        this.identifyCode = ''
        this.makeCode(this.identifyCodes, 4)
      },
      // 生成一个随机整数  randomNum(0, 10) 0 到 10 的随机整数， 包含 0 和 10
      randomNum: function(min, max) {
        max = max + 1
        return Math.floor(Math.random() * (max - min) + min)
      },
      // 随机生成验证码字符串
      makeCode: function(data, len) {
        for (let i = 0; i < len; i++) {
          this.identifyCode += data[this.randomNum(0, data.length - 1)]
        }
      }
    },
    mounted: function() {
      this.$mui.init({
        swipeBack: true //启用右滑关闭功能
      });

      // 刷新页面就生成随机验证码
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    }

  }
</script>

<style scoped="scoped">
  @import url("../assets/css/mui.min.css");
  @import url("../assets/css/style.css");
  @import url("../assets/css/login.css");
</style>
