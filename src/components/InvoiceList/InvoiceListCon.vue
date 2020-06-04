<template>
    <div class="releaseContent">
        <p>发票记录</p>
        <div style="margin-top:60px;margin-right:40px">
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                prop="create_time"
                label="申请时间"
                >
                </el-table-column>
                <el-table-column
                label="快递公司">
                <template slot-scope="scope">
                    <span v-if="scope.row.express_name == null">暂无快递信息</span>
                    <span v-else>{{scope.row.express_name}}</span>
                </template>
                </el-table-column>

                <el-table-column
                label="快递编码"
                >
                <template slot-scope="scope">
                    <span v-if="scope.row.express_number == null">暂无编号</span>
                    <span v-else>{{scope.row.express_number}}</span>
                </template>
                </el-table-column>
                <el-table-column
                prop="invoice_title"
                label="发票抬头">
                </el-table-column>
                <el-table-column
                label="发票状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status == 1">已申请</span>
                        <span v-else-if="scope.row.status == 2">已开</span>
                        <span v-else-if="scope.row.status == 3">已邮寄</span>
                        <span v-else-if="scope.row.status == 4">已签收</span>
                    </template>

                </el-table-column>
                <el-table-column
                label="操作"
                >
                <template slot-scope="scope">
                    <el-link type="primary" @click="exit(scope.row)">修改信息</el-link><br>
                    <el-link type="primary" v-if="scope.row.status == 3" @click="confirm(scope.row.id)">确认签收</el-link>
                </template>
                </el-table-column>

            </el-table>

        <!-- 分页部分 -->
            <div class="page" v-if="pageShow">
            <el-pagination
                background
                :page-size="10"
                @current-change="handleCurrentChange"
                layout="prev, pager, next,total"
                :total="total"
            ></el-pagination>
            </div>
            <div class="blank"></div>
            
               

            <el-dialog title="申请发票" :visible.sync="dialogFormVisible">
            <el-form :model="form" >
                <el-form-item label="发票抬头" label-width="120px">
                    <el-input v-model="form.invoice_title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="税号" label-width="120px">
                    <el-input v-model="form.tax_no" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="营业执照地址" label-width="120px">
                    <el-input v-model="form.bn_li_ad" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="开户行" label-width="120px">
                    <el-input v-model="form.open_bank" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="开户账号" label-width="120px">
                    <el-input v-model="form.ac_number" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="发票明细" label-width="120px">
                    <el-input v-model="form.detail" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮寄地址" label-width="120px">
                    <el-input v-model="form.mail_ad" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false,send()">确 定</el-button>
            </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import {getInvoiceList,editInvoice,receivedInvoice} from '@/api/api.js'
export default {
    name:"InvoiceListCon",
    props:['info'],
    inject:['reload'],
    data(){
        return {
            tableData:[],
            total:1,
            pageShow:true,
            dialogFormVisible:false,
            form:{
                id:"",
                invoice_title:"",
                tax_no:"",
                bn_li_ad:"",
                open_bank:"",
                ac_number:"",
                detail:"",
                mail_ad:"",
            },
        }
    },
    created(){
       this.getInvoiceList(1)
    },
    methods:{
        // 分页函数
        handleCurrentChange(val) {
            this.getInvoiceList(val);
        },
        getInvoiceList(page){
             getInvoiceList({page},this.info).then(res => {
                if(res.data.code == 200){
                    this.tableData = res.data.data.data
                    this.total = res.data.data.total
                    //console.log(res)
                }else{
                    this.$message({   
                        showClose: true,
                        message: res.data.msg,
                        type: 'error'
                    });
                }
            })
        },
        //修改发票信息
        exit(item){
            if(item.status != 1){
                this.$message({   
                        showClose: true,
                        message: '已经开出的发票不能修改哦！',
                        type: 'warning'
                    });
                    return false
            }
            this.dialogFormVisible = true;
            this.form.id = item.id,
            this.form.invoice_title = item.invoice_title
            this.form.tax_no = item.tax_no
            this.form.bn_li_ad = item.bn_li_ad
            this.form.open_bank = item.open_bank
            this.form.ac_number = item.ac_number
            this.form.detail = item.detail
            this.form.mail_ad = item.mail_ad

        },
        //确认 收获函数
        confirm(id){
            receivedInvoice({id},this.info).then(res => {
                if(res.data.code == 200){
                     this.$message({   
                        showClose: true,
                        message: res.data.msg,
                        type: 'success'
                    });
                    this.reload()
                }else{
                     this.$message({   
                        showClose: true,
                        message: res.data.msg,
                        type: 'error'
                    });
                }
            })
        },
        //申请发票提交函数
        send(){
            editInvoice(this.form,this.info).then(res =>{
                if(res.data.code == 200){
                    //console.log(res)
                     this.$message({   
                        showClose: true,
                        message: res.data.msg,
                        type: 'success'
                    });
                    this.reload()
                }else{
                     this.$message({   
                        showClose: true,
                        message: res.data.msg,
                        type: 'error'
                    });
                }
            })
        }
    }
}
</script>


<style lang="scss" scoped>
    .releaseContent{
        padding-left: 40px;
        width: 1160px;
        background: #fff;
        min-height: 700px;
        position: relative;
        p{
            margin-top: 40px;
            font-size: 20px;
        }
        .page {
            width: 1200px;
            text-align: center;
            position: absolute;
            bottom: 10px;
        }
        .blank {
            width: 100%;
            height: 70px;
            }
    }
</style>