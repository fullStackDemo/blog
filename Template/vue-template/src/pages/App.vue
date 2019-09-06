<template>
    <div class="box" :style="{ height: height + 'px'}">
        <!-- 头部 -->
        <!-- <Header /> -->
        <!-- 内容 -->
        <router-view></router-view>
        <!-- 隔离块 -->
        <!-- <div class="split_block"></div> -->
        <!-- 置顶按钮 -->
        <!-- <el-backtop target=".box"></el-backtop> -->
        <!-- 底部 -->
        <!-- <Footer /> -->
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    name: "app",
    data() {
        console.log('app', this.$route)
        return {
            height: document.documentElement.clientHeight,
            keepalive: false
        };
    },
    components: {
        // Header,
        // Footer,
    },
    mounted() {
        window.addEventListener('resize', e => {
            this.height = document.documentElement.clientHeight;
        }, false);
    },
    watch: {
        $route(to, from) {
            console.log(to);
            const { keep } = to.query;
            this.keepalive = keep ? true : false;
        }
    },
    created() {
        // setTimeout(() => {
        //     document.querySelector('.box').scrollTop = 0;
        // }, 1000)
    },
    methods: {
        // 辅助函数
        ...mapMutations([
            'saveModule',
        ]),
    }
};
</script>
