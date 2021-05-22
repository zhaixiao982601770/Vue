<template>

  <div>
    <header class="mui-bar mui-bar-nav">
      <a class="mui-icon mui-pull-left" @click="toIndex">
        <</a> <h1 class="mui-title">你的预约信息</h1>
    </header>
    <ul class="mui-table-view">
      <li v-for="list in transInfo" class="mui-table-view-cell mui-media" >
              <!-- 根据状态判断是否可以进行支付，如果是预约中不能进行支付，待支付状态可以进行支付 -->
              <a  v-if="list.orderStatus==1">
                <img class="mui-media-object mui-pull-left" :src="list.storePic">
                <div class="mui-media-body" style="width: 280px;float: left;">
                  {{list.storeName}}
                  <p class="mui-ellipsis">预约时间:{{list.createTime}}</p>
                </div>
                <div class="mui-media-body mui-pull-right" style="width:50px;padding-top: 10px;color:#FF5053;">
                  <span v-if="list.orderStatus==1">预约中</span>
                  <span v-if="list.orderStatus==2">待支付</span>
                </div>
              </a>
      
              <a  v-if="list.orderStatus==2" @click="toPay1(list.id)">
                <img class="mui-media-object mui-pull-left" :src="list.storePic">
                <div class="mui-media-body" style="width: 280px;float: left;">
                  {{list.storeName}}
                  <p class="mui-ellipsis">预约时间:{{list.createTime}}</p>
                </div>
                <div class="mui-media-body mui-pull-right" style="width:50px;padding-top: 10px;color:#FF5053;">
                  <span v-if="list.orderStatus==1">预约中</span>
                  <span v-if="list.orderStatus==2">待支付</span>
                </div>
              </a>
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
        userReg: {}
      }
    },
    methods: {
      toIndex: function() {
        this.$router.push({
          path: '/'
        })
      },
      toPay1: function(HairId) {
        this.$router.push({
          path: '/pay1',
          query: {
            id: HairId
          }
        })
      },
      getUserInfo: function(name) {
        this.$http.post('http://localhost:8080/getTUserByName/' + name).then(res => {
          console.log(res)
          this.userReg = res.data.content
          this.orderHeadListById()
        })
      },
      /* 获取预约列表 */
      orderHeadListById: function() {
        /* var user=this.userReg */
        console.log(this.userReg.id)
        var data = {
          model: {
            userId: this.userReg.id
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
            this.transInfo = res.data.content.list //将查出来的预约信息保存下来
          } else {
            this.$mui.toast('预约信息查询失败')
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
