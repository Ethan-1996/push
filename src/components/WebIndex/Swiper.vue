<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item,index) in list" :key="index">
		  <img :src="item.url" alt="" width="150" height="205">
	  </div>
     

    </div>
    
    <!-- <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div> -->
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
// import Swiper JS
import Swiper from "swiper";
// import Swiper styles
import "swiper/swiper-bundle.css";

export default {
  data(){
    return {
      list:[
        { id: 7, url: require("../../assets/images/partner/huasheng.png") },
        { id: 5, url: require("../../assets/images/partner/bigtao.png") },
        
        { id: 1, url: require("../../assets/images/partner/miyuan.png") },
        { id: 2, url: require("../../assets/images/partner/fanli.png") },
        { id: 3, url: require("../../assets/images/partner/fenxiang.png") },
        
        
        { id: 6, url: require("../../assets/images/partner/gaoyong.png") },
        
        { id: 8, url: require("../../assets/images/partner/lanjing.png") },
        { id: 9, url: require("../../assets/images/partner/shengqian.png") },
        { id: 10, url: require("../../assets/images/partner/taoquan.png") },
        { id: 4, url: require("../../assets/images/partner/haosheng.png") },
      ]
    }
  },
    mounted(){
    let effect = 2
    var swiper = new Swiper('.swiper-container', {
	  loop: true,
	  speed: 2500,
      slidesPerView: 7,
      spaceBetween: 30,
	  centeredSlides : true,
	  watchSlidesProgress : true,
	  on: {
	    setTranslate: function(){
			let slides = this.slides
			for(let i=0; i< slides.length; i++){
				let slide = slides.eq(i)
				let progress = slides[i].progress
				//slide.html(progress.toFixed(2)); 看清楚progress是怎么变化的
				    slide.css({'opacity': '','background': ''});slide.transform('');//清除样式
					
					if(effect == 1){
					    slide.transform('scale('+(1 - Math.abs(progress)/8)+')');  
					}else if(effect == 2){
						slide.css('opacity',(1-Math.abs(progress)/4));
					    slide.transform('translate3d(0,'+ Math.abs(progress)*20+'px, 0)');  
					}
					else if(effect == 3){
					    slide.transform('rotate('+ progress*30+'deg)');  
					}else if(effect == 4){
						slide.css('background','rgba('+ (255 - Math.abs(progress)*20) +','+ (127 + progress*32) +',' + Math.abs(progress)*64 + ')');
					}
					
				}	
		},
		setTransition: function(transition) {
			for (var i = 0; i < this.slides.length; i++) {
				var slide = this.slides.eq(i)
				slide.transition(transition);
			}
		},
	  },
	  navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	  },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
    }
}
</script>

<style lang="scss">
// .swiper-container{
//     width: 600px;
//     height: 300px;
// }
.swiper-container {
      width: 100%;
      height: auto;
	  // padding:90px 0;
      margin-left: auto;
      margin-right: auto;
      padding-bottom: 40px;
    }
    .swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #fff;
      height: 400px;
	  width: 285px;
      /* Center slide text vertically */
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
	  transition-property:all;
    }
</style>