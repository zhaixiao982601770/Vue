<template>

  <div v-if="">
    <header class="mui-bar mui-bar-nav">
      <a class="mui-icon mui-pull-left" @click="toIndex()">
        <</a> <a style="font-size: 0.9375rem;line-height: 1.5625rem;" class="mui-icon mui-pull-right" @click="toEditHair()">编辑
      </a>
      <h1 class="mui-title">商店信息</h1>
    </header>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell">
        <img class="mui-media-object mui-pull-left" :src="hairInfo.storePic">
         <h3>{{hairInfo.storeName}}</h3> 
      </li>
      <li class="mui-table-view-cell">
        <a class="">
          地址:{{hairInfo.address}}
        </a>
      </li>
      <li class="mui-table-view-cell">
        <a class="">
          电话:{{hairInfo.tel}}
        </a>
      </li>
      <li class="mui-table-view-cell">
        <a class="">
          折扣价:￥{{hairInfo.newPrice}}
        </a>
      </li>
      <li class="mui-table-view-cell">
        <a class="">
          原价:￥{{hairInfo.oldPrice}}
        </a>
      </li>

      <button @click="logOut" type="button" class="mui-btn-block mui-btn mui-btn-blue">安全退出</button>
    </ul>


  </div>

</template>

<script>
  export default {
    name: '',
    data() {
      return {
        userInfo: {},
        hairInfo:{}
      }
    },
    methods: {
      logOut: function() {
        this.$deleteCookie('userName')
        this.$mui.toast('安全退出')
        this.$router.push('/')
      },
      toIndex: function() {
        this.$router.push('/')
      },
      toEditHair: function() {
        // this.$router.push({
        // 	name: 'userEdit',params:userInfo
        // })
        //console.log('test')
        //console.log(this.userInfo)
        this.$router.push({
          name: 'hairEdit',
          params: {
            "hairInfo": this.hairInfo
          }
        })
      },
      getUserInfo: function() {
        var that = this

        this.$http({
          url: "http://localhost:8080/getTUserByName/" + that.$getCookie('userName'),
          method: 'post',
          data: {}
        }).then(function(res) {
          console.log(res.data.content)
          that.userInfo = res.data.content
          that.getTHairByRealName(that.userInfo.realname)
        }).catch(function(err) {
          that.$mui.toast('获取用户信息失败')
          console.log(err)
        })

      },
      getTHairByRealName: function(name) {

        var that = this

        this.$http({
          url: "http://localhost:8080/getTHairByRealName/" + name,
          method: 'post',
          data: {}
        }).then(function(res) {
          console.log(res)
          that.hairInfo = res.data.content
        }).catch(function(err) {
          that.$mui.toast('获取商店信息失败')
          console.log(err)
        })
      }
    },
    mounted: function() {

      if (this.$getCookie('userName') == null) {
        this.$mui.alert('你还没有登录')
        this.$router.push('/')
      } else {
        this.getUserInfo()
      }
    }
  }
</script>

<style scoped="scoped">
  @import url("../assets/css/mui.min.css");
  @import url("../assets/css/app.css");
</style>
