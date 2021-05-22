<template>

  <div>
    <header class="mui-bar mui-bar-nav">
      <a class="mui-icon mui-pull-left" @click="toIndex">
        <</a> <h1 class="mui-title">订单信息</h1>
    </header>
    <ul class="mui-table-view">
      <li v-for="list in transInfo" class="mui-table-view-cell mui-media">
        <a href="javascript:;">
          <img class="pic mui-pull-left" :src="list.storePic">
          <div class="mui-media-body">
            店名:{{list.storeName}}
            <p class="mui-media">消费金额:￥<a style="color: coral;"> {{list.price}}</a></p>
            <p class="mui-ellipsis-2">订单创建时间:{{list.createTime}}</p>
            <p class="mui-ellipsis">订单完成时间:{{list.orderTime}}</p>
          </div>
        </a>
      </li>
      <p v-show="transInfo.length==0" class="noProduct">暂无订单</p>
      <li style="background-color: red;" class="mui-table-view-cell mui-media">
        清空信息
      </li>
    </ul>


  </div>

</template>

<script>
  export default {
    name: '',
    data() {
      return {
        userInfo: {},
        transInfo: []
      }
    },
    methods: {
      toIndex: function() {
        this.$router.push({
          path: '/'
        })
      },
      getUserInfo: function() {
        var that = this
        this.$http({
          url: "http://localhost:8080/getTUserByName/" + that.$getCookie('userName'),
          method: 'post',
          data: {}
        }).then(function(res) {
          that.userInfo = res.data.content //将查出来的用户信息保存下来
          that.orderList()
          /* console.log(userInfo) */
        }).catch(function(err) {
          console.log(err)
          that.$mui.toast('获取用户信息失败')
        })

      },
      orderList: function() {
        /* var user=this.userReg */
        console.log(this.userInfo.id)
        var data = {
          model: {
            userId: this.userInfo.id
          },
          orderParams: [
            ''
          ],
          pageNum: 0,
          pageSize: 100 // 默认5 商品分类不会太多
        }
        this.$http.post('http://localhost:8080/getAllTOrder', data).then(res => {
          if (res.data.code == 200) {
            console.log(res)
            this.transInfo = res.data.content.list //将查出来的预约信息保存下来
          } else {
            this.$mui.toast('订单信息查询失败')
          }
        })
      }
    },
    mounted: function() {
      this.getUserInfo()
    }

  }
</script>

<style scoped="scoped">
  @import url("../assets/css/mui.min.css");
  @import url("../assets/css/app.css");

  .pic {
    line-height: 80px;
    max-width: 80px;
    height: 80px;
  }

  .noProduct {
    font-size: 12px;
    margin-top: 10px;
  }
</style>
