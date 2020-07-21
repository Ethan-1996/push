<template>
  <div class="program">
      <div class="programItem" v-for="(item,index) in extensionInfo" :key="index" >
          <div class="title">
              <p :style="'color:' + item.icon"></p>
              <p class="word">{{item.icon}}</p>
          </div>
          <div class="item itemMoney">
              <p class="itemTop">
                  {{item.coupon}} <span>元</span>
              </p>
              <p class="name">券后价</p>
          </div>
          <div class="item itemCom">
              <p class="itemTop">
                  {{item.commission}} <span>%</span>
              </p>
              <p class="name">佣金</p>
          </div>
          <div class="item itemMany">
              <p class="itemTop">
                  {{item.sale}} <span>件</span>
              </p>
              <p class="name">日销量</p>
          </div>
          <div class="item itemDayMany">
              <p class="itemTop">
                  {{item.daily_turnover}} <span>元</span>
              </p>
              <p class="name">日成交金额</p>
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
        margin: 60px auto;
        .programItem{
            width: 1000px;
            margin: auto;
            display: flex;
            justify-content: space-between;
            position: relative;
            margin-top: 20px;
            margin-bottom: 45px;
            .title{
                font-size: 14px;
                line-height: 18px;
                color: rgb(17, 17, 17);
                display: flex;
                position: absolute;
                top: -26px;
                p:nth-of-type(1){
                    width:6px;
                    height:17px;
                    background:rgba(1,142,237,1);
                    margin-right: 10px;
                }
            }
            .item{
                width:220px;
                height:70px;
                background:rgba(137,170,244,1);
                border-radius:8px;
                padding: 5px;
                color: #fff;
                .itemTop{
                    font-size: 30px;
                    font-weight: 800;
                    span{
                        font-size: 14px;
                        font-weight: normal;
                    }
                    margin: 12px 0 0 35px;
                }
                .name{
                    font-size: 14px;
                    margin-top: 8px;
                    margin-left: 120px;
                }
            }
            .itemMoney{
                background: url("../../assets/images/itembg1.jpg");
            }
            .itemCom{
                background: url("../../assets/images/itembg2.jpg");
            }
            .itemMany{
                background: url("../../assets/images/itembg3.jpg");
            }
            .itemDayMany{
                background: url("../../assets/images/itembg4.jpg");
            }
        }
    }
</style>