<template>
  <div class="program">
      <div class="programItem" v-for="(item,index) in extensionInfo" :key="index" >
          <!-- <div class="iteminfo">
                <p class="text">原价：
                    <el-tooltip class="item" effect="dark" :content="item.coupon" placement="top">
                        <span>{{item.coupon}}</span>
                    </el-tooltip>
                </p>
          </div> -->
          <div class="iteminfo">
                <p class="text">券后价：
                    <span>{{item.coupon}} 元</span>
                </p>
          </div>

          <div class="iteminfo">
              <p class="text">佣金：<span style="color:red">{{item.commission}}</span></p>
          </div>
          <div class="iteminfo">
              <p class="text">日销量：<span>日销{{item.sale}}单</span></p>
          </div>
          <div class="iteminfo">
              <p class="text">日成交金额：<span>{{item.daily_turnover}}元</span></p>
          </div>
          <div class="topLeft">
              <i :class="item.icon"></i>
              <span>方案{{index + 1}}</span>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name:"Program",
    props:["extensionInfo"],
    watch:{
        extensionInfo:function(newV, oldV){
                // console.log(this.extensionInfo)
            }
    }

}
</script>

<style lang="scss" scoped>
    .program{
        width: 1010px;
        margin: auto;
        display: flex;
        justify-content: space-around;
        margin-top: 70px;
        .programItem{
            width:220px;
            height: 150px;
            border: 1px solid #ccc;
            border-radius: 10px;
            position:relative;
            .topLeft{
                width:90px;
                height:28px;
                border:1px solid #ccc;
                border-radius:15px;
                position:absolute;
                top:-10px;
                left:-10px;
                background:#fff;
                line-height:28px;
                text-align:center;
                span{
                    margin-left:5px;
                }
            }
            .iteminfo{
                width: 178px;
                height: 20px;
                border: 1px solid #8eeaff;
                margin: auto;
                margin-top: 5px;
                .text{
                    width: 174px;
                    height: 16px;
                    line-height: 16px;
                    margin: 2px;
                    background: #ccffff;
                    color: #6fc9e4;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    span{
                        color:#999
                    }
                }
            }
            .iteminfo:nth-of-type(1){
                margin-top: 28px;
            }
        }
    }
</style>