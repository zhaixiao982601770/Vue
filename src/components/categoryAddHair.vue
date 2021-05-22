<template>

  <div>

    <div class="jd_layout">
      <!-- 底部通栏-->
      <header class="jd_topBar">
        <a href="javascript:history.back(-1)" class="icon_back"></a>
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
            <li class=""><a @click="toCategory()">理发店信息</a></li>
            <li class="now"><a>添加理发店</a></li>
          </ul>
        </div>
        <div class="jd_cateRight">
          <div class="jd_cateRight_box">
            <div><input type="text" v-model="storeName" placeholder="请输入商店名">
            </div>
            <div><input type="text" v-model="address" placeholder="请输入地址">
            </div>
            <div><input type="text" v-model="storeDescribe" placeholder="请输入理发店描述">
            </div>
            <div>
              <select style="height: 35px;width:200px;margin-left:-39px;margin-bottom: 12px;" v-model="userName">
                <option :value="list.realname" v-for="list in tUserList">{{list.realname}}</option>
              </select>
              <span class="mui-icon mui-icon-arrowdown" style="margin-top:-20px ;"></span>
            </div>
            <div><input type="text" v-model="tel" placeholder="联系电话">
            </div>
            <div><input type="text" v-model="newPrice" placeholder="折扣价格">
            </div>
            <div><input type="text" v-model="oldPrice" placeholder="折扣前价格">
            </div>
            <div><a style="margin-left: auto;">头像:</a><input type="file" @change="uploadHeadPic">
            </div>
            <div><input type="button" @click="saveHair" class="" value="保存">
              <input type="button" @click="toAddHair" class="" value="取消">
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
        storeName: '',
        address: '',
        storeDescribe: '',
        userName: '',
        tel: '',
        newPrice: '',
        oldPrice: '',
        storePic: '',
        tUserList: [],
        userInfo: {}
      }
    },
    methods: {
      toAddHair: function() {
        this.$router.go(0)
      },
      toCategory: function() {
        this.$router.push('/category')
      },
      toCategoryUser: function() {
        this.$router.push('/categoryUser')
      },
      /* 獲取所有普通用戶的信息 */
      findAllUserByGender: function() {
        var that = this
        this.$http({
          method: 'post',
          url: 'http://localhost:8080/getAllTUser',
          data: {
            model: {
              gender: 2
            },
            orderParams: [],
            pageNum: 0,
            pageSize: 100
          }
        }).then(function(res) {
          console.log(res)
          that.tUserList = res.data.content.list
        }).catch(function(err) {
          console.log(err)
          that.$mui.toast('获取用户列表信息失败')
        })
      },
      /* 實現保存添加功能 */
      saveHair: function() {

        var that = this

        this.$http({
          method: 'post',
          url: 'http://localhost:8080/addTHair',
          data: {
            address: that.address,
            newPrice: that.newPrice,
            oldPrice: that.oldPrice,
            storeDescribe: that.storeDescribe,
            storeName: that.storeName,
            storePic: that.storePic,
            storeStatus: 0,
            tel: that.tel,
            userName: that.userName
          }
        }).then(function(res) {
          if (res.data.code == 200) {
            // that.$setCookie('token',res.data.content)
            that.$mui.alert('添加成功!')
            that.getAllUerByRealName() //添加成功后，根據用戶真實名字獲取用戶信息
            that.$router.push('/category')
          } else {
            that.$mui.alert('注册失败，原因：' + res.data.msg)
          }
        }).catch(function(err) {
          console.log(err)
          that.$mui.toast('获取添加信息失败')
        })
      },
      //根據用戶真實名字獲取用戶信息
      getAllUerByRealName:function() {
        var that = this
        this.$http({
            method: 'post',
            url: 'http://localhost:8080/getTUserByRealName/' + that.userName,
            data: {}
          }).then(function(res) {
            console.log(res);
            if (res.data.code == 200) {
              that.userInfo =res.data.content
              that.changeGender() //根據查詢的用戶信息的id改變用戶的身份
            } else {
              console.log(res.data.code)
            }
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      //根據查詢的用戶信息的id改變用戶的身份
      changeGender: function() {
        var that = this
        this.$http({
          method: 'put',
          url: 'http://localhost:8080/updateTUser',
          data: {
            id: that.userInfo.id,
            gender: 3
          }
        }).then(function(res) {
          console.log(res)
          if (res.data.code == 200) {
            console.log('用戶身份修改成功')
          } else {
            console.log('用戶身份修改失敗')
          }
        }).catch(function(err) {
          console.log(err)
        })
      },

      uploadHeadPic: function(e) {
        console.log('uploadHeadPic')
        let that = this;
        if (e.target.files.length !== 0) {
          var formData = new FormData()
          formData.append('image_data', e.target.files[0]);
          this.$http.post('http://localhost:8080/upload/addImage', formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            }
          }).then(response => {
            console.log('upload success')

            that.storePic = (that.$http.defaults.baseURL + "/static/" + e.target.files[0].name)
          })
        }
      }
    },
    mounted: function() {
      this.findAllUserByGender()
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
