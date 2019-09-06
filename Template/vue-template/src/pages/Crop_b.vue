<template>
    <div class="demo">
        <h1>截图上传</h1>
        <Jcrop :src="src" @update="handleUpdate" :rect="[10,10,300,200]" :options="options" />
        <!-- 展示区域 -->
        <h2>捕捉结果</h2>
        <div class="showArea">
            <img class="cropImage" :src="src" />
        </div>
        <!-- 生成的图片 -->
        <!-- <img class="generateArea" src="" /> -->
        <h3>生成图片</h3>
        <div class="generateArea">
            <img class="resultImage" src="" alt="">
        </div>
    </div>
</template>
<script>
import testPng from "@/assets/test.png";
import html2canvas from 'html2canvas';
export default {
    data() {
        return {
            src: testPng,
            options: {
                active: false
            },
            isRendering: false,
            timer: null,
            parentStyle: {
                width: '300px',
                height: '200px'
            },
            childrenStyle: {
                marginLeft: 0,
                marginTop: 0
            }
        }
    },
    methods: {
        handleUpdate(e) {
            if (this.isRendering) return;
            this.isRendering = true;
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.renderStyle(e)
            }, 100);
        },
        renderStyle(e) {
            console.log("crop is rendering");
            const { x, y, w, h } = e.pos;
            const wraperNode = document.querySelector('.showArea');
            const cropImage = document.querySelector('.cropImage');
            wraperNode.style.width = w + 'px';
            wraperNode.style.height = h + 'px';
            cropImage.style.marginLeft = (-x) + 'px';
            cropImage.style.marginTop = (-y) + 'px';
            // 抓取捕获区域
            // document.querySelector('.generateArea').innerHTML = ''
            html2canvas(document.querySelector('.showArea'), {
                width: w,
                height: h,
                // x: x ,
                scrollY: y,
                backgroundColor: '#ddd',
            }).then(canvas => {
                console.log(canvas);
                const generateArea = document.querySelector('.generateArea');
                // const baseurl = canvas.toDataURL('image/jpeg', 1.0);
                // console.log(baseurl);
                // generateArea.querySelector('.resultImage').src = ''
                // generateArea.querySelector('.resultImage').src = baseurl
                generateArea.appendChild(canvas);
                this.isRendering = false;
            });
        },
    }
}
</script>
<style lang="less">
.demo {
    margin: 100px;
}
.showArea {
    width: 300px;
    height: 200px;
    display: block;
    overflow: hidden;
    border: 1px solid red;
}
</style>
