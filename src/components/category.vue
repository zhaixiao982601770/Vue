<template>

  <div>

    <div class="jd_layout">
      <!-- 底部通栏-->
      <header class="jd_topBar">
        <a @click="toIndex()" class="icon_back"></a>
        <form action="#">
          <input type="search" placeholder="顶部搜索栏" />
        </form>
        <a href="#" class="icon_menu"></a>
      </header>

      <!-- 分类主体-->
      <div class="jd_main">
        <div class="jd_cateLeft">
          <ul class="clearFix">
            <li class=""><a @click="toCategoryUser()">用户信息</a></li>
            <li class="now"><a href="javascript:;">理发店信息</a></li>
            <li class=""><a @click="addHair()">添加理发店</a></li>
          </ul>
        </div>
        <div class="jd_cateRight">
          <div class="jd_cateRight_box">
            <div class="hot">
              <ul class="clearFix">

                <li class="mui-table-view-cell mui-transitioning" v-for="list in tHairList">
                  <div class="mui-slider-right mui-disabled">
                    <a class="mui-btn mui-btn-yellow" @click="toCategoryHairEdit(list.id)">修改</a>
                    <a class="mui-btn mui-btn-red" @click="toDeleteHairById(list.id)">删除</a>
                  </div>

                  <div class="mui-slider-handle" style="transform: translate(0px,0px);">
                    <div class="oa-contact-cell mui-table">
                      <div class="oa-contact-avatar mui-table-cell">
                        <img :src="list.storePic" />
                      </div>
                      <div class="oa-contact-content mui-table-cell">
                        <div class="mui-clearfix">
                          <h4 class="oa-contact-name">{{list.storeName}}</h4>
                          <p class="oa-contact-position mui-h6">店主：{{list.userName}}</p>
                        </div>
                        <p class="oa-contact-email mui-h6">
                          电话：{{list.tel}}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>



          </div>
        </div>

      </div>


    </div>


  </div>

</template>

<script>
  export default {
    name: 'category',
    data() {
      return {
        tHairList: []
      }
    },
    methods: {
      addHair: function() {
        this.$router.push({
          path: '/categoryAddHair'
        })
      },
      toDeleteHairById: function(id) {
        console.log(id)
        var that = this
        that.id=id
        this.$mui.confirm('是否退出登录', '退出', ['否', '是'], function(e) {
          console.log(that.id)
          if (e.index == 1) {
            that.$http({
                method: 'get',
                url: 'http://localhost:8080/removeTHairById/' + that.id,
                data: {}
              }).then(function(res) {
                console.log(res)
              })
              .catch(function(error) {
                console.log(error)
              })
            that.$mui.toast('刪除成功')
            that.$router.go(0) //主页刷新
          }
        })
      },
      toIndex: function() {
        this.$router.push({
          path: '/'
        })
      },
      toCategoryUser: function() {
        this.$router.push({
          path: '/categoryUser'
        })
      },
      toCategoryHairEdit: function(HairId) {
        console.log('id' + HairId)
        this.$router.push({
          path: '/categoryHairEdit',
          query: {
            id: HairId
          }
        })
      },
      getHairList: function() {

        var that = this

        this.$http({
          method: 'post',
          url: 'http://localhost:8080/getAllTHair',
          data: {
            model: {},
            orderParams: [],
            pageNum: 0,
            pageSize: 100
          }
        }).then(function(res) {
          console.log(res)
          that.tHairList = res.data.content.list
        }).catch(function(err) {
          console.log(err)
          that.$mui.toast('获取理发店列表信息失败')

        })
      }
    },
    mounted: function() {
      this.getHairList()
    }

  }
</script>

<style scoped="scoped">
  @import url("../assets/css/base.css");
  @import url("../assets/css/category.css");

  .mui-clearfix {
    width: 80%;
    margin: auto;
    /* text-align: left; */
  }

  .title {
    margin: 20px 15px 10px;
    color: #6d6d72;
    font-size: 15px;
  }

  .oa-contact-cell.mui-table .mui-table-cell {
    padding: 11px 0;
    vertical-align: middle;
  }

  .oa-contact-cell {
    position: relative;
    margin: -11px 0;
  }

  .oa-contact-avatar {
    width: 75px;
    height: 75px;
  }

  .oa-contact-avatar img {
    /*  border-radius: 60%; */
    width: 75px;
    height: 75px;
  }

  .oa-contact-content {
    width: 100%;
  }

  /* .oa-contact-name {
    margin-right: 5px;
  } */

  /* .oa-contact-name,
  oa-contact-position {
    float: left;
    margin-right: 10px;
  } */
</style>
