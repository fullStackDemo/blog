<template>
    <div class="demo">
        <h1>截图上传</h1>
        <input type="file" @change="handleChange">
        <button @click="getResult">clip image</button>
        <hr>
        <clipperBasic class="my-clipper" ref="clipper" preview="my-preview" :src="src">
            <div class="placeholder" slot="placeholder">No image</div>
        </clipperBasic>
        <div>
            <div>result:</div>
            <img class="result" :src="resultURL" alt="">
        </div>
        <iframe id="viewer" frameborder="0" scrolling="no" width="100%" height="800"></iframe>

    </div>
</template>
<script>
import testPng from "@/assets/test.png";
import { clipperBasic } from 'vuejs-clipper'
import { URL } from 'url';
import html2canvas from 'html2canvas';
export default {
    data() {
        return {
            src: '',
            resultURL: '',
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
    components: {
        clipperBasic,
    },
    mounted() {
        const _this = this;
        document.getElementById('viewer').onload = function () {
            if (this.src) {
                const iframe = document.getElementById('viewer');
                const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
                console.log(iframeDocument);
                setTimeout(() => {
                    html2canvas(iframeDocument.body).then(canvas => {
                        const baseurl = canvas.toDataURL('image/jpeg', 1.0);
                        _this.src = baseurl;
                    })
                }, 3000);
            }
        }
    },
    methods: {
        handleChange(e) {
            const files = e.target.files;
            if (files) {
                const file = files[0];
                console.log(file);
                if (file.type.includes('image')) {
                    if (this.src) URL.revokeObjectURL(this.src)
                    this.src = window.URL.createObjectURL(files[0]);
                } else {
                    const fileUrl = window.URL.createObjectURL(file);
                    console.log(fileUrl);
                    document.getElementById('viewer').src = fileUrl;
                }
            }
        },
        getResult: function () {
            const canvas = this.$refs.clipper.clip();//call component's clip method
            this.resultURL = canvas.toDataURL("image/jpeg", 1);//canvas->image
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

.my-clipper {
    // width: 50%;

    &-upload {
        width: 120px;
        height: 30px;
        text-align: center;
        background: #999;
        border-radius: 6px;
        line-height: 30px;
        vertical-align: middle;
        color: #fff;
        margin-bottom: 10px;
    }
}

.placeholder {
    text-align: center;
    padding: 20px;
    background-color: lightgray;
}
</style>
