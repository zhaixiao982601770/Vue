<template>

  <div>
    <header class="mui-bar mui-bar-nav">
      <a class="mui-icon mui-pull-left" @click="toIndex">
        <</a> <h1 class="mui-title">你的预约信息</h1>
    </header>
    <ul class="mui-table-view">
      <li v-for="list in transInfo" class="mui-table-view-cell mui-media">
              <div class="mui-slider-right mui-disabled" v-show="list.orderStatus==1">
                <a class="mui-btn mui-btn-yellow" @click="changeStatus(list.id)">接收预约</a>
                <a class="mui-btn mui-btn-red">拒绝预约</a>
              </div>
              <div class="mui-slider-handle">
                <a>
                  <img class="mui-media-object mui-pull-left" :src="list.storePic">
                  <div class="mui-media-body" style="width:270px;float: left;">
                    用户:{{list.userName}}
                    <p class="mui-ellipsis">预约时间:{{list.createTime}}</p>
                  </div>
                  <div class="mui-media-body mui-pull-right" style="width:60px;padding-top: 10px;color:#FF5053;">
                    <span v-if="list.orderStatus==1">待预约</span>
                    <span v-if="list.orderStatus==2">待支付</span>
                  </div>
                </a>
              </div>
            </li>
      <!-- <li @click="toPay" style="background-color: red;" class="mui-table-view-cell mui-media">
        结算订单
      </li> -->
    </ul>


  </div>

</template>

<script>
  export default {
    /* import userInfo from './login.vue' */
    name: 'order',
    data() {
      return {
        transInfo: [],
        hairInfo: {},
        userReg: {}
      }
    },
    methods: {
      toIndex: function() {
        this.$router.push({
          path: '/'
        })
      },
      //根据登录的用户名将用户的真实名字查出来
      getUserInfo: function(name) {
        this.$http.post('http://localhost:8080/getTUserByName/' + name).then(res => {
          console.log(res)
          this.userReg = res.data.content
          this.getHairByUserName(this.userReg.realname)
        })
      },
      /* 根据商家的真实名字查出理发店信息 */
      getHairByUserName: function(realname) {
        console.log(realname)

        this.$http.post('http://localhost:8080/getTHairByRealName/' + realname).then(res => {
          if (res.data.code == 200) {
            console.log(res)
            this.hairInfo = res.data.content //将查出来的预约信息保存下来
          } else {
            this.$mui.toast('理发店信息查询失败')
          }

          this.getOrderHeadByStoreName()
        })
      },
      //根据查理发店的名字查出预约过该理发店的预约订单
      getOrderHeadByStoreName: function() {
        console.log(this.hairInfo.storeName)
        var data = {
          model: {
            storeName: this.hairInfo.storeName
          },
          orderParams: [
            ''
          ],
          pageNum: 0,
          pageSize: 100 // 默认5 商品分类不会太多
        }
        this.$http.post('http://localhost:8080/getAllTOrderHead', data).then(res => {
          if (res.data.code == 200) {
            console.log(res)
            this.transInfo = res.data.content.list //将查出来的信息保存下来
            /* console.log(this.transInfo) */
          } else {
            this.$mui.toast('预约信息查询失败')
          }
        })

      },
      changeStatus1: function(id) {

        console.log(id)
        var that = this

        this.$http({
          method: 'put',
          url: 'http://localhost:8080/updateTOrderHead',
          data: {
            id: id,
            orderStatus: 2
          }
        }).then(function(res) {
          console.log(res.data.code)
          if (res.data.code == 200) {
            that.$mui.toast('接受预约成功')
            that.$router.go(0) //页面刷新
          } else {
            that.$mui.toast('接受预约失败')
          }
        }).catch(function(err) {
          console.log(err)
        })
      },
      changeStatus: function(id) {
        var that=this
        this.$mui.confirm('是否接收预约', '退出', ['否', '是'], function(e) {
          if (e.index == 1) {
            that.changeStatus1(id)
          }
        })
      }


    },
    mounted: function() {
      if (this.$getCookie('userName') == null) {
        this.$mui.alert('你还没有登录，请登录')
        this.$router.push({
          path: '/'
        })
      } else {
        this.getUserInfo(this.$getCookie('userName'))
      }
    }
  }
</script>

<style scoped="scoped">
  @import url("../assets/css/mui.min.css");
  @import url("../assets/css/app.css");
</style>
