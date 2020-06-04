<template>
  <div class="footer">
      <div class="footerTop">
          <div class="topLeft">
              <div class="weChatImg">
                  <i class="el-icon-chat-dot-round"></i>
              </div>
              <div class="inlineHelp">
                  在线客服
              </div>
              <div class="helpTime">
                  周一至周日 9:00-18:00
              </div>
          </div>
          <div class="topCenter">
              <ul>
                  <li>公司简介</li>
                  <li>企业文化</li>
                  <li>合作联系</li>
                  <li>加入我们</li>
              </ul>
          </div>
          <div class="topRight">
              <el-divider content-position="center">网站导航</el-divider>
          </div>
      </div>
      <div class="important">
          ©CopyRight 2011-2020 | 大淘客联盟 dataole.com | 蜀ICP备15025833号 | 增值电信业务经营许可证：川B2-20170282 | 营业执照 | <i class=""></i> 川公网安备51019002002469号 <img src="" alt="" style="width:60px;height:20px">
      </div>
  </div>
</template>

<script>
export default {
    name:"Footer"

}
</script>

<style lang="scss" scoped>
    .footer{
        width: 1400px;
        margin: auto;
        height: 200px;
        background: #fff;
        color: #999;
        .footerTop{
            width: 1200px;
            margin: auto;
            height: 135px;
            border-bottom:1px solid #999;
            display: flex;
            .topLeft{
                margin-left: 64px;
                width: 141px;
                .weChatImg{
                    margin-top: 10px;
                    text-align: center;;
                   .el-icon-chat-dot-round{
                       font-size: 50px;
                   } 
                }
                .inlineHelp{
                    margin: auto;
                    width: 90px;
                    height: 20px;
                    border-radius: 10px;
                    line-height: 20px;
                    background: #eef3f6;
                    text-align: center;
                    margin-top: 10px;
                }
                .helpTime{
                    margin: auto;
                    margin-top: 10px;
                }
            }
            .topCenter{
                margin-left: 120px;
                ul{
                    display: flex;
                    margin-top: 50px;
                    li{
                        margin: 0 10px;
                        padding: 5px;
                        cursor: pointer;
                    }
                }
            }
            .topRight{
                width: 220px;
                margin: 40px 0 0 40px;
            }
        }
        .important{
            text-align: center;
            margin-top: 20px;
            line-height: 20px;
        }
    }
</style>