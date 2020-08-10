<template>
    <div class="webHeaderBox">
        <div class="webHeader">
            <img src="../../assets/images/logo.png" style="cursor: pointer;" @click="toPath('/')">
            <img src="../../assets/images/afterLogo.png" alt="" style="margin-left:20px">
        </div>
    </div>
</template>

<script>
export default {
    name:"WebHeader",
    methods:{
        toPath(path){
            this.$router.push(path);
        }
    }
}
</script>

<style lang="scss" scoped>
    .webHeaderBox{
        width: 100%;
        height: 102px;
        background: url(../../assets/images/logobg.png);
        .webHeader{
            width: 1400px;
            height: 102px;
            margin: auto;
            font-size: 36px;
            color: #fff;
           
            line-height: 102px;
        }
    }

</style>